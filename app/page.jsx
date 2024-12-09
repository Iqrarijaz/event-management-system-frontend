"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

function HomePage() {
  const router = useRouter();
  return (
    <div className="flex items-center justify-center h-screen p-6 bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-6">
          Welcome to <br />
          Event Management System (EMS)
        </h1>
        <div className="flex flex-col items-center space-y-4">
          <button
            onClick={() => router.push("/user")}
            className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition duration-200"
          >
            Use as User
          </button>
          <button
            onClick={() => router.push("/admin")}
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
          >
            Login as Admin
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
