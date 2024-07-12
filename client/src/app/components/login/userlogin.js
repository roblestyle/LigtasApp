"use client";

import React, { useState } from "react";
import axios from "../../api/axios";

function UserLogin() {
  // Capitalize the component name
  const [email, setEmail] = useState("");
  const [user_password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("/auth/login", {
        email,
        user_password,
      });

      // Check the structure of response.data to ensure it contains a valid token
      console.log(response.data);

      if (response.status === 200 && response.data.token) {
        const token = response.data.token;
        localStorage.setItem("token", token);
        window.location.href = `/pages/home/`;
      } else {
        setLoginError("Login failed. Please try again later.");
      }
    } catch (error) {
      console.error("Login failed:", error);
      if (error.response && error.response.status === 401) {
        setLoginError("Invalid email or password");
      } else {
        setLoginError("Login failed. Please try again later.");
      }
    }
  };

  return (
    <div className="w-full p-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
      <div className="h-full flex flex-col items-center justify-center p-4">
        <img
          src="/logon1.png"
          className="w-16 h-15 sm:w-64 sm:h-63 mt-4 sm:my-4"
          alt="Logo"
        />
        <h1 className="w-full text-xl sm:text-4xl font-bold text-white sm:mb-2 text-center">
          Batangas State University
        </h1>
        <p className="text-lg sm:text-xl font-semibold text-white text-center sm:text-left">
          Command Center
        </p>
      </div>
      <div className="h-full flex flex-col justify-start p-4">
        <h1 className="text-md sm:text-2xl font-semibold text-white mb-3 sm:mb-5 text-center sm:text-left">
          Login Account
        </h1>
        <form onSubmit={handleSubmit} className="w-full">
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
            <div className="rounded-lg h-full sm:pr-2">
              <div className="mb-1">
                <label
                  htmlFor="email"
                  className="block mb-1 text-sm text-white hidden sm:block"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2 sm:p-3"
                  placeholder="Enter Email"
                  required
                />
              </div>
            </div>
            <div className="rounded-lg h-full sm:pr-2">
              <div className="mb-1">
                <label
                  htmlFor="password"
                  className="block mb-1 text-sm font-medium text-white hidden sm:block"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={user_password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2 sm:p-3"
                  placeholder="Enter Password"
                  required
                />
              </div>
            </div>
          </div>
          {loginError && (
            <p className="text-red-500 text-sm mb-3">{loginError}</p>
          )}
          <div className="flex justify-center items-center p-4">
            <button
              type="submit"
              className="text-black bg-white text-md sm:text-lg focus:ring-1 focus:outline-none focus:ring-[#FFD910]/50 font-medium rounded-md text-sm py-2 text-center w-full w-44 sm:w-64 inline-flex justify-center items-center mb-2 transition duration-300 ease-in-out hover:bg-red-800 hover:text-white"
            >
              Login
            </button>
          </div>
        </form>
        <div className="my-6 text-center">
          <div className="flex items-center justify-center">
            <hr className="border-t-2 border-yellow-400 w-full" />
            <span className="mx-2 text-white uppercase tracking-wide">Or</span>
            <hr className="border-t-2 border-yellow-400 w-full" />
          </div>
        </div>
        <div className="flex justify-center items-center mb-5">
          <button
            type="button"
            className="text-black bg-white text-md sm:text-lg focus:ring-1 focus:outline-none focus:ring-[#FFD910]/50 font-medium rounded-md text-sm px-4 py-2 text-center w-44 sm:w-64 inline-flex justify-center items-center mb-2 transition duration-300 ease-in-out hover:bg-red-800 hover:text-white"
            onClick={() =>
              (window.location.href = "http://localhost:5000/auth/google")
            }
          >
            <img
              src="/googleicon.png"
              className="w-3 h-3 sm:w-4 sm:h-4 mr-2"
              alt="Google icon"
            />
            Google
          </button>
        </div>
        <p className="text-white mb-1 text-center text-xs sm:text-lg sm:text-left">
          Don't have an account?{" "}
          <a href="/" className="text-[#FFD910] underline underline-offset-1">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}

export default UserLogin;
