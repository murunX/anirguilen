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

  // Play the song when the app is loaded
  return (
    <div>
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
