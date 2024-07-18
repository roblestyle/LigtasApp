"use client";

import React, { useEffect, useState, useRef } from "react";
import CustomWebcam from "@/app/components/home/customwebcam";
import Homebg from "@/app/components/home/homebg";
import axios from "../../api/axios";
import { jwtDecode } from "jwt-decode"; // Import jwtDecode without curly braces for default import

export default function Home() {
  const [userName, setUserName] = useState(null);
  const [userId, setUserId] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notificationDropdownOpen, setNotificationDropdownOpen] =
    useState(false);
  const [markedNotifications, setMarkedNotifications] = useState([]);
  const profileDropdownRef = useRef(null);
  const notificationDropdownRef = useRef(null);

  const handleSubmit = () => {
    localStorage.removeItem("userToken");
    window.location.href = "/pages/login/";
  };

  const handleDeleteAccount = async () => {
    try {
      const userToken = localStorage.getItem("userToken");
      await axios.delete(`/api/${userId}`, {
        headers: { Authorization: userToken },
      });
      handleSubmit(); // Logout after account deletion
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };

  const handleDeleteNotification = async (notificationId) => {
    try {
      const userToken = localStorage.getItem("userToken");
      await axios.delete(`/api/notifications/${notificationId}`, {
        headers: { Authorization: `Bearer ${userToken}` },
      });
      setNotifications((prevNotifications) =>
        prevNotifications.filter(
          (notification) => notification.id !== notificationId
        )
      );
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  const toggleProfileDropdown = () => {
    setProfileDropdownOpen(!profileDropdownOpen);
    if (notificationDropdownOpen) {
      setNotificationDropdownOpen(false);
    }
  };

  const toggleNotificationDropdown = () => {
    setNotificationDropdownOpen(!notificationDropdownOpen);
    if (profileDropdownOpen) {
      setProfileDropdownOpen(false);
    }
  };

  const handleClickOutside = (event) => {
    if (
      profileDropdownRef.current &&
      !profileDropdownRef.current.contains(event.target)
    ) {
      setProfileDropdownOpen(false);
    }
    if (
      notificationDropdownRef.current &&
      !notificationDropdownRef.current.contains(event.target)
    ) {
      setNotificationDropdownOpen(false);
    }
  };

  const handleMarkNotification = (notificationId) => {
    if (markedNotifications.includes(notificationId)) {
      setMarkedNotifications((prevMarks) =>
        prevMarks.filter((mark) => mark !== notificationId)
      );
    } else {
      setMarkedNotifications((prevMarks) => [...prevMarks, notificationId]);
    }
  };

  const handleDeleteMarkedNotifications = async () => {
    try {
      const userToken = localStorage.getItem("userToken");
      await Promise.all(
        markedNotifications.map(async (notificationId) => {
          await axios.delete(`/api/notifications/${notificationId}`, {
            headers: { Authorization: `Bearer ${userToken}` },
          });
        })
      );
      setNotifications((prevNotifications) =>
        prevNotifications.filter(
          (notification) => !markedNotifications.includes(notification.id)
        )
      );
      setMarkedNotifications([]);
    } catch (error) {
      console.error("Error deleting marked notifications:", error);
    }
  };

  const fetchNotifications = async () => {
    try {
      const userToken = localStorage.getItem("userToken");
      const response = await axios.get(`/api/notifications/${userId}`, {
        headers: { Authorization: `Bearer ${userToken}` },
      });

      setNotifications(response.data.notifications);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    let userToken = localStorage.getItem("userToken");

    if (!userToken) {
      const urlParams = new URLSearchParams(window.location.search);
      userToken = urlParams.get("userToken");
    }

    if (userToken) {
      try {
        const decodedToken = jwtDecode(userToken);
        setUserName(decodedToken.name);
        setUserId(decodedToken.id);
        setProfileImage(decodedToken.profile_image);
        localStorage.setItem("userToken", userToken);

        if (userId) {
          fetchNotifications();
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        redirectToLogin();
      }
    } else {
      console.error("Token is missing");
      redirectToLogin();
    }
  }, [userId]);

  const redirectToLogin = () => {
    window.location.href = "/pages/login/";
  };

  const toggleMarkMode = () => {
    setMarkedNotifications([]);
    setNotificationDropdownOpen(!notificationDropdownOpen);
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

          <div className="relative flex items-center">
            <div className="relative mx-4" ref={notificationDropdownRef}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-7 h-7 text-white cursor-pointer"
                onClick={toggleMarkMode}
              >
                <path
                  fillRule="evenodd"
                  d="M5.25 9a6.75 6.75 0 0 1 13.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 0 1-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 1 1-7.48 0 24.585 24.585 0 0 1-4.831-1.244.75.75 0 0 1-.298-1.205A8.217 8.217 0 0 0 5.25 9.75V9Zm4.502 8.9a2.25 2.25 0 1 0 4.496 0 25.057 25.057 0 0 1-4.496 0Z"
                  clipRule="evenodd"
                />
              </svg>

              {notificationDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg py-1">
                  {notifications.length > 0 ? (
                    notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className="px-4 py-2 flex justify-between items-center"
                      >
                        <div className="flex items-center">
                          {markedNotifications.includes(notification.id) ? (
                            <input
                              type="checkbox"
                              className="form-checkbox h-4 w-4 text-red-600 cursor-pointer"
                              checked
                              onChange={() =>
                                handleMarkNotification(notification.id)
                              }
                            />
                          ) : (
                            <input
                              type="checkbox"
                              className="form-checkbox h-4 w-4 text-red-600 cursor-pointer"
                              onChange={() =>
                                handleMarkNotification(notification.id)
                              }
                            />
                          )}
                          <p className="text-sm ml-2">{notification.message}</p>
                        </div>
                        <p className="text-xs text-gray-500">
                          {formatNotificationTime(notification.createdAt)}
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="px-4 py-2">
                      <p className="text-sm text-gray-500">
                        There are no new notifications.
                      </p>
                    </div>
                  )}

                  {markedNotifications.length > 0 && (
                    <div className="px-4 py-2 flex justify-end">
                      <button
                        onClick={handleDeleteMarkedNotifications}
                        className="text-xs text-red-600 hover:text-red-800"
                      >
                        Delete Selected
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="relative" ref={profileDropdownRef}>
              <img
                src={profileImage}
                alt="Profile"
                className="w-14 h-14 sm:w-14 sm:h-14 rounded-md cursor-pointer"
                onClick={toggleProfileDropdown}
              />
              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
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

const formatNotificationTime = (time) => {
  return `[${time}]`; // Implement your formatting logic here, e.g., using Moment.js
};
