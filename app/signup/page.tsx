

"use client";

import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { signUpUser } from "@/app/auth/actions";

export default function UserProfile() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();
  
  const handleButtonClick = async (): Promise<void> => {
    if (!email || !password || !confirmPassword) {
      console.log(" Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      console.log(" Passwords do not match");
      return;
    }

    setLoading(true); 

    const result = await signUpUser(email, password);

    if (result?.error) {
      console.log( result.error);
      setLoading(false); 
      return;
    }

    console.log("✅ SIGN UP SUCCESS");

    router.push("/login");
  };

  const passwordsMatch = password.length > 0 && password === confirmPassword;

  return (
    // Key change: use flex-1 + grid so it centers in the space BELOW the navbar
    <div className="flex-1 w-full grid place-items-center px-4 bg-white">
      <div className="w-full max-w-sm sm:max-w-md flex flex-col items-center">
        {/* Smaller title */}
        <h1 className="font-semibold text-[#264D73] mb-4 text-2xl sm:text-3xl text-center tracking-tight">
          SIGN UP
        </h1>

        {/* Smaller card */}
        <div className="w-full rounded-xl bg-white p-6 sm:p-7 shadow-xl border border-gray-100">
          <p className="text-center text-md text-gray-400 mb-5">
            Create your account
          </p>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-s font-semibold mb-1.5 text-gray-600">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg bg-gray-50 px-3 py-2.5 text-sm outline-none border border-transparent focus:border-[#7BA63F] focus:ring-4 focus:ring-green-100 transition-all"
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-s font-semibold mb-1.5 text-gray-600">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg bg-gray-50 px-3 py-2.5 text-sm outline-none pr-10 border border-transparent focus:border-[#7BA63F] focus:ring-4 focus:ring-green-100 transition-all"
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="mb-2">
            <label className="block text-s font-semibold mb-1.5 text-gray-600">
              Confirm Password
            </label>

            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full rounded-lg bg-gray-50 px-3 py-2.5 text-sm outline-none pr-10 border border-transparent focus:border-[#7BA63F] focus:ring-4 focus:ring-green-100 transition-all"
              />

              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Password mismatch */}
          {confirmPassword.length > 0 && password !== confirmPassword && (
            <p className="text-s text-red-500 mt-2 mb-3">
              Passwords do not match
            </p>
          )}

          <button
            onClick={handleButtonClick}
            disabled={!passwordsMatch || !email || loading}
            className={`w-full rounded-lg py-2.5 text-white font-bold text-sm transition-all active:scale-95 mt-2 flex items-center justify-center
              ${
                passwordsMatch && email && !loading
                  ? "bg-[#7BA63F] hover:bg-[#6a8f35] shadow-md shadow-green-100"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              "Sign up"
            )}
        </button>
        <p className="text-s text-gray-600 cursor-pointer">
          Already Registered? <a href="/login">Click Here</a>
        </p>
                        

        </div>
      </div>
    </div>
  );
}
