"use client";
import React, { useEffect, useState } from "react";
import CustomWebcam from "@/app/components/home/customwebcam";
import Homebg from "@/app/components/home/homebg";
import axios from "../../api/axios";
import { jwtDecode } from "jwt-decode";

export default function Home() {
  const [userName, setUserName] = useState(null);

  const handleSubmit = () => {
    // Perform logout actions here, such as clearing localStorage, redirecting, etc.
    localStorage.removeItem("token");
    window.location.href = "/"; // Redirect to the login or home page
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    // Check if token exists and is valid
    if (token) {
      try {
        const decodedToken = jwtDecode(token);

        // Assuming decodedToken has required fields like 'name'
        setUserName(decodedToken.name);

        // Store token in localStorage for persistence
        localStorage.setItem("token", token);
      } catch (error) {
        console.error("Invalid token:", error);
        redirectToLogin();
      }
    }
  }, []);

  const redirectToLogin = () => {
    // Redirect to login page if token is invalid or not present
    window.location.href = "/";
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <div className="fixed inset-0 z-0">
        <Homebg />
      </div>
      <div className="relative z-10 flex flex-col h-full justify-between">
        <div className="flex justify-center p-4 sm:p-10">
          <h1 className="text-xl sm:text-3xl text-white font-semibold">
            Hello, {userName || "Guest"}
          </h1>
        </div>
        <div className="flex-grow flex items-center justify-center pb-4 sm:pb-14">
          <CustomWebcam />
        </div>
        <div className="flex justify-end p-4">
          <button
            onClick={handleSubmit}
            className="flex items-center bg-white rounded-lg w-24 p-2 sm:w-32 sm:p-4 hover:bg-gray-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-4 h-4 sm:w-6 sm:h-6 text-red-800"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
              />
            </svg>
            <p className="text-sm sm:text-base font-semibold text-red-700 ml-2">
              Log-out
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}
