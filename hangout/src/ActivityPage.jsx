import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios for making API requests

function ActivityPage() {
  const [selectedActivities, setSelectedActivities] = useState([]); // Store selected activities
  const [suggestion, setSuggestion] = useState(""); // Text area value for suggestion
  const [errorMessage, setErrorMessage] = useState(""); // To show error message if something goes wrong
  const navigate = useNavigate();
  useEffect(() => {
    const loveInterval = setInterval(() => {
      const r_num = Math.floor(Math.random() * 40) + 1;
      const r_size = Math.floor(Math.random() * 65) + 10;
      const r_left = Math.floor(Math.random() * 100) + 1;
      const r_bg = Math.floor(Math.random() * 25) + 100;
      const r_time = Math.floor(Math.random() * 5) + 5;

      const heart = document.createElement("div");
      heart.className = "heart";
      heart.style.width = `${r_size}px`;
      heart.style.height = `${r_size}px`;
      heart.style.left = `${r_left}%`;
      heart.style.background = `rgba(255,${r_bg - 25},${r_bg},1)`;
      heart.style.animation = `love ${r_time}s ease`;

      document.body.appendChild(heart);

      setTimeout(() => {
        heart.remove();
      }, r_time * 1000);
    }, 500);

    return () => clearInterval(loveInterval); // Cleanup when the component unmounts
  }, []);
  // Activities that the user can choose from
  const activities = [
    "Dinner",
    "Night Drive",
    "Chill and Walk",
    "Drink Some Alcohol",
  ];

  // Function to handle saving the data
  const handleSaveData = async () => {
    if (selectedActivities.length === 0) {
      setErrorMessage("Please select at least one activity.");
      return;
    }

    try {
      // Send the selected activities and suggestion to the backend API
      const response = await axios.post(
        "http://localhost:4000/api/save-activity",
        {
          activities: selectedActivities,
          suggestion,
        }
      );

      if (response.status === 200) {
        // On success, navigate to another page (optional)
        localStorage.setItem("isFormCompleted", true);
        navigate("/countdown");
      }
    } catch (error) {
      setErrorMessage("Error saving activity. Please try again.");
      console.error("Error saving activity:", error);
    }
  };

  // Function to handle activity button click
  const handleActivityClick = (activity) => {
    setSelectedActivities((prev) => {
      if (prev.includes(activity)) {
        return prev.filter((item) => item !== activity); // Remove the activity if already selected
      } else {
        return [...prev, activity]; // Add the activity to the list
      }
    });
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-pink-300">
      <h1 className="text-3xl font-bold text-pink-600 mb-6">
        Яа ч болно доо сонголт таны гарт:
      </h1>

      {/* Activity Buttons */}
      <div className="flex space-x-4 mb-6">
        {activities.map((activity) => (
          <button
            key={activity}
            className={`${
              selectedActivities.includes(activity)
                ? "bg-green-500" // Selected activity (green)
                : "bg-blue-500" // Not selected activity (blue)
            } text-white px-6 py-3 rounded-lg`}
            onClick={() => handleActivityClick(activity)}
          >
            {activity}
          </button>
        ))}
      </div>

      {/* Suggestion Text Area (optional) */}
      <div className="flex justify-center items-center">
        <textarea
          style={{ width: "600px" }} // or any custom width
          className="p-3 border rounded-lg"
          placeholder="Хэлэхийг хүссэн зүйл үлдсэнэ үү юу ч байж болноо нэмэлт activity, өдөр цаг эсвэл boli2 ch ymu"
          value={suggestion}
          onChange={(e) => setSuggestion(e.target.value)}
          rows={6}
        />
      </div>

      {/* Error Message */}
      {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}

      {/* Save Button */}
      <button
        className="bg-pink-600 text-white px-10 py-2 rounded-full font-semibold"
        onClick={handleSaveData}
      >
        Тохирлоо
      </button>
    </div>
  );
}

export default ActivityPage;
