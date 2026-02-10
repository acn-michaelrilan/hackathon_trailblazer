"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle } from "lucide-react"; // Nice warning icon

export default function UserProfile() {
  const [isDarkPage, setIsDarkPage] = useState<boolean>(false);
  const [showLogoutModal, setShowLogoutModal] = useState<boolean>(false); // New State
  const router = useRouter();

  const handleButtonClick = (): void => {
    setIsDarkPage(true);
  };

  // 🔹 Actual Logout Logic
  const confirmLogout = (): void => {
    router.push("/"); // redirect to homepage
  };

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen px-4 transition-colors duration-500 ${
        isDarkPage ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      {/* Page Title */}
      <h1 className="font-poppins font-semibold text-[#264D73] mb-6 sm:mb-8 text-4xl sm:text-5xl md:text-6xl text-center">
        USER PROFILE
      </h1>

      <div className="w-full max-w-md rounded-2xl bg-white p-6 sm:p-8 shadow-xl">
        <p className="text-center text-sm text-gray-400 mb-6">
          Manage your account information
        </p>

        {/* Form Inputs */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Name</label>
            <input type="text" placeholder="enter your name" className="w-full rounded-md bg-gray-100 px-4 py-2.5 text-sm outline-none" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Email</label>
            <input type="email" placeholder="enter your email" className="w-full rounded-md bg-gray-100 px-4 py-2.5 text-sm outline-none" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Member Since</label>
            <input type="date" className="w-full rounded-md bg-gray-100 px-4 py-2.5 text-sm outline-none" />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-1 text-gray-700">Account Status</label>
            <textarea rows={3} className="w-full rounded-md bg-gray-100 px-4 py-2.5 text-sm outline-none resize-none" />
          </div>
        </div>

        {/* Update Button */}
        <button
          onClick={handleButtonClick}
          className="w-full rounded-xl bg-[#7BA63F] py-3 text-white font-semibold hover:bg-green-600 transition mb-3 shadow-md"
        >
          Update Profile
        </button>

        {/* 🔹 Trigger Logout Modal */}
        <button
          onClick={() => setShowLogoutModal(true)}
          className="w-full rounded-xl bg-red-500 py-3 text-white font-semibold hover:bg-red-600 transition shadow-md"
        >
          Logout
        </button>
      </div>

      {/* --- LOGOUT CONFIRMATION MODAL --- */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop Blur */}
          <div 
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={() => setShowLogoutModal(false)} 
          />
          
          {/* Modal Card */}
          <div className="relative bg-white rounded-3xl w-full max-w-sm p-8 shadow-2xl animate-in zoom-in duration-200 text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-red-100 rounded-full text-red-500">
                <AlertCircle size={40} />
              </div>
            </div>
            
            <h2 className="text-xl font-bold text-gray-800 mb-2">Are you sure?</h2>
            <p className="text-gray-500 text-sm mb-8">
              You are about to log out of your profile. You will need to sign in again to access your data.
            </p>

            <div className="flex flex-col gap-3">
              <button
                onClick={confirmLogout}
                className="w-full bg-red-500 text-white py-3 rounded-xl font-bold hover:bg-red-600 transition-all active:scale-95"
              >
                Yes, Log Me Out
              </button>
              <button
                onClick={() => setShowLogoutModal(false)}
                className="w-full bg-gray-100 text-gray-600 py-3 rounded-xl font-bold hover:bg-gray-200 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}