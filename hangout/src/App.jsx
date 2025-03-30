import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./Home";
import Success from "./Success";
import DatePicker from "./Date";
import ActivityPage from "./ActivityPage";
import CountdownPage from "./CountdownPage";
import kamisama from "./assets/kamisama.m4a"; // Import the audio file

function App() {
  const isFormCompleted = localStorage.getItem("isFormCompleted"); // Check if form is completed
  const [isAudioPlayed, setIsAudioPlayed] = useState(false);

  // Play the song when the app is loaded, after user interaction
  useEffect(() => {
    const audio = new Audio(kamisama);
    audio.volume = 0.3;
    audio.muted = true; // Start muted
    audio.play().catch((error) => {
      console.error("Audio play failed:", error);
    });

    // Unmute after a short delay
    setTimeout(() => {
      audio.muted = false;
    }, 100); // Unmute after a short time

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  return (
    <div>
      {/* Button to trigger audio */}
      {!isAudioPlayed && (
        <button
          onClick={playAudio}
          style={{ padding: "10px 20px", marginTop: "20px" }}
        >
          Click to Play Audio
        </button>
      )}

      <Routes>
        {/* Home page route */}
        <Route
          path="/"
          element={isFormCompleted ? <Navigate to="/countdown" /> : <Home />}
        />

        {/* Success page route */}
        <Route
          path="/success"
          element={isFormCompleted ? <Navigate to="/countdown" /> : <Success />}
        />

        {/* Date Picker route - only accessible if the form is not completed */}
        <Route
          path="/date-picker"
          element={
            isFormCompleted ? <Navigate to="/countdown" /> : <DatePicker />
          }
        />

        {/* Activity Page route - only accessible if the form is not completed */}
        <Route
          path="/activity"
          element={
            isFormCompleted ? <Navigate to="/countdown" /> : <ActivityPage />
          }
        />

        {/* Countdown page route */}
        <Route path="/countdown" element={<CountdownPage />} />
      </Routes>
    </div>
  );
}

export default App;
