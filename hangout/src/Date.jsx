import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios for making API requests

function DatePickerPage() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [errorMessage, setErrorMessage] = useState(""); // To show error message if something goes wrong
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [dateToSave, setDateToSave] = useState(null); // Store the date the user chose for saving confirmation
  const [isDateConfirmed, setIsDateConfirmed] = useState(false); // Flag to track if date is confirmed
  const [isBusyDay, setIsBusyDay] = useState(false); // Flag to track if the selected day is busy
  const navigate = useNavigate();

  // Example of busy, not busy, and night dates
  const dateStatuses = {
    "2025-03-31": "busy", // Red
    "2025-04-01": "busy", // Green
    "2025-04-02": "busy", // Green
    "2025-04-03": "busy", // Red
    "2025-04-04": "night", // Blue
    "2025-04-05": "not-busy", // Green
    "2025-04-06": "not-busy", // Red
  };

  // Function to handle date save
  const handleSaveDate = async (year, month, day) => {
    try {
      // Send the year, month, and day separately to the backend API
      const response = await axios.post(
        "https://anirguilen-server.vercel.app/api/save-date",
        {
          year,
          month,
          day,
        }
      );

      if (response.status === 200) {
        // On success, navigate to another page (optional)
        const selectedDate = new Date(year, month - 1, day); // JavaScript months are zero-indexed
        localStorage.setItem("selectedDate", selectedDate.toISOString());
        navigate("/activity"); // Go to the next page, adjust the URL as needed
      }
    } catch (error) {
      setErrorMessage("Error saving date. Please try again.");
      console.error("Error saving date:", error);
    }
  };

  // Function to get the button style based on the status
  const getButtonStyle = (date) => {
    const dateString = date.toISOString().split("T")[0]; // Get the date string in 'YYYY-MM-DD' format
    const status = dateStatuses[dateString];

    if (status === "busy") {
      return "bg-red-500 text-white"; // Red
    } else if (status === "not-busy") {
      return "bg-green-500 text-white"; // Green
    } else if (status === "night") {
      return "bg-blue-500 text-white"; // Blue
    }
    return "bg-gray-300"; // Default style if no status is found
  };

  // Function to handle button click and show custom confirmation modal
  const handleButtonClick = (date) => {
    const dateString = date.toISOString().split("T")[0]; // Get date in 'YYYY-MM-DD' format
    const status = dateStatuses[dateString];

    setDateToSave(date); // Store the selected date for later saving

    if (status === "busy") {
      // If the selected day is "busy", show the sorry message in the modal
      setIsBusyDay(true);
    } else {
      // If the selected day is not "busy", show the usual confirmation modal
      setIsBusyDay(false);
    }

    setShowModal(true); // Show the modal
  };

  // Function to handle confirmation
  const handleConfirmation = (confirmed) => {
    if (!isBusyDay && confirmed && dateToSave) {
      // Save the selected date only if it's not a busy day
      const year = dateToSave.getFullYear();
      const month = dateToSave.getMonth() + 1;
      const day = dateToSave.getDate();

      handleSaveDate(year, month, day); // Save the selected date
      setIsDateConfirmed(true); // Flag that the date is confirmed
    }

    setShowModal(false); // Close the modal regardless of busy or free day
  };

  // Function to handle the date picker change
  const handleDatePickerChange = (date) => {
    setSelectedDate(date);
    setShowModal(true); // Show confirmation modal after picking a date
    setDateToSave(date); // Store the date for saving
  };

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

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-pink-300">
      <h1 className="text-3xl font-bold text-pink-600">Pick a Date</h1>

      {/* Color Explanation Section */}
      <div className="text-sm text-gray-700 mb-6">
        <p>
          <span className="inline-block w-3 h-3 bg-red-500 mr-2"></span>
          <span>Sorry, it's a busy day (work)</span>
        </p>
        <p>
          <span className="inline-block w-3 h-3 bg-green-500 mr-2"></span>
          <span>Yeah, free dayyy!</span>
        </p>
        <p>
          <span className="inline-block w-3 h-3 bg-blue-500 mr-2"></span>
          <span>ofc i can hangout friday nightsss :)</span>
        </p>
      </div>

      {/* Date Buttons for March 31 to April 6 */}
      {!isDateConfirmed && (
        <div className="flex space-x-4 mb-4">
          {Object.keys(dateStatuses).map((dateStr) => {
            const date = new Date(dateStr);
            return (
              <button
                key={dateStr}
                className={`px-4 py-2 rounded-full font-semibold cursor-pointer ${getButtonStyle(
                  date
                )}`}
                onClick={() => handleButtonClick(date)}
              >
                {date.toLocaleDateString()}
              </button>
            );
          })}
        </div>
      )}

      {/* Custom Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 flex justify-center items-start bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm mt-10">
            <h2 className="text-xl font-bold mb-4">
              {isBusyDay ? "uuchlrai ho" : "Dashnym baljinyamtai udur"}
            </h2>
            <p className="mb-4">
              {isBusyDay
                ? `ene ulaan udruud songogdohgue: ${dateToSave?.toLocaleDateString()}`
                : `ene uduruu uu? : ${dateToSave?.toLocaleDateString()}`}
            </p>
            <div className="flex justify-around">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-full"
                onClick={() => handleConfirmation(false)} // Cancel button
              >
                Boli2
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-full"
                onClick={() => handleConfirmation(true)} // Confirm button
              >
                Zaaazaaa
              </button>
            </div>
          </div>
        </div>
      )}
      <h1 className="text-3xl font-bold text-pink-600">арай өөр өдөр: </h1>
      {/* Date Picker */}
      {!isDateConfirmed && (
        <DatePicker
          selected={selectedDate}
          onChange={handleDatePickerChange}
          className="mt-4 p-2 border rounded-lg"
          dateFormat="MMMM d, yyyy"
        />
      )}

      {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
    </div>
  );
}

export default DatePickerPage;
