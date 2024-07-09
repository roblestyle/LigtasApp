"use client";
import React, { useEffect, useState } from "react";
import CustomWebcam from "@/app/components/home/customwebcam";
import Homebg from "@/app/components/home/homebg";
import axios from "../../api/axios";
import { jwtDecode } from "jwt-decode"; // Assuming correct import for jwt-decode

export default function Home() {
  const [userName, setUserName] = useState(null);
  const [userId, setUserId] = useState(null);

  const handleSubmit = () => {
    // Perform logout actions here, such as clearing localStorage, redirecting, etc.
    localStorage.removeItem("token");
    window.location.href = "/pages/login/"; // Redirect to the login or home page
  };

  useEffect(() => {
    // Attempt to get token from localStorage
    let token = localStorage.getItem("token");

    // If token is not found in localStorage, try to get it from URL parameters
    if (!token) {
      const urlParams = new URLSearchParams(window.location.search);
      token = urlParams.get("token");
    }

    // Check if token exists
    if (token) {
      try {
        const decodedToken = jwtDecode(token);

        // Assuming decodedToken has required fields like 'name' and 'id'
        setUserName(decodedToken.name);
        setUserId(decodedToken.id);

        // Store token in localStorage for persistence (optional, already stored)
        localStorage.setItem("token", token);
      } catch (error) {
        console.error("Error decoding token:", error);
        redirectToLogin();
        return; // Exit early to prevent further execution
      }
    } else {
      console.error("Token is missing"); // Log error if token is missing
      redirectToLogin();
      return; // Exit early if token is missing
    }
  }, []);
  // Empty dependency array ensures useEffect runs only once

  const redirectToLogin = () => {
    // Redirect to login page if token is invalid or not present
    window.location.href = "/pages/login/";
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
          <CustomWebcam user={userId} />
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
