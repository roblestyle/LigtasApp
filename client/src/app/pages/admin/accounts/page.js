"use client";

import { React, useEffect } from "react";
import Sidebar from "@/app/components/admin components/home/sidebar";
import Dashboardbg from "@/app/components/admin components/home/dashboardbg";
import Table from "@/app/components/admin components/home/table";

export default function page() {
  useEffect(() => {
    const adminToken = localStorage.getItem("adminToken");

    if (!adminToken) {
      window.location.href = "/pages/admin/login";
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
              Pages/ Accounts
            </p>
            <h1 className="font-semibold text-white text-md">User Accounts</h1>
          </div>
          <div className="w-full h-64 my-7">
            <Table />
          </div>
        </div>
      </div>
    </div>
  );
}
