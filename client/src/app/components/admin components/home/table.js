"use client";
import React, { useEffect, useState } from "react";
import api from "../../../api/axios";

export default function Table() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get("/api/users"); // Relative URL
        setUsers(response.data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-center text-gray-900">
          <caption className="p-4 text-md font-semibold text-left rtl:text-right text-gray-900 bg-white">
            <div className="px-4 flex justify-start">
              <label htmlFor="table-search" className="sr-only">
                Search
              </label>
              <div className="relative mt-1">
                <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  id="table-search"
                  className="block py-2 ps-10 text-sm text-gray-700 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search"
                />
              </div>
            </div>
          </caption>
          <thead className="text-xs text-white uppercase bg-red-950">
            <tr>
              <th scope="col" className="px-6 py-3">
                USERS
              </th>
              <th scope="col" className="px-6 py-3">
                NAME
              </th>
              <th scope="col" className="px-6 py-3">
                EMAIL
              </th>
              <th scope="col" className="px-6 py-3">
                DATE CREATED
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index} className="bg-white border-b text-gray-600">
                <td className="px-6 py-4 text-center">
                  {user.profile_image && (
                    <img
                      src={user.profile_image}
                      alt="Profile Image"
                      className="inline-block h-10 w-10 rounded-md"
                    />
                  )}
                </td>
                <td className="px-6 py-4">
                  {user.name ? user.name : user.username}
                </td>

                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">{user.createdAt}</td>
                <td className="px-6 py-4 text-right">
                  <a
                    href="#"
                    className="font-medium text-red-900 hover:underline"
                  >
                    Edit
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
