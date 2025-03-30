import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function CountdownPage() {
  const [remainingTime, setRemainingTime] = useState(null);
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

    return () => clearInterval(loveInterval);
  }, []);
  useEffect(() => {
    // Retrieve the selected date from localStorage
    const selectedDateString = localStorage.getItem("selectedDate");

    if (selectedDateString) {
      const selectedDate = new Date(selectedDateString);

      // Calculate the remaining time
      const today = new Date();
      const timeDifference = selectedDate - today; // Difference in milliseconds

      if (timeDifference > 0) {
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
        );

        setRemainingTime({ days, hours, minutes });
      } else {
        setRemainingTime({ days: 0, hours: 0, minutes: 0 });
      }
    } else {
      // If no date is found in localStorage, navigate back to the date selection page
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-pink-300">
      <h1 className="text-3xl font-bold text-pink-600 mb-5">
        {"("}
        {new Date(localStorage.getItem("selectedDate")).toLocaleDateString()}
        {")"} болход ердөө:
      </h1>

      {remainingTime ? (
        <div className="text-xl font-bold mb-4">
          {remainingTime.days} өдөр, {remainingTime.hours} цаг,{" "}
          {remainingTime.minutes} минут үлджээ
        </div>
      ) : (
        <div className="text-xl font-bold mb-4">
          Calculating remaining time...
        </div>
      )}

      <a
        href="https://www.instagram.com/murunvn/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <button className="bg-pink-600 text-lg px-10 py-2 rounded-full text-white font-semibold cursor-pointer">
          Илүү ихийг IG - аас
        </button>
      </a>
    </div>
  );
}

export default CountdownPage;
