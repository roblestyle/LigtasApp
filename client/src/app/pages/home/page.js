"use client";
import React, { useEffect, useState, useRef } from "react";
import CustomWebcam from "@/app/components/home/customwebcam";
import Homebg from "@/app/components/home/homebg";
import axios from "../../api/axios";
import { jwtDecode } from "jwt-decode"; // Correct import for jwt-decode

export default function Home() {
  const [userName, setUserName] = useState(null);
  const [userId, setUserId] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleSubmit = () => {
    // Perform logout actions here, such as clearing localStorage, redirecting, etc.
    localStorage.removeItem("token");
    window.location.href = "/pages/login/";
  };

  const handleDeleteAccount = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`/api/users/${userId}`, {
        headers: { Authorization: token },
      });
      handleSubmit(); // Logout after account deletion
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
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
        setProfileImage(decodedToken.profile_image);
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
        <div className="flex justify-between items-center p-4 sm:p-10">
          <h1 className="text-lg sm:text-xl text-white font-semibold">
            Hello, {userName || "Guest"}
          </h1>
          <div className="relative" ref={dropdownRef}>
            <img
              src={profileImage}
              alt="Profile"
              className="w-14 h-14 sm:w-14 sm:h-14 rounded-md cursor-pointer"
              onClick={toggleDropdown}
            />
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                <button
                  onClick={handleSubmit}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                  Log out
                </button>
                <button
                  onClick={handleDeleteAccount}
                  className="block px-4 py-2 text-sm text-red-700 hover:bg-gray-100 w-full text-left"
                >
                  Delete Account
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="flex-grow flex items-center justify-center pb-2 sm:pb-7">
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
