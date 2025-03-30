import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import gif1 from "../src/assets/gif1.gif";
import gif4 from "../src/assets/gif4.gif";
import "../src/index.css";

function Home() {
  const navigate = useNavigate();
  const [noButtonStyle, setNoButtonStyle] = useState({ position: "static" });

  const handleNoButtonHover = () => {
    const x = Math.random() * (window.innerWidth - 200);
    const y = Math.random() * (window.innerHeight - 250);
    setNoButtonStyle({
      position: "absolute",
      left: `${x}px`,
      top: `${y}px`,
    });
  };

  // Heart animation effect
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

  return (
    <div className="min-h-screen w-screen flex flex-col justify-center items-center bg-pink-300">
      <div className="mx-5 md:mx-20 flex flex-row justify-center">
        <h1 className="m-5 text-5xl md:text-7xl font-bold font-mono text-pink-600 text-center">
          Hey, do you wanna go out with me?
        </h1>
        <img className="my-10 h-20 w-20" src={gif4} alt="Heart GIF" />
      </div>

      <img className="my-10" src={gif1} alt="Cute GIF" />

      <div className="flex flex-row justify-center items-center">
        <button
          className="bg-pink-600 text-lg md:text-3xl m-5 md:m-10 px-10 md:px-20 py-2 md:py-4 rounded-full text-white font-semibold border-4 border-violet-800 cursor-pointer"
          onClick={() => navigate("/success")}
        >
          YES
        </button>

        <button
          className="bg-pink-600 text-lg md:text-3xl m-5 md:m-10 px-10 md:px-20 py-2 md:py-4 rounded-full text-white font-semibold border-4 border-violet-800 cursor-pointer"
          style={noButtonStyle}
          onMouseOver={handleNoButtonHover}
          onTouchStart={handleNoButtonHover}
        >
          NO
        </button>
      </div>
    </div>
  );
}

export default Home;
