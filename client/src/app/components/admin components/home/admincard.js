"use client";

import React, { useState } from 'react';

const AdminCard = ({ totalMarkers, okCount, notOkCount, rescuedCount, setFilterStatus, setDateFilter }) => {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleDateFilter = () => {
    setDateFilter({ start: startDate, end: endDate });
  };

  return (
    <div className="flex flex-wrap gap-4 justify-center md:justify-start">
    
        <div className="cursor-pointer flex flex-row items-center flex-col items-center bg-white border border-gray-200 rounded-xl shadow md:flex-row md:max-w-xs" onClick={() => setFilterStatus(null)}>
          <div className="px-3">
            <img src={`${basePath}/loc_icon.png`} alt="Location Icon" />
          </div>
          <div className="flex flex-col justify-between p-4 leading-normal">
            <p className="mb-2 font-lg font-bold text-gray-700 dark:text-gray-400">
              Total Pin Location
            </p>
            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-800">
              {totalMarkers}
            </h5>
            <p className="mb-2 font-lg text-white text-xs">
              Click to filter
            </p>
          </div>
        </div>
  

 
           <div 
        className="cursor-pointer flex flex-col items-center bg-green-400 border border-green-400 rounded-xl shadow md:flex-row md:max-w-xs"
        onClick={() => setFilterStatus("is Safe")}
      >
          <div className="px-3">
            <img src={`${basePath}/safe-icon.png`} alt="Location Icon" className="w-12 h-12" />
          </div>
          <div className="flex flex-col justify-between p-4 leading-normal text-white" >
            <p className="mb-2 font-lg font-bold text-white">
              Safe Spartan
            </p>
            <h5 className="mb-2 text-xl font-bold tracking-tight text-white">
              {okCount}
            </h5>
            <p className="mb-2 font-lg text-white text-xs">
              Click to filter
            </p>
          </div>
        </div>
 

        <div 
        className="cursor-pointer flex flex-col items-center bg-red-800 border border-red-800 rounded-xl shadow md:flex-row md:max-w-xs"
        onClick={() => setFilterStatus("Needs Help")}
      >
          <div className="px-3">
            <img src={`${basePath}/unsafe.png`} alt="Location Icon" className="w-12 h-12" />
          </div>
          <div className="flex flex-col justify-between p-4 leading-normal">
            <p className="mb-2 font-lg font-bold text-white">
              Needs Help
            </p>
            <h5 className="mb-2 text-xl font-bold tracking-tight text-white">
              {notOkCount}
            </h5>
            <p className="mb-2 font-lg text-white text-xs">
              Click to filter
            </p>
          </div>
        </div>


        <div 
        className="cursor-pointer flex flex-col items-center bg-sky-800 border border-sky-800 rounded-xl shadow md:flex-row md:max-w-xs"
        onClick={() => setFilterStatus("is Rescued")}
      >
          <div className="px-3">
            <img src={`${basePath}/helped.png`} alt="Location Icon" className="w-12 h-12" />
          </div>
          <div className="flex flex-col justify-between p-4 leading-normal">
            <p className="mb-2 font-lg font-bold text-white">
              Helped Spartan
            </p>
            <h5 className="mb-2 text-xl font-bold tracking-tight text-white">
              {rescuedCount}
            </h5>
            <p className="mb-2 font-lg text-white text-xs">
              Click to filter
            </p>
          </div>
        </div>
    
        {/* Date Filter */}
        <div className="flex flex-col items-center">
        <label className="mb-1 font-sm font-bold text-white">Filter by Date</label>
        <div className="flex flex-col gap-1">
          <input 
            type="date" 
            value={startDate} 
            onChange={(e) => setStartDate(e.target.value)} 
            className="border rounded p-1 text-sm"
          />
          <input 
            type="date" 
            value={endDate} 
            onChange={(e) => setEndDate(e.target.value)} 
            className="border rounded p-1 text-sm"
          />
          <button 
            onClick={handleDateFilter} 
            className="bg-blue-500 text-white rounded px-2 py-1 text-sm"
          >
            Apply
          </button>
        </div>
      </div>

    </div>
  );
};

export default AdminCard;
