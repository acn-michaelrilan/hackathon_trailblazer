// "use client";

// import { useState } from "react";
// import Image from "next/image";
// import { useRouter } from "next/navigation";

// export default function Homepage() {
//   const [showAuthButtons, setShowAuthButtons] = useState(false);
//   const router = useRouter();

//   const handleGeneratePlan = () => {
//     setShowAuthButtons(true);
//   };

//   const handleLogin = () => {
//     router.push("/login");
//   };

//   const handleSignUp = () => {
//     router.push("/signup");
//   };

//   return (
//     // UPDATED CONTAINER CLASSES:
//     <div className="w-full flex-1 flex flex-col items-center justify-center px-4 py-10 bg-white">
//       {/* Headline */}
//       <h1 className="font-poppins font-semibold mb-3 text-3xl sm:text-4xl md:text-6xl text-center leading-tight transition-transform duration-500 ease-out hover:-translate-y-1">
//         <span className="text-[#7BA63F]">AI-GUIDED ADAPTIVE</span>
//         <br />
//         <span className="text-[#264D73]">EXERCISE PLANNER</span>
//       </h1>

//       {/* Subheading */}
//       <p className="text-gray-600 mb-6 text-center text-sm sm:text-base max-w-sm">
//         Renew your strength, rebuild your life
//       </p>

//       {/* Buttons */}
//       {/* Feature Pills (NOT CLICKABLE — design only) */}
//       <div className="flex gap-3 mb-10 flex-wrap justify-center max-w-md">
//         <span
//           aria-hidden="true"
//           className="border border-black text-black rounded-md px-4 py-2 text-xs sm:text-sm bg-white pointer-events-none select-none cursor-default"
//         >
//           Smart Planning
//         </span>

//         <span
//           aria-hidden="true"
//           className="border border-black text-black rounded-md px-4 py-2 text-xs sm:text-sm bg-white pointer-events-none select-none cursor-default"
//         >
//           Goal Tracking
//         </span>

//         <span
//           aria-hidden="true"
//           className="border border-black text-black rounded-md px-4 py-2 text-xs sm:text-sm bg-white pointer-events-none select-none cursor-default"
//         >
//           Adaptive Workout
//         </span>
//       </div>
//       {/* Heartbeat / Logo Image */}
//       <div className="w-40 sm:w-52 md:w-64 mb-10">
//         <Image
//           src="/logo.png"
//           alt="Heartbeat Icon"
//           width={400}
//           height={100}
//           className="w-full h-auto"
//           priority
//         />
//       </div>

//       {/* Generate Plan Button OR Auth Buttons */}
//       {!showAuthButtons ? (
//         <button
//           onClick={handleGeneratePlan}
//           className="bg-[#264D73] text-white rounded-md px-8 py-3 font-semibold text-lg transition-all duration-300 ease-out transform hover:-translate-y-0.5 hover:shadow-md hover:bg-[#1f3e5a] mb-6"
//         >
//           Generate Your Plan
//         </button>
//       ) : (
//         <div className="flex gap-4 mb-6">
//           <button
//             onClick={handleLogin}
//             className="border border-black text-black rounded-md px-6 py-2 text-sm font-semibold  transition-all duration-300 ease-out transform hover:-translate-y-0.5 hover:shadow-md hover:bg-gray-100 w-32"
//           >
//             LOGIN
//           </button>
//           <button
//             onClick={handleSignUp}
//             className="bg-[#264D73] text-white rounded-md px-6 py-2 font-semibold transition-all duration-300 ease-out transform hover:-translate-y-0.5 hover:shadow-md hover:bg-[#1f3e5a] w-32"
//           >
//             SIGN UP
//           </button>
//         </div>
//       )}

//       {/* Footer text */}
//       <p className="text-gray-500 text-xs sm:text-sm max-w-xs text-center">
//         Start your personalized fitness journey today
//       </p>
//     </div>
//   );
// }

// "use client";

// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { useState } from "react";

// export default function Homepage() {
//   const router = useRouter();

//   const [isCheckingAuth, setIsCheckingAuth] = useState(false);
//   const [showAuthButtons, setShowAuthButtons] = useState(false);

//   const handleGeneratePlan = async () => {
//     if (isCheckingAuth) return;
//     setIsCheckingAuth(true);

//     try {
//       // If your route is app/api/user/route.ts, change this to "/api/user"
//       const res = await fetch("/api/auth/user", { method: "GET" });

//       // If API fails, treat as unauthenticated
//       if (!res.ok) {
//         setShowAuthButtons(true);
//         return;
//       }

//       const data: { loggedIn?: boolean } = await res.json();

//       if (data.loggedIn) {
//         router.push("/informationinput");
//       } else {
//         // unauthenticated: hide Generate button and show Login/Sign up
//         setShowAuthButtons(true);
//       }
//     } catch {
//       // network/runtime error -> treat as unauthenticated
//       setShowAuthButtons(true);
//     } finally {
//       setIsCheckingAuth(false);
//     }
//   };

//   const handleLogin = () => router.push("/login");
//   const handleSignUp = () => router.push("/signup");

//   return (
//     <div className="w-full flex-1 flex flex-col items-center justify-center px-4 py-10 bg-white">
//       {/* Headline */}
//       <h1 className="font-poppins font-semibold mb-3 text-3xl sm:text-4xl md:text-6xl text-center leading-tight transition-transform duration-500 ease-out hover:-translate-y-1">
//         <span className="text-[#7BA63F]">AI-GUIDED ADAPTIVE</span>
//         <br />
//         <span className="text-[#264D73]">EXERCISE PLANNER</span>
//       </h1>

//       {/* Subheading */}
//       <p className="text-gray-600 mb-6 text-center text-sm sm:text-base max-w-sm">
//         Renew your strength, rebuild your life
//       </p>

//       {/* Feature Pills */}
//       <div className="flex gap-3 mb-10 flex-wrap justify-center max-w-md">
//         <span
//           aria-hidden="true"
//           className="border border-black text-black rounded-md px-4 py-2 text-xs sm:text-sm bg-white pointer-events-none select-none cursor-default"
//         >
//           Smart Planning
//         </span>

//         <span
//           aria-hidden="true"
//           className="border border-black text-black rounded-md px-4 py-2 text-xs sm:text-sm bg-white pointer-events-none select-none cursor-default"
//         >
//           Goal Tracking
//         </span>

//         <span
//           aria-hidden="true"
//           className="border border-black text-black rounded-md px-4 py-2 text-xs sm:text-sm bg-white pointer-events-none select-none cursor-default"
//         >
//           Adaptive Workout
//         </span>
//       </div>

//       {/* Logo */}
//       <div className="w-40 sm:w-52 md:w-64 mb-10">
//         <Image
//           src="/logo.png"
//           alt="Heartbeat Icon"
//           width={400}
//           height={100}
//           className="w-full h-auto"
//           priority
//         />
//       </div>

//       {/* SHOW Generate button only if auth buttons are NOT showing */}
//       {!showAuthButtons && (
//         <button
//           onClick={handleGeneratePlan}
//           disabled={isCheckingAuth}
//           className={`bg-[#264D73] text-white rounded-md px-8 py-3 font-semibold text-lg transition-all duration-300 ease-out transform hover:-translate-y-0.5 hover:shadow-md hover:bg-[#1f3e5a] mb-6 ${
//             isCheckingAuth ? "opacity-70 cursor-not-allowed" : ""
//           }`}
//         >
//           {isCheckingAuth ? "Checking..." : "Generate Your Plan"}
//         </button>
//       )}

//       {/* SHOW Login/Signup only AFTER clicking Generate + unauthenticated */}
//       {showAuthButtons && (
//         <div className="flex gap-4 mb-6">
//           <button
//             onClick={handleLogin}
//             className="border border-black text-black rounded-md px-6 py-2 text-sm font-semibold transition-all duration-300 ease-out transform hover:-translate-y-0.5 hover:shadow-md hover:bg-gray-100 w-32"
//           >
//             LOGIN
//           </button>

//           <button
//             onClick={handleSignUp}
//             className="bg-[#264D73] text-white rounded-md px-6 py-2 font-semibold transition-all duration-300 ease-out transform hover:-translate-y-0.5 hover:shadow-md hover:bg-[#1f3e5a] w-32"
//           >
//             SIGN UP
//           </button>
//         </div>
//       )}

//       {/* Footer text */}
//       <p className="text-gray-500 text-xs sm:text-sm max-w-xs text-center">
//         Start your personalized fitness journey today
//       </p>
//     </div>
//   );
// }

"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Homepage() {
  const router = useRouter();

  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [showAuthButtons, setShowAuthButtons] = useState(false);

  // --- ADJUSTABLE SETTINGS ---
  const gradientColor = "from-[#f8fafc] via-[#eef2ff] to-[#f0fdf4]"; // Main background gradient
  const blob1Color = "bg-[#7BA63F]/10"; // Top-left moving blob
  const blob2Color = "bg-[#264D73]/10"; // Bottom-right moving blob
  const animationSpeed = "20s"; // How fast the blobs move
  // ---------------------------

  useEffect(() => {
    let cancelled = false;
    const checkAuthAndRedirect = async () => {
      try {
        const res = await fetch("/api/user", { method: "GET" });
        if (!res.ok) {
          if (!cancelled) setIsCheckingAuth(false);
          return;
        }
        const data: { loggedIn?: boolean } = await res.json();
        if (data.loggedIn) {
          router.replace("/informationinput");
          return;
        }
        if (!cancelled) setIsCheckingAuth(false);
      } catch {
        if (!cancelled) setIsCheckingAuth(false);
      }
    };
    checkAuthAndRedirect();
    return () => { cancelled = true; };
  }, [router]);

  const handleGeneratePlan = async () => {
    if (isCheckingAuth) return;
    setIsCheckingAuth(true);
    try {
      const res = await fetch("/api/user", { method: "GET" });
      if (!res.ok) {
        setShowAuthButtons(true);
        return;
      }
      const data: { loggedIn?: boolean } = await res.json();
      if (data.loggedIn) {
        router.push("/informationinput");
      } else {
        setShowAuthButtons(true);
      }
    } catch {
      setShowAuthButtons(true);
    } finally {
      setIsCheckingAuth(false);
    }
  };

  const handleLogin = () => router.push("/login");
  const handleSignUp = () => router.push("/signup");

  if (isCheckingAuth && !showAuthButtons) {
    return (
      <div className={`w-full flex-1 flex items-center justify-center px-4 py-10 bg-gradient-to-br ${gradientColor}`}>
        <p className="text-gray-600 text-sm animate-pulse">Loading...</p>
      </div>
    );
  }

  return (
    <div className={`relative w-full flex-1 flex flex-col items-center justify-center px-4 py-10 overflow-hidden bg-gradient-to-br ${gradientColor}`}>
      
      {/* MOVING DESIGN ELEMENTS */}
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

      {/* Manual Adjustment: Change 'blur-3xl' to 'blur-2xl' for sharper shapes */}
      <div className={`absolute top-0 -left-4 w-72 h-72 ${blob1Color} rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob`} />
      <div className={`absolute bottom-0 -right-4 w-72 h-72 ${blob2Color} rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000`} />

      {/* MAIN CONTENT (Wrapped in relative to stay above blobs) */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Headline */}
        <h1 className="font-poppins font-semibold mb-3 text-3xl sm:text-4xl md:text-6xl text-center leading-tight transition-transform duration-500 ease-out hover:-translate-y-1">
          <span className="text-[#7BA63F]">AI-GUIDED ADAPTIVE</span>
          <br />
          <span className="text-[#264D73]">EXERCISE PLANNER</span>
        </h1>

        {/* Subheading */}
        <p className="text-gray-600 mb-6 text-center text-sm sm:text-base max-w-sm">
          Renew your strength, rebuild your life
        </p>

        {/* Feature Pills */}
        <div className="flex gap-3 mb-10 flex-wrap justify-center max-w-md">
          {["Smart Planning", "Goal Tracking", "Adaptive Workout"].map((pill) => (
            <span
              key={pill}
              className="border border-black/10 text-black rounded-md px-4 py-2 text-xs sm:text-sm bg-white/50 backdrop-blur-sm pointer-events-none select-none"
            >
              {pill}
            </span>
          ))}
        </div>

        {/* Logo */}
        <div className="w-40 sm:w-52 md:w-64 mb-10 drop-shadow-sm">
          <Image
            src="/logo.png"
            alt="Heartbeat Icon"
            width={400}
            height={100}
            className="w-full h-auto"
            priority
          />
        </div>

        {/* Generate button */}
        {!showAuthButtons && (
          <button
            onClick={handleGeneratePlan}
            disabled={isCheckingAuth}
            className={`bg-[#264D73] text-white rounded-md px-8 py-3 font-semibold text-lg transition-all duration-300 ease-out transform hover:-translate-y-0.5 hover:shadow-lg hover:bg-[#1f3e5a] mb-6 shadow-[#264D73]/20 ${
              isCheckingAuth ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isCheckingAuth ? "Checking..." : "Generate Your Plan"}
          </button>
        )}

        {/* Login/Signup Buttons */}
        {showAuthButtons && (
          <div className="flex gap-4 mb-6">
            <button
              onClick={handleLogin}
              className="border border-black text-black bg-white/80 backdrop-blur-sm rounded-md px-6 py-2 text-sm font-semibold transition-all duration-300 ease-out transform hover:-translate-y-0.5 hover:shadow-md hover:bg-gray-100 w-32"
            >
              LOGIN
            </button>

            <button
              onClick={handleSignUp}
              className="bg-[#264D73] text-white rounded-md px-6 py-2 font-semibold transition-all duration-300 ease-out transform hover:-translate-y-0.5 hover:shadow-md hover:bg-[#1f3e5a] w-32 shadow-[#264D73]/20"
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
    </div>
  );
}