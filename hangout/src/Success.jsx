import React, { useEffect } from "react";
import gif6 from "../src/assets/gif6.gif";
import kamisama from "../src/assets/kamisama.m4a";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Success() {
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

  return (
    <div className="min-h-screen w-screen flex flex-col justify-center items-center bg-pink-300">
      <h1 className="m-5 text-5xl md:text-7xl font-bold font-mono text-pink-600 text-center">
        Yayyy! Can't wait to create unforgettable memories together!
      </h1>

      <motion.img
        className="z-20"
        src={gif6}
        alt="Confetti GIF"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      />

      <button
        className="bg-pink-600 text-lg md:text-3xl m-5 md:m-10 px-10 md:px-20 py-2 md:py-4 rounded-full text-white font-semibold border-4 border-violet-800 cursor-pointer"
        onClick={() => navigate("/date-picker")}
      >
        Let's Plan
      </button>
    </div>
  );
}

export default Success;
