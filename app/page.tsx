"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Homepage() {
  const [showAuthButtons, setShowAuthButtons] = useState(false);
  const router = useRouter();

  const handleGeneratePlan = () => {
    setShowAuthButtons(true);
  };

  const handleLogin = () => {
    router.push("/login");
  };

  const handleSignUp = () => {
    router.push("/signup");
  };

  return (
    // UPDATED CONTAINER CLASSES:
    <div className="w-full flex-1 flex flex-col items-center justify-center px-4 py-10 bg-white">
      {/* Headline */}
      <h1
        className="
        font-poppins font-semibold mb-3
        text-3xl sm:text-4xl md:text-6xl
        text-center leading-tight
        transition-transform duration-500 ease-out
        hover:-translate-y-1
      "
      >
        <span className="text-[#7BA63F]">AI-GUIDED ADAPTIVE</span>
        <br />
        <span className="text-[#264D73]">EXERCISE PLANNER</span>
      </h1>

      {/* Subheading */}
      <p className="text-gray-600 mb-6 text-center text-sm sm:text-base max-w-sm">
        Renew your strength, rebuild your life
      </p>

      {/* Buttons */}
      <div className="flex gap-3 mb-10 flex-wrap justify-center max-w-md">
        <button
          className="border border-black text-black rounded-md px-4 py-2 text-xs sm:text-sm bg-white
            transition-all duration-300 ease-out
            hover:bg-gray-100 hover:-translate-y-0.5 hover:shadow-md"
        >
          Smart Planning
        </button>

        <button
          className="border border-black text-black rounded-md px-4 py-2 text-xs sm:text-sm bg-white
            transition-all duration-300 ease-out
            hover:bg-gray-100 hover:-translate-y-0.5 hover:shadow-md"
        >
          Goal Tracking
        </button>

        <button
          className="border border-black text-black rounded-md px-4 py-2 text-xs sm:text-sm bg-white
            transition-all duration-300 ease-out
            hover:bg-gray-100 hover:-translate-y-0.5 hover:shadow-md"
        >
          Adaptive Workout
        </button>
      </div>

      {/* Heartbeat / Logo Image */}
      <div className="w-40 sm:w-52 md:w-64 mb-10">
        <Image
          src="/logo.png"
          alt="Heartbeat Icon"
          width={400}
          height={100}
          className="w-full h-auto"
          priority
        />
      </div>

      {/* Generate Plan Button OR Auth Buttons */}
      {!showAuthButtons ? (
        <button
          onClick={handleGeneratePlan}
          className="bg-[#264D73] text-white rounded-md px-8 py-3 font-semibold text-lg
          transition-all duration-300 ease-out transform hover:-translate-y-0.5 hover:shadow-md hover:bg-[#1f3e5a] mb-6"
        >
          Generate Your Plan
        </button>
      ) : (
        <div className="flex gap-4 mb-6">
          <button
            onClick={handleLogin}
            className="border border-black text-black rounded-md px-6 py-2 text-sm font-semibold 
            transition-all duration-300 ease-out transform hover:-translate-y-0.5 hover:shadow-md hover:bg-gray-100 w-32"
          >
            LOGIN
          </button>
          <button
            onClick={handleSignUp}
            className="bg-[#264D73] text-white rounded-md px-6 py-2 font-semibold 
            transition-all duration-300 ease-out transform hover:-translate-y-0.5 hover:shadow-md hover:bg-[#1f3e5a] w-32"
          >
            SIGN UP
          </button>
        </div>
      )}

      {/* Footer text */}
      <p className="text-gray-500 text-xs sm:text-sm max-w-xs text-center">
        Start your personalized fitness journey today
      </p>
    </div>
  );
}
