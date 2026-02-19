"use client";

import React, { useState } from "react";
import { Eye, EyeOff, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/app/auth/actions";
import toast from "react-hot-toast";

export default function UserProfile() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [acceptedTerms, setAcceptedTerms] = useState<boolean>(false);
  const [showTermsModal, setShowTermsModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  // --- MATCHED SETTINGS FROM HOMEPAGE ---
  const gradientColor = "from-[#f8fafc] via-[#eef2ff] to-[#f0fdf4]";
  const blob1Color = "bg-[#7BA63F]/10";
  const blob2Color = "bg-[#264D73]/10";
  const animationSpeed = "20s";
  // --------------------------------------

  const canLogin = email.trim() !== "" && password.trim() !== "" && acceptedTerms;

  const handleButtonClick = async (): Promise<void> => {
    if (!canLogin) return;
    setLoading(true);

    const result = await loginUser(email, password);
    if (result?.error) {
      toast.error(result.error);
      setLoading(false);
      return;
    }

    toast.success("Logged in successfully!");
    router.replace("/login");
    router.refresh(); 
  };

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
        <h3 className="font-semibold text-[#264D73] mb-4 text-2xl sm:text-3xl text-center tracking-tight">
          LOGIN
        </h3>

        <div className="w-full rounded-xl bg-white/80 backdrop-blur-md p-6 sm:p-7 shadow-xl border border-white/20">
          <div className="space-y-4">
            {/* Email Field */}
            <div>
              <label className="block text-xs font-semibold mb-1.5 text-gray-600 uppercase tracking-wider">
                Email
              </label>
              <input
                type="email"
                placeholder="enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg bg-white/50 px-3 py-2.5 text-sm outline-none border border-gray-200 focus:border-[#7BA63F] focus:ring-4 focus:ring-green-100 transition-all"
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-semibold mb-1.5 text-gray-600 uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg bg-white/50 px-3 py-2.5 text-sm outline-none border border-gray-200 focus:border-[#7BA63F] focus:ring-4 focus:ring-green-100 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Checkbox */}
            <div className="flex items-center gap-3 pt-1">
              <input
                id="main-terms"
                type="checkbox"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
                className="w-4 h-4 accent-[#7BA63F] rounded cursor-pointer transition-transform active:scale-90"
              />
              <label htmlFor="main-terms" className="text-sm text-gray-600 cursor-pointer">
                I agree to the{" "}
                <button
                  type="button"
                  onClick={() => setShowTermsModal(true)}
                  className="text-[#264D73] underline hover:text-blue-800 font-medium"
                >
                  Terms &amp; Conditions
                </button>
              </label>
            </div>

            <button
              onClick={handleButtonClick}
              disabled={!canLogin || loading}
              className={`w-full rounded-lg py-2.5 text-white font-bold text-sm transition-all active:scale-95 flex items-center justify-center ${
                canLogin && !loading
                  ? "bg-[#7BA63F] hover:bg-[#6a8f35] shadow-md shadow-green-100"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                "Login"
              )}
            </button>

            <p className="text-sm text-gray-600 text-center">
              Not Registered yet? <a href="/signup" className="text-[#264D73] font-semibold hover:underline">Click Here</a>
            </p>
          </div>
        </div>
      </div>

      {/* Terms Modal remains the same but fits the theme... */}
      {showTermsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setShowTermsModal(false)}
          />
          <div className="relative bg-white rounded-3xl w-full max-w-lg p-8 shadow-2xl animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setShowTermsModal(false)}
              className="absolute top-5 right-5 p-2 text-gray-400 hover:bg-gray-100 rounded-full"
            >
              <X size={24} />
            </button>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Terms &amp; Conditions</h2>
            <div className="bg-gray-50 rounded-xl p-4 mb-6 max-h-60 overflow-y-auto text-sm text-gray-600 leading-relaxed border border-gray-100">
              <p className="italic">
                By checking the box below, you acknowledge that you have read, understood, and agreed to be bound by these Terms.
              </p>
            </div>
            <label className="flex items-center gap-3 p-4 bg-green-50 rounded-2xl cursor-pointer hover:bg-green-100 transition-colors border border-green-100 mb-6">
              <input
                type="checkbox"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
                className="w-5 h-5 accent-[#7BA63F] rounded cursor-pointer"
              />
              <span className="text-sm font-semibold text-green-800">
                I agree to the Terms &amp; Conditions
              </span>
            </label>
            <button
              onClick={() => setShowTermsModal(false)}
              className="w-full bg-[#264D73] text-white py-4 rounded-2xl font-bold hover:bg-[#1a3550] transition-all"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}