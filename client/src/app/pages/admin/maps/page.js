"use client";

import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import Sidebar from "@/app/components/admin components/home/sidebar";
import Dashboardbg from "@/app/components/admin components/home/dashboardbg";

const LeafletMap = dynamic(
  () => import("@/app/components/admin components/home/map"),
  {
    ssr: false, // This ensures the map is rendered only on the client side
  }
);

function MapsPage() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (!storedToken) {
      // Redirect to login if no token found
      window.location.href = "/pages/admin/login";
    } else {
      setToken(storedToken);
    }
  }, []);

  return (
    <div className="relative h-screen w-screen">
      {/* Background Regcard */}
      <div className="absolute inset-0 z-0">
        <Dashboardbg />
      </div>
      <div className="flex flex-rows">
        <div className="relative flex justify-start p-4 items-center h-screen z-10">
          <Sidebar />
        </div>

        <div className="relative p-4 w-full">
          <div className="mt-3">
            <p className="font-medium text-white text-sm mb-5">
              Pages/ Map Dashboard
            </p>
            <h1 className="font-semibold text-white text-md">Map Dashboard</h1>
          </div>
          <div className="w-full h-64 my-7">
            {token && <LeafletMap token={token} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MapsPage;
