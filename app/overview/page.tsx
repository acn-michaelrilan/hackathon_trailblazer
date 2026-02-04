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