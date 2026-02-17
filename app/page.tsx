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

  const [isCheckingAuth, setIsCheckingAuth] = useState(true); // checking on mount
  const [showAuthButtons, setShowAuthButtons] = useState(false);

  // 1) Auto-check auth on page load and redirect if logged in
  useEffect(() => {
    let cancelled = false;

    const checkAuthAndRedirect = async () => {
      try {
        // If your route is app/api/user/route.ts, change this to "/api/user"
        const res = await fetch("/api/auth/user", { method: "GET" });

        if (!res.ok) {
          // Treat API errors as unauthenticated
          if (!cancelled) setIsCheckingAuth(false);
          return;
        }

        const data: { loggedIn?: boolean } = await res.json();

        if (data.loggedIn) {
          // Authenticated -> go straight to information input
          router.replace("/informationinput");
          return;
        }

        // Not logged in -> allow page to render
        if (!cancelled) setIsCheckingAuth(false);
      } catch {
        // Network/runtime error -> treat as unauthenticated
        if (!cancelled) setIsCheckingAuth(false);
      }
    };

    checkAuthAndRedirect();

    return () => {
      cancelled = true;
    };
  }, [router]);

  // 2) On click: if unauthenticated, hide generate and show login/signup
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
        setShowAuthButtons(true); // show auth buttons ONLY after click + unauth
      }
    } catch {
      setShowAuthButtons(true);
    } finally {
      setIsCheckingAuth(false);
    }
  };

  const handleLogin = () => router.push("/login");
  const handleSignUp = () => router.push("/signup");

  // Optional: you can show nothing or a loader while checking auth on mount
  if (isCheckingAuth && !showAuthButtons) {
    return (
      <div className="w-full flex-1 flex items-center justify-center px-4 py-10 bg-white">
        <p className="text-gray-600 text-sm">Loading...</p>
      </div>
    );
  }

  return (
    <div className="w-full flex-1 flex flex-col items-center justify-center px-4 py-10 bg-white">
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
        <span
          aria-hidden="true"
          className="border border-black text-black rounded-md px-4 py-2 text-xs sm:text-sm bg-white pointer-events-none select-none cursor-default"
        >
          Smart Planning
        </span>

        <span
          aria-hidden="true"
          className="border border-black text-black rounded-md px-4 py-2 text-xs sm:text-sm bg-white pointer-events-none select-none cursor-default"
        >
          Goal Tracking
        </span>

        <span
          aria-hidden="true"
          className="border border-black text-black rounded-md px-4 py-2 text-xs sm:text-sm bg-white pointer-events-none select-none cursor-default"
        >
          Adaptive Workout
        </span>
      </div>

      {/* Logo */}
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

      {/* Generate button is hidden once we decide to show auth buttons */}
      {!showAuthButtons && (
        <button
          onClick={handleGeneratePlan}
          disabled={isCheckingAuth}
          className={`bg-[#264D73] text-white rounded-md px-8 py-3 font-semibold text-lg transition-all duration-300 ease-out transform hover:-translate-y-0.5 hover:shadow-md hover:bg-[#1f3e5a] mb-6 ${
            isCheckingAuth ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {isCheckingAuth ? "Checking..." : "Generate Your Plan"}
        </button>
      )}

      {/* Login/Signup ONLY after clicking Generate + unauthenticated */}
      {showAuthButtons && (
        <div className="flex gap-4 mb-6">
          <button
            onClick={handleLogin}
            className="border border-black text-black rounded-md px-6 py-2 text-sm font-semibold transition-all duration-300 ease-out transform hover:-translate-y-0.5 hover:shadow-md hover:bg-gray-100 w-32"
          >
            LOGIN
          </button>

          <button
            onClick={handleSignUp}
            className="bg-[#264D73] text-white rounded-md px-6 py-2 font-semibold transition-all duration-300 ease-out transform hover:-translate-y-0.5 hover:shadow-md hover:bg-[#1f3e5a] w-32"
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