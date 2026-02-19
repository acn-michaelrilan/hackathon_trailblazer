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

  // --- MATCHED SETTINGS FROM HOMEPAGE ---
  const gradientColor = "from-[#f8fafc] via-[#eef2ff] to-[#f0fdf4]";
  const blob1Color = "bg-[#7BA63F]/10";
  const blob2Color = "bg-[#264D73]/10";
  const animationSpeed = "20s";
  // --------------------------------------
  
  const handleButtonClick = async (): Promise<void> => {
    if (!email || !password || !confirmPassword) return;
    if (password !== confirmPassword) return;

    setLoading(true); 
    const result = await signUpUser(email, password);

    if (result?.error) {
      setLoading(false); 
      return;
    }

    router.push("/login");
  };

  const passwordsMatch = password.length > 0 && password === confirmPassword;

  return (
    <div className={`relative flex-1 w-full min-h-screen grid place-items-center px-4 overflow-hidden bg-gradient-to-br ${gradientColor}`}>
      
      {/* MATCHED ANIMATION STYLES */}
      <style jsx>{`
        @keyframes float {
          0% { transform: translate(0, 0) scale(1); }
          40% { transform: translate(30px, -50px) scale(1.1); }
          60% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0, 0) scale(1); }
        }
        .animate-blob {
          animation: float ${animationSpeed} infinite ease-in-out;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>

      {/* MATCHED MOVING BLOBS */}
      <div className={`absolute top-0 -left-4 w-72 h-72 ${blob1Color} rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob`} />
      <div className={`absolute bottom-0 -right-4 w-72 h-72 ${blob2Color} rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000`} />

      {/* MAIN CONTENT */}
      <div className="relative z-10 w-full max-w-sm sm:max-w-md flex flex-col items-center">
        <h1 className="font-semibold text-[#264D73] mb-4 text-2xl sm:text-3xl text-center tracking-tight">
          SIGN UP
        </h1>

        <div className="w-full rounded-xl bg-white/80 backdrop-blur-md p-6 sm:p-7 shadow-xl border border-white/20">
          <p className="text-center text-sm text-gray-500 mb-5">
            Create your account
          </p>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-xs font-semibold mb-1.5 text-gray-600 uppercase tracking-wider">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg bg-white/50 px-3 py-2.5 text-sm outline-none border border-gray-200 focus:border-[#7BA63F] focus:ring-4 focus:ring-green-100 transition-all"
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-xs font-semibold mb-1.5 text-gray-600 uppercase tracking-wider">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg bg-white/50 px-3 py-2.5 text-sm outline-none pr-10 border border-gray-200 focus:border-[#7BA63F] focus:ring-4 focus:ring-green-100 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="mb-2">
            <label className="block text-xs font-semibold mb-1.5 text-gray-600 uppercase tracking-wider">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full rounded-lg bg-white/50 px-3 py-2.5 text-sm outline-none pr-10 border border-gray-200 focus:border-[#7BA63F] focus:ring-4 focus:ring-green-100 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Password mismatch */}
          {confirmPassword.length > 0 && password !== confirmPassword && (
            <p className="text-xs text-red-500 mt-2 mb-3">
              Passwords do not match
            </p>
          )}

          <button
            onClick={handleButtonClick}
            disabled={!passwordsMatch || !email || loading}
            className={`w-full rounded-lg py-2.5 text-white font-bold text-sm transition-all active:scale-95 mt-4 flex items-center justify-center
              ${
                passwordsMatch && email && !loading
                  ? "bg-[#7BA63F] hover:bg-[#6a8f35] shadow-md shadow-green-100"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              "Sign up"
            )}
          </button>
          
          <p className="text-sm text-gray-600 text-center mt-4">
            Already Registered? <a href="/login" className="text-[#264D73] font-semibold hover:underline">Click Here</a>
          </p>
        </div>
      </div>
    </div>
  );
}