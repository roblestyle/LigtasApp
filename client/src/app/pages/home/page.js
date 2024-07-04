"use client";
import React from "react";
import CustomWebcam from "@/app/components/home/customwebcam";
import Homebg from "@/app/components/home/homebg";

export default function Home() {
  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <div className="fixed inset-0 z-0">
        <Homebg />
      </div>
      <div className="relative z-10 flex flex-col h-full justify-between">
        <div className="flex justify-center p-4 sm:p-10">
          <h1 className="text-xl sm:text-3xl text-white font-semibold">
            Hello
          </h1>
        </div>
        <div className="flex-grow flex items-center justify-center pb-4 sm:pb-14">
          <CustomWebcam />
        </div>
        <div className="flex justify-end p-4">
          <a
            href="/pages/login"
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
          </a>
        </div>
      </div>
    </div>
  );
}
