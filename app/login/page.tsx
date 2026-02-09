"use client";

import React, { useState } from "react";
import { Eye, EyeOff, X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function UserProfile() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [acceptedTerms, setAcceptedTerms] = useState<boolean>(false);
  const [showTermsModal, setShowTermsModal] = useState<boolean>(false);

  const router = useRouter();

  const canLogin = email.trim() !== "" && password.trim() !== "" && acceptedTerms;

  const handleButtonClick = (): void => {
    if (!canLogin) return;
    console.log("✅ LOGIN SUCCESS", { email, password });
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 bg-white">
      <div className="flex flex-col items-center justify-center w-full max-w-md">
        <h1 className="font-semibold text-[#264D73] mb-8 text-4xl sm:text-5xl text-center tracking-tight">
          LOGIN
        </h1>

        <div className="w-full rounded-2xl bg-white p-8 shadow-2xl border border-gray-100">
          <div className="space-y-5">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-semibold mb-1.5 text-gray-600">Email</label>
              <input
                type="email"
                placeholder="enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg bg-gray-50 px-4 py-3 text-sm outline-none border border-transparent focus:border-[#7BA63F] focus:ring-4 focus:ring-green-100 transition-all"
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-semibold mb-1.5 text-gray-600">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg bg-gray-50 px-4 py-3 text-sm outline-none border border-transparent focus:border-[#7BA63F] focus:ring-4 focus:ring-green-100 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* --- EXTERNAL CHECKBOX --- */}
            <div className="flex items-center gap-3 py-2">
              <input
                id="main-terms"
                type="checkbox"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
                className="w-5 h-5 accent-[#7BA63F] rounded cursor-pointer transition-transform active:scale-90"
              />
              <label htmlFor="main-terms" className="text-sm text-gray-600 cursor-pointer">
                I agree to the{" "}
                <button
                  type="button"
                  onClick={() => setShowTermsModal(true)}
                  className="text-blue-600 underline hover:text-blue-800 font-medium"
                >
                  Terms & Conditions
                </button>
              </label>
            </div>

            {/* Login Button */}
            <button
              onClick={handleButtonClick}
              disabled={!canLogin}
              className={`w-full rounded-xl py-3.5 text-white font-bold text-lg transition-all active:scale-95 ${
                canLogin
                  ? "bg-[#7BA63F] hover:bg-[#6a8f35] shadow-lg shadow-green-100"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              Login
            </button>
          </div>
        </div>
      </div>

      {/* --- TERMS MODAL --- */}
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

            <h2 className="text-2xl font-bold text-gray-800 mb-4">Terms & Conditions</h2>
            
            <div className="bg-gray-50 rounded-xl p-4 mb-6 max-h-60 overflow-y-auto text-sm text-gray-600 leading-relaxed border border-gray-100">
                <h3 className="font-bold text-gray-800 mb-2">Terms & Conditions: AI-Guided Adaptive Exercise Planner</h3>
                <p className="mb-3 text-xs text-gray-400 italic">Last Updated: February 2026</p>
                
                <p className="mb-4">
                  <strong>1. Nature of AI Recommendations:</strong> You acknowledge that the exercise plans provided are generated by an Artificial Intelligence (AI) algorithm. While designed to be adaptive and data-driven, these recommendations are for informational purposes only and do not constitute professional medical advice or physical therapy.
                </p>

                <p className="mb-4">
                  <strong>2. Health & Safety Warning:</strong> Always consult with a physician before starting any new exercise program. You assume all risks associated with physical activity. If you experience pain, dizziness, or shortness of breath at any time, you must stop the exercise immediately.
                </p>

                <p className="mb-4">
                  <strong>3. Adaptive Data Usage:</strong> Our AI improves by analyzing your performance data. By using this service, you grant us permission to process your workout metrics, heart rate data (if provided), and feedback to refine and personalize your adaptive plan.
                </p>

                <p className="mb-4">
                  <strong>4. Limitation of Liability:</strong> Trailblazers and its affiliates shall not be held liable for any injuries, health complications, or damages resulting from the use of AI-generated workout plans or the misinterpretation of exercise instructions.
                </p>

                <p className="mb-4">
                  <strong>5. User Responsibility:</strong> You are responsible for ensuring your exercise environment is safe and that you have the proper equipment. The AI cannot "see" your surroundings or verify your form in real-time unless specifically stated.
                </p>

                <p className="mb-4">
                  <strong>6. Privacy & Security:</strong> Your biometric data is encrypted. However, you are responsible for maintaining the confidentiality of your account credentials to prevent unauthorized access to your health profile.
                </p>

                <p className="text-xs text-gray-400 italic">
                  By checking the box below, you acknowledge that you have read, understood, and agreed to be bound by these Terms.
                </p>
              </div>

            {/* --- INTERNAL MODAL CHECKBOX --- */}
            <label className="flex items-center gap-3 p-4 bg-green-50 rounded-2xl cursor-pointer hover:bg-green-100 transition-colors border border-green-100 mb-6">
              <input
                type="checkbox"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
                className="w-5 h-5 accent-[#7BA63F] rounded cursor-pointer"
              />
              <span className="text-sm font-semibold text-green-800">
                I agree to the Terms & Conditions
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