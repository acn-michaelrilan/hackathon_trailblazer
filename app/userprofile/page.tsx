"use client";
import React, { useState } from "react";
export default function userprofile() {
/*--------------------------FUNCTIONALITY-------------------------------*/

const [isDarkPage, setIsDarkPage] = useState<boolean>(false);

  // Toggle page background
  const handleButtonClick = (): void => {
    setIsDarkPage(true); // Change page background to dark
  };

/*--------------------------DESIGN-------------------------------*/
  return (      

    <div className={ "flex items-center justify-center min-h-screen transition-colors " + (isDarkPage ? "bg-gray-900" : "bg-gray-50")} >
        <form className="flex flex-col space-y-4 w-64 bg-white p-6 rounded-lg shadow-md">
            <div className="flex flex-col space-y-4">
                <h1 className="text-center font-bold text-5xl" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        USER PROFILE
                    </h1>

                <p className="text-center">
                    Manage your account information
                    </p>

                    <div className="flex flex-col">
                        <label className="font-medium text-gray-700 mb-1">Name:</label>
                        <input
                            className="border border-black px-4 py-2 rounded-md"
                            type="text"
                            placeholder="Enter your Name"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="font-medium text-gray-700 mb-1">Email:</label>
                        <input
                            className="border border-black px-4 py-2 rounded-md"
                            type="text"
                            placeholder="Enter your Email"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="font-medium text-gray-700 mb-1">Member Since:</label>
                        <input
                            className="border border-black px-4 py-2 rounded-md"
                            type="date"
                            placeholder="Select a date"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="font-medium text-gray-700 mb-1">Account Status:</label>
                        <input
                            className="border border-black px-4 py-2 rounded-md"
                            type="text"
                            placeholder="Enter account status"
                        />
                    </div>

                   <button
                        type="button"
                        className="border border-black px-4 py-2 rounded-md mt-4 bg-green-500 text-white hover:bg-blue-600 transition-colors"
                        onClick={handleButtonClick}
                    >
                        Update Profile
                    </button>            
            </div>
        </form>
    </div>
  );
}
