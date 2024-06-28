"use client";

import React, { useState } from "react";
import axios from "axios";

function Regform() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("/api/auth/google", {
        name,
        email,
        password,
      });

      console.log("Registration successful:", response.data);
      // Optionally handle success (redirect, show message, etc.)
    } catch (error) {
      console.error("Registration failed:", error);
      // Handle error (show error message, etc.)
    }
  };

  return (
    <>
      <div className="w-full m-8 grid grid-cols-2 gap-2">
        <div className="h-full flex items-center justify-center p-4">
          <div className="flex flex-col items-center">
            <h1 className="text-5xl font-bold text-white mb-3">
              Batangas State University
            </h1>
            <p className="text-xl font-medium text-white justify-center">
              Command Center
            </p>
            <img src="/logon1.png" className="w-52 h-51 mt-24" alt="Logo" />
          </div>
        </div>
        <div className="h-full flex flex-col justify-start p-4">
          <h1 className="text-3xl font-semibold text-white mb-7">
            Create an account
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="w-full grid grid-cols-2 gap-2 mb-4">
              <div className="rounded-lg h-full pr-4">
                <div className="mb-1">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm text-white"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Enter Name"
                    required
                  />
                </div>
              </div>
              <div className="rounded-lg h-full pr-4">
                <div className="mb-1">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm text-white"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                    placeholder="Enter Email"
                    required
                  />
                </div>
              </div>
            </div>
            <div className="mb-10 pr-4">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-white"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                placeholder="Enter Password"
                required
              />
            </div>
            <div className="flex justify-center items-center">
              <button
                type="submit"
                className="text-black bg-white text-xl focus:ring-1 focus:outline-none focus:ring-[#FFD910]/50 font-medium rounded-md text-sm px-5 py-2.5 text-center w-80 inline-flex justify-center items-center mb-2"
              >
                Create Account
              </button>
            </div>
          </form>
          <div className="my-8 text-center">
            <div className="flex items-center justify-center">
              <hr className="border-t-2 border-yellow-400 w-full" />
              <span className="mx-4 text-white uppercase tracking-wide">
                Or
              </span>
              <hr className="border-t-2 border-yellow-400 w-full" />
            </div>
          </div>

          <div className="flex justify-center items-center mb-7">
            <button
              type="button"
              className="text-black bg-white text-xl focus:ring-1 focus:outline-none focus:ring-[#FFD910]/50 font-medium rounded-md text-sm px-5 py-2.5 text-center w-80 inline-flex justify-center items-center mb-2"
              onClick={() =>
                (window.location.href = "http://localhost:5000/auth/google")
              }
            >
              <img
                src="/googleicon.png"
                className="w-5 h-5 mr-2"
                alt="Google icon"
              />
              Google
            </button>
          </div>
          <p className="text-white mb-1">
            Already have an account?{" "}
            <span className="text-[#FFD910] underline underline-offset-1">
              Sign in
            </span>
          </p>
          <p className="text-white mb-3">
            By registering, you agree with
            <span className="text-[#FFD910]"> terms and conditions </span>
            and
            <span className="text-[#FFD910]"> privacy policy</span>.
          </p>
        </div>
      </div>
    </>
  );
}

export default Regform;
