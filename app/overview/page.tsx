// "use client";
// import { useState } from "react";
// import { PlayCircle, ArrowLeft, Lock } from "lucide-react";
// import type { Exercise } from "@/types";
// import { MOCK_DATA } from "@/lib/mockData";
// import Modal from "@/app/component/modal";
// import Link from "next/link";

// export default function OverviewDashboard() {
//   const [view, setView] = useState<"overview" | "detail">("overview");
//   const [activeEx, setActiveEx] = useState<Exercise | null>(null);

//   // modal visibility control
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const [selectedDay, setSelectedDay] = useState<number>(1);

//   const { plan_info, weekly_schedule, progress } = MOCK_DATA.exercise_plan;

//   const displayedSession =
//     weekly_schedule[0].sessions.find((s) => s.day === selectedDay) ||
//     weekly_schedule[0].sessions[0];

//   // If you had a detail view previously, you can keep it.
//   // For the modal flow, we can skip switching to "detail".
//   if (view === "detail" && activeEx) {
//     return (
//       <button
//         onClick={() => setView("overview")}
//         className="flex items-center text-slate-400 font-bold mb-8"
//       >
//         <ArrowLeft size={18} className="mr-2" /> back to Overview
//       </button>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-white p-6 md:p-12 font-sans text-slate-900">
//       <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
//         <div className="lg:col-span-2 space-y-8">
//           <div>
//             <h1 className="text-3xl font-bold text-blue-800 tracking-tight">
//               Overview
//             </h1>
//             <p className="text-slate-400 font-medium">
//               Week {progress.current_week} - Day {selectedDay}
//             </p>
//           </div>

//           <div className="bg-blue-100/60 rounded-[2rem] p-8 flex justify-between items-center border border-blue-100">
//             <div>
//               <h2 className="text-3xl font-bold text-slate-800">
//                 {plan_info.user_name}
//               </h2>
//               <p className="text-blue-600 font-semibold mt-1">
//                 Goal: {plan_info.primary_goal}
//               </p>
//             </div>
//             <div className="text-right">
//               <p className="text-5xl font-bold text-blue-400">
//                 {progress.completion_percent}%
//               </p>
//               <p className="text-[10px] uppercase font-bold text-blue-300">
//                 Total Completion
//               </p>
//             </div>
//           </div>

//           {/* Dynamic Exercises Header and List */}
//           <div className="space-y-4">
//             <h3 className="text-lg font-bold text-slate-800 ml-2">
//               Day {selectedDay} Session: {displayedSession.title}
//             </h3>

//             {displayedSession.exercises.length > 0 ? (
//               displayedSession.exercises.map((ex) => (
//                 <div
//                   key={ex.id}
//                   className="bg-white p-6 rounded-3xl border border-slate-100 shadow-md flex items-center justify-between group"
//                 >
//                   <div className="flex items-center gap-6">
//                     <PlayCircle className="text-slate-300" size={24} />
//                     <div>
//                       <h4 className="font-bold text-slate-800">{ex.name}</h4>
//                       <p className="text-[11px] text-slate-400 font-bold uppercase">
//                         {ex.sets} sets • {ex.reps} reps
//                       </p>
//                     </div>
//                   </div>

//                   {/* UPDATED: Open modal instead of changing view */}
//                   <button
//                     onClick={() => {
//                       setActiveEx(ex);     // keep if you’ll use it later
//                       setIsModalOpen(true); // open the modal
//                     }}
//                     className="bg-slate-100 text-slate-600 text-xs font-bold px-6 py-2 rounded-lg border border-slate-200 hover:bg-blue-600 hover:text-white transition-all"
//                   >
//                     Open
//                   </button>
//                 </div>
//               ))
//             ) : (
//               <div className="p-12 text-center border-2 border-dashed border-slate-200 rounded-[2rem] text-slate-400">
//                 <p>No exercises available for this session yet.</p>
//               </div>
//             )}
//           </div>
//         </div>


//         {/* Interactive Roadmap Sidebar */}
//         <aside className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-xl h-fit">
//           <h3 className="font-bold text-slate-800 text-xl mb-10">Roadmap</h3>
//           <div className="relative space-y-12">
//             <div className="absolute left-[11px] top-2 bottom-2 w-[1.5px] bg-slate-100"></div>

//             {weekly_schedule[0].sessions.map((session, idx) => {
//               const isLocked = session.session_status === "locked";
//               const isActive = selectedDay === session.day;

//               return (
//                 <button
//                   key={idx}
//                   disabled={isLocked}
//                   onClick={() => setSelectedDay(session.day)}
//                   className={`relative pl-10 w-full text-left transition-all outline-none ${isLocked ? "cursor-not-allowed" : "cursor-pointer hover:translate-x-1"}`}
//                 >
//                   {/* Timeline Dot */}
//                   <div
//                     className={`absolute left-0 w-6 h-6 rounded-full border-4 border-white z-10 shadow-sm transition-colors
//                     ${isActive ? "bg-blue-600" : isLocked ? "bg-slate-200" : "bg-green-400"}
//                   `}
//                   >
//                     {isActive && (
//                       <div className="w-1.5 h-1.5 bg-white rounded-full m-auto mt-[5px]"></div>
//                     )}
//                   </div>

//                   {/* Text Label */}
//                   <div
//                     className={`transition-opacity ${isActive ? "opacity-100 scale-105 origin-left" : isLocked ? "opacity-30" : "opacity-60"}`}
//                   >
//                     <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter flex items-center gap-1">
//                       Day {session.day} {isLocked && <Lock size={10} />}
//                     </p>
//                     <p
//                       className={`font-bold text-sm ${isActive ? "text-blue-900" : "text-slate-700"}`}
//                     >
//                       {session.title}
//                     </p>
//                   </div>
//                 </button>
//               );
//             })}
//           </div>
//         </aside>
//       </main>
//     <Modal
//       open={isModalOpen}
//       onClose={() => setIsModalOpen(false)}
//       title={activeEx ? `Example Detail - ${activeEx.name}` : "Example Detail"}
//     >
//       <div className="bg-white p-4 md:p-6 font-sans text-slate-800">
//         <main className="max-w-4xl mx-auto"> 
//           {/* Navigation & Title */}
//           <div className="flex flex-col md:flex-row md:items-center gap-6 mb-10">

//             <h1 className="text-3xl md:text-4xl font-bold text-blue-800 md:ml-20">
//               Day 1: Hand Open and Close
//             </h1>
//           </div>

//           <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
//             {/* Left Side: Step-by-Step Image */}
//             <div className="space-y-6">
//               <div className="aspect-video bg-[#DDE1E6] rounded-3xl overflow-hidden shadow-md border border-gray-200">
//                 <img
//                   src="http://googleusercontent.com/image_collection/image_retrieval/3183214607531754248_0"
//                   alt="Step by step diagram of hand open and close exercise"
//                   className="w-full h-full object-contain p-4"
//                 />
//               </div>

//               <div>
//                 <h2 className="font-bold text-2xl text-slate-900 leading-tight mb-2">
//                   Recovering through Hand Open <br /> and Close movements.
//                 </h2>
//                 <a
//                   href="https://www.youtube.com/watch?v=CaB9jwzxDz0"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-blue-500 text-base underline font-medium hover:text-blue-700 transition-colors"
//                 >
//                   Watch Tutorial on Youtube
//                 </a>
//               </div>
//             </div>

//             {/* Right Side: Instructions */}
//             <div className="space-y-8">
//               <section className="bg-[#DDE1E6] border-2 border-blue-900 rounded-3xl p-6 md:p-8 shadow-sm">
//                 <h3 className="font-bold text-xl mb-3 text-slate-900">
//                   Exercise Description
//                 </h3>
//                 <p className="text-slate-600 leading-relaxed">
//                   Hand Open and Close is a gentle mobility and strengthening exercise
//                   that targets the muscles of the hands, fingers, and forearms. It's
//                   great for improving grip strength, reducing stiffness, and
//                   increasing circulation—perfect for warm-ups, desk breaks, or
//                   recovery routines.
//                 </p>
//               </section>

//               <section className="bg-[#DDE1E6] border-2 border-blue-900 rounded-3xl p-6 md:p-8 shadow-sm">
//                 <h3 className="font-bold text-xl mb-5 text-slate-900">
//                   Exercise Steps
//                 </h3>
//                 <ol className="text-slate-600 space-y-5 list-decimal ml-5">
//                   <li>
//                     <span className="font-bold text-slate-900">Start Position</span> - Sit
//                     or stand with your arms relaxed at your sides. Keep your hands in
//                     front of you at a comfortable height.
//                   </li>
//                   <li>
//                     <span className="font-bold text-slate-900">Open Your Hands</span> -
//                     Spread your fingers as wide as you comfortably can, stretching them
//                     outward without causing strain.
//                   </li>
//                   <li>
//                     <span className="font-bold text-slate-900">Close Into a Fist</span> -
//                     Gently curl your fingers inward to form a fist. Keep the squeeze firm
//                     but not painful.
//                   </li>
//                   <li>
//                     <span className="font-bold text-slate-900">Repeat with Control</span> -
//                     Slowly open your hands again and continue the open-close motion in a
//                     steady rhythm.
//                   </li>
//                 </ol>
//               </section>
//             </div>
//           </div>

//           {/* Action Button */}
//           <div className="flex justify-end mt-12">
//             <button className="bg-[#1DB954] hover:bg-[#1aa34a] text-white font-bold py-3 px-10 rounded-xl text-xl transition-all shadow-lg active:scale-95">
//               Complete
//             </button>
//           </div>
//         </main>
//       </div>
//     </Modal>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { PlayCircle, ArrowLeft, Lock } from "lucide-react";
import type { Exercise } from "@/types";
import { MOCK_DATA } from "@/lib/mockData";
import Modal from "@/app/component/modal";

// Dynamically import the modal content as client-only (no SSR)
const ExerciseModalContent = dynamic(() => import("./exercise_modal_content"), {
  ssr: false,
});

export default function OverviewDashboard() {
  const [view, setView] = useState<"overview" | "detail">("overview");
  const [activeEx, setActiveEx] = useState<Exercise | null>(null);

  // modal visibility control
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedDay, setSelectedDay] = useState<number>(1);
  const { plan_info, weekly_schedule, progress } = MOCK_DATA.exercise_plan;

  const displayedSession =
    weekly_schedule[0].sessions.find((s) => s.day === selectedDay) ||
    weekly_schedule[0].sessions[0];

  if (view === "detail" && activeEx) {
    return (
      <button
        onClick={() => setView("overview")}
        className="flex items-center text-slate-400 font-bold mb-8"
      >
        <ArrowLeft size={18} className="mr-2" /> back to Overview
      </button>
    );
  }

  return (
    <div className="min-h-screen bg-white p-6 md:p-12 font-sans text-slate-900">
      <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-blue-800 tracking-tight">Overview</h1>
            <p className="text-slate-400 font-medium">
              Week {progress.current_week} - Day {selectedDay}
            </p>
          </div>

          <div className="bg-blue-100/60 rounded-[2rem] p-8 flex justify-between items-center border border-blue-100">
            <div>
              <h2 className="text-3xl font-bold text-slate-800">{plan_info.user_name}</h2>
              <p className="text-blue-600 font-semibold mt-1">
                Goal: {plan_info.primary_goal}
              </p>
            </div>
            <div className="text-right">
              <p className="text-5xl font-bold text-blue-400">
                {progress.completion_percent}%
              </p>
              <p className="text-[10px] uppercase font-bold text-blue-300">Total Completion</p>
            </div>
          </div>

          {/* Exercises */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-800 ml-2">
              Day {selectedDay} Session: {displayedSession.title}
            </h3>

            {displayedSession.exercises.length > 0 ? (
              displayedSession.exercises.map((ex) => (
                <div
                  key={ex.id}
                  className="bg-white p-6 rounded-3xl border border-slate-100 shadow-md flex items-center justify-between group"
                >
                  <div className="flex items-center gap-6">
                    <PlayCircle className="text-slate-300" size={24} />
                    <div>
                      <h4 className="font-bold text-slate-800">{ex.name}</h4>
                      <p className="text-[11px] text-slate-400 font-bold uppercase">
                        {ex.sets} sets • {ex.reps} reps
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setActiveEx(ex);
                      setIsModalOpen(true);
                    }}
                    className="bg-slate-100 text-slate-600 text-xs font-bold px-6 py-2 rounded-lg border border-slate-200 hover:bg-blue-600 hover:text-white transition-all"
                  >
                    Open
                  </button>
                </div>
              ))
            ) : (
              <div className="p-12 text-center border-2 border-dashed border-slate-200 rounded-[2rem] text-slate-400">
                <p>No exercises available for this session yet.</p>
              </div>
            )}
          </div>
        </div>

        {/* Roadmap Sidebar */}
        <aside className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-xl h-fit">
          <h3 className="font-bold text-slate-800 text-xl mb-10">Roadmap</h3>
          <div className="relative space-y-12">
            <div className="absolute left-[11px] top-2 bottom-2 w-[1.5px] bg-slate-100" />
            {weekly_schedule[0].sessions.map((session, idx) => {
              const isLocked = session.session_status === "locked";
              const isActive = selectedDay === session.day;

              return (
                <button
                  key={idx}
                  disabled={isLocked}
                  onClick={() => setSelectedDay(session.day)}
                  className={`relative pl-10 w-full text-left transition-all outline-none ${
                    isLocked ? "cursor-not-allowed" : "cursor-pointer hover:translate-x-1"
                  }`}
                >
                  <div
                    className={`absolute left-0 w-6 h-6 rounded-full border-4 border-white z-10 shadow-sm transition-colors
                      ${isActive ? "bg-blue-600" : isLocked ? "bg-slate-200" : "bg-green-400"}`}
                  >
                    {isActive && <div className="w-1.5 h-1.5 bg-white rounded-full m-auto mt-[5px]" />}
                  </div>

                  <div
                    className={`transition-opacity ${
                      isActive ? "opacity-100 scale-105 origin-left" : isLocked ? "opacity-30" : "opacity-60"
                    }`}
                  >
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter flex items-center gap-1">
                      Day {session.day} {isLocked && <span aria-hidden>🔒</span>}
                    </p>
                    <p className={`font-bold text-sm ${isActive ? "text-blue-900" : "text-slate-700"}`}>
                      {session.title}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </aside>
      </main>

      {/* Modal (key forces remount when switching exercises; helps reset any internal state) */}
      <Modal
        key={activeEx?.id ?? "no-ex"}
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={activeEx ? `Example Detail - ${activeEx.name}` : "Example Detail"}
      >
        <ExerciseModalContent selectedDay={selectedDay} activeEx={activeEx} />
      </Modal>
    </div>
  );
}