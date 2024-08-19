import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import main from "../assets/main.jpeg";

export default function Hero() {
  const [textVisible, setTextVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setTextVisible(true);
    }, 300); // Adjust the delay to your preference
  }, []);

  return (
    <section className="bg-gray-50 h-screen flex items-center justify-center px-4 md:px-0">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center">
        <div
          className={`flex-1 ${
            textVisible ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
          } transition-all duration-1000`}
        >
          <h1 className="text-blue-500 text-sm font-semibold mb-2 uppercase">
            Ask the Bible
          </h1>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Welcome to Ask Scriptures!
          </h2>
          <p className="text-gray-600 text-base md:text-lg mb-8">
            I'm an AI assistant here to help you answer questions related to the Bible and
            scripture.
          </p>
          {/* <div className="flex space-x-4">
            <a
              href="#"
              className="text-blue-600 py-3 px-6 border border-blue-600 rounded-full hover:bg-blue-600 hover:text-white"
            >
              Start Chatting
            </a>
          </div> */}
          <div className="flex space-x-4">
            <Link
              to="/chat"
              className="text-blue-600 py-3 px-6 border border-blue-600 rounded-full hover:bg-blue-600 hover:text-white"
            >
              Start Chatting
            </Link>
          </div>
        </div>
        <div className="flex-1 hidden md:block">
          <img
            src={main} // Replace with your image path
            alt="Bible"
            className="max-w-full h-auto rounded-2xl"
          />
        </div>
      </div>
    </section>
  );
}
