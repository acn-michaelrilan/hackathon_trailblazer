"use client";

import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";

export default function UserProfile() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const router = useRouter();

  /* ---------------- SIGN UP HANDLER ---------------- */
  const handleButtonClick = (): void => {
    if (!email || !password || !confirmPassword) {
      console.log("❌ Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      console.log("❌ Passwords do not match");
      return;
    }

    console.log("✅ SIGN UP SUCCESS");
    console.log("Email:", email);
    console.log("Password:", password);

    // Redirect after signup
    setTimeout(() => {
      router.push("/login");
    }, 1000);
  };

  const passwordsMatch =
    password.length > 0 && password === confirmPassword;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-white">
      
      {/* Title */}
      <h1 className="font-poppins font-semibold text-[#264D73] mb-6 sm:mb-8 text-4xl sm:text-5xl md:text-6xl text-center">
        SIGN UP
      </h1>

      <div className="w-full max-w-md rounded-2xl bg-white p-6 sm:p-8 shadow-xl">
        <p className="text-center text-sm text-gray-400 mb-6">
          Create your account
        </p>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-gray-700">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md bg-gray-100 px-4 py-2.5 text-sm outline-none"
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-gray-700">
            Password
          </label>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md bg-gray-100 px-4 py-2.5 text-sm outline-none pr-10"
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div className="mb-2">
          <label className="block text-sm font-medium mb-1 text-gray-700">
            Confirm Password
          </label>

          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
              className="w-full rounded-md bg-gray-100 px-4 py-2.5 text-sm outline-none pr-10"
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword((prev) => !prev)
              }
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showConfirmPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
          </div>
        </div>

        {/* Password mismatch */}
        {confirmPassword.length > 0 &&
          password !== confirmPassword && (
            <p className="text-sm text-red-500 mb-4">
              Passwords do not match
            </p>
          )}

        {/* Button */}
        <button
          onClick={handleButtonClick}
          disabled={!passwordsMatch || !email}
          className={`w-full rounded-xl py-3 text-white font-semibold transition
          ${
            passwordsMatch && email
              ? "bg-green-500 hover:bg-green-600"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          Sign up
        </button>
      </div>
    </div>
  );
}
