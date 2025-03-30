require("dotenv").config({ path: "./mongo.env" });

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

// CORS setup: Only allow requests from the frontend domain
const corsOptions = {
  origin: "https://anirguilen.vercel.app", // Replace with your frontend domain
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
};

// Middleware
app.use(cors(corsOptions)); // Apply CORS middleware with options
app.use(bodyParser.json());

// Connect to MongoDB using MONGO_URI from environment variables
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
    process.exit(1); // Exit the process if the connection fails
  });

// Date Schema
const dateSchema = new mongoose.Schema({
  year: Number,
  month: Number,
  day: Number,
});

const DateModel = mongoose.model("Date", dateSchema);

// API to save the date
app.post("/api/save-date", (req, res) => {
  const { year, month, day } = req.body; // Expect year, month, and day separately

  // Save the separate values to the database using DateModel
  const newDate = new DateModel({
    year,
    month,
    day,
  });

  newDate
    .save()
    .then(() => res.status(200).send("Date saved successfully"))
    .catch((error) => {
      console.error("Error saving date:", error);
      res.status(500).send("Error saving date");
    });
});

// Activity Schema
const activitySchema = new mongoose.Schema({
  activities: [String], // Array of activities
  suggestion: String, // Optional suggestion text
});

const ActivityModel = mongoose.model("Activity", activitySchema);

// API to save activity
app.post("/api/save-activity", async (req, res) => {
  const { activities, suggestion } = req.body;

  const newActivity = new ActivityModel({
    activities,
    suggestion, // Store suggestion if provided
  });

  try {
    await newActivity.save();
    res.status(200).send("Activity saved successfully");
  } catch (error) {
    console.error("Error saving activity:", error);
    res.status(500).send("Error saving activity");
  }
});

// Start server using the PORT from environment variables
const PORT = process.env.PORT || 4000; // Default to 4000 if PORT is not defined
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
