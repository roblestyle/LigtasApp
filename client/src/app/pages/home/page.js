"use client";
import React from "react";
import CustomWebcam from "@/app/components/home/customwebcam";

export default function Home() {
  return (
    <>
      <div className="flex justify-center p-10">
        <h1 className="text-4xl text-black font-semibold">Hello</h1>
      </div>
      <div>
        <CustomWebcam />
      </div>
    </>
  );
}
