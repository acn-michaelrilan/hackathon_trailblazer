// "use client";
// import { insertFunctionalAbility } from "@/backend/informationinput/service";
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

//           <button
//             onClick={insertFunctionalAbility}
//             className="bg-[#264D73] text-white rounded-md px-6 py-2 font-semibold transition-all duration-300 ease-out transform hover:-translate-y-0.5 hover:shadow-md hover:bg-[#1f3e5a] w-32"
//           >
//             SAMPLE BUTTON FOR INSERT
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
import { insertFunctionalAbility } from "@/backend/informationinput/service";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Homepage() {
  const [showAuthButtons, setShowAuthButtons] = useState(false);
  const [isInserting, setIsInserting] = useState(false);
  const [name, setName] = useState(""); // 🔹 dynamic input
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

  /* 🔹 TEST INSERT HANDLER */
  const handleTestInsert = async () => {
    if (!name) {
      alert("⚠️ Please enter a name first.");
      return;
    }

    setIsInserting(true);

    try {
      const result = await insertFunctionalAbility(name); // ✅ pass dynamic value

      if (result?.success === false) {
        alert("❌ Insert failed: " + result.error);
        return;
      }

      alert("✅ Insert Successful! Check your Supabase dashboard.");
      console.log("Inserted Data:", result);
    } catch (error) {
      console.error(error);
      alert("❌ Critical error during insert.");
    } finally {
      setIsInserting(false);
    }
  };

  return (
    <div className="w-full flex-1 flex flex-col items-center justify-center px-4 py-10 bg-white">
      {/* Headline */}
      <h1 className="font-poppins font-semibold mb-3 text-3xl sm:text-4xl md:text-6xl text-center leading-tight transition-transform duration-500 ease-out hover:-translate-y-1">
        <span className="text-[#7BA63F]">AI-GUIDED ADAPTIVE</span>
        <br />
        <span className="text-[#264D73]">EXERCISE PLANNER</span>
      </h1>

      <p className="text-gray-600 mb-6 text-center text-sm sm:text-base max-w-sm">
        Renew your strength, rebuild your life
      </p>

      {/* Buttons */}
      {/* Feature Pills (NOT CLICKABLE — design only) */}
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

      {/* Buttons */}
      {!showAuthButtons ? (
        <button
          onClick={handleGeneratePlan}
          className="bg-[#264D73] text-white rounded-md px-8 py-3 font-semibold text-lg transition-all duration-300 ease-out transform hover:-translate-y-0.5 hover:shadow-md hover:bg-[#1f3e5a] mb-6"
        >
          Generate Your Plan
        </button>
      ) : (
        <div className="flex flex-col sm:flex-row gap-4 mb-6 items-center">
          {/* Auth Buttons */}
          <div className="flex gap-4">
            <button
              onClick={handleLogin}
              className="border border-black text-black rounded-md px-6 py-2 text-sm font-semibold transition-all hover:bg-gray-100 w-32"
            >
              LOGIN
            </button>

            <button
              onClick={handleSignUp}
              className="bg-[#264D73] text-white rounded-md px-6 py-2 font-semibold transition-all hover:bg-[#1f3e5a] w-32"
            >
              SIGN UP
            </button>
          </div>

          {/* 🔹 Dynamic Input */}
          <input
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm w-48"
          />

          {/* 🔹 TEST INSERT BUTTON */}
          <button
            onClick={handleTestInsert}
            disabled={isInserting}
            className={`rounded-md px-6 py-2 font-semibold text-sm transition-all shadow-sm border w-48 ${
              isInserting
                ? "bg-gray-200 text-gray-500 cursor-wait"
                : "bg-orange-500 text-white hover:bg-orange-600 border-orange-600"
            }`}
          >
            {isInserting ? "Inserting..." : "TEST DB INSERT"}
          </button>
        </div>
      )}

      <p className="text-gray-500 text-xs sm:text-sm max-w-xs text-center">
        Start your personalized fitness journey today
      </p>
    </div>
  );
}
