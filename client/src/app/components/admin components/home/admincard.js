import React from "react";

export default function admincard() {
  return (
    <div>
      <a
        href="#"
        className="flex flex-col items-center bg-white border border-gray-200 rounded-xl shadow md:flex-row md:max-w-xs"
      >
        <div className="flex flex-row items-center">
          <div className="px-3">
            <img src="/loc_icon.png" />
          </div>
          <div className="flex flex-col justify-between p-4 leading-normal">
            <p className="mb-2 font-lg font-bold text-gray-700 dark:text-gray-400">
              Total Pin Location
            </p>
            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-800">
              7
            </h5>
          </div>
        </div>
      </a>
    </div>
  );
}
