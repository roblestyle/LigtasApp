// components/WebcamComponent.js
import React, { useState, useRef } from "react";
import Webcam from "react-webcam";
import axios from "../../api/axios";

const WebcamComponent = () => {
  const webcamRef = useRef(null);
  const [error, setError] = useState(null);

  const handleUserMediaError = (error) => {
    console.error("Error accessing webcam:", error);
    setError("Error accessing webcam. Please check permissions or try again.");
  };

  const capture = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();

      // Convert Base64 image to a blob
      fetch(imageSrc)
        .then((res) => res.blob())
        .then((blob) => {
          const formData = new FormData();
          formData.append("image", blob, "webcam-image.jpg"); // Append the blob as "image" with a filename

          // Axios POST request
          axios
            .post("/api/upload", formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            })
            .then((response) => {
              console.log("Image uploaded successfully:", response.data);
            })
            .catch((error) => {
              console.error("Error uploading image:", error);
            });
        });
    }
  };

  return (
    <div className="flex flex-col justify-center p-4">
      <div className="flex justify-center">
        {error && <p className="p-4 text-red-500">{error}</p>}
      </div>
      <div className="flex items-center justify-center">
        <div className="rounded-lg h-auto w-auto flex items-center justify-center">
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={400}
            height={400}
            onUserMediaError={handleUserMediaError}
            className="rounded-lg border"
          />
        </div>
      </div>

      <div className="flex flex-col p-4">
        <div className="flex justify-center">
          <button
            onClick={capture}
            className="bg-red-800 text-white py-2 px-2 mt-2 rounded-md hover:bg-red-900"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-10"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
              />
            </svg>
          </button>
        </div>
        <p className="flex justify-center text-white font-medium py-3">
          Take a picture
        </p>
      </div>
    </div>
  );
};

export default WebcamComponent;
