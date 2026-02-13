"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { PlayCircle, Loader2, RefreshCw, Trophy, X, PartyPopper } from "lucide-react";
import type { Exercise, ExercisePlanData, Session } from "@/types";
import Modal from "@/app/component/modal";
import { SESSION_STATUS } from "@/backend/utils/constants";

// Lazy load the modal content
const ExerciseModalContent = dynamic(() => import("./exercise_modal_content"), {
  ssr: false,
});

// --- SUB-COMPONENT: Success/Congrats Modal ---
function CompletionModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="text-center space-y-6 p-4">
      <div className="relative inline-block">
        <div className="absolute inset-0 bg-yellow-200 blur-xl rounded-full opacity-50 animate-pulse" />
        <div className="relative bg-yellow-100 p-6 rounded-full inline-flex items-center justify-center mb-2 ring-8 ring-yellow-50">
          <Trophy size={64} className="text-yellow-600 animate-bounce" />
        </div>
        <div className="absolute -top-2 -right-2">
            <PartyPopper className="text-yellow-500 animate-spin-slow" size={32} />
        </div>
      </div>
      
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-slate-800">Session Complete!</h2>
        <p className="text-slate-500 max-w-xs mx-auto">
          You smashed it! All exercises for today are done. Keep up the momentum!
        </p>
      </div>

      <button
        onClick={onClose}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl text-lg shadow-lg shadow-blue-200 transition-all active:scale-95"
      >
        Continue
      </button>
    </div>
  );
}

export default function OverviewDashboard() {
  // --- Data State ---
  const [data, setData] = useState<ExercisePlanData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // --- UI State ---
  const [activeEx, setActiveEx] = useState<Exercise | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCongratsOpen, setIsCongratsOpen] = useState(false); // New State
  const [selectedDay, setSelectedDay] = useState<number>(1);

  // --- 1. Fetch Data ---
  // Modified to return the data promise so we can chain logic after update
  const fetchPlanData = async (): Promise<ExercisePlanData | null> => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch("/api/exercise-plan");

      if (!res.ok) {
        if (res.status === 401) throw new Error("Please log in to view your plan");
        if (res.status === 404) throw new Error("No active plan found");
        throw new Error("Failed to load plan");
      }

      const jsonData: ExercisePlanData = await res.json();
      setData(jsonData);

      // Initialize selected day only on first load (when data is null)
      if (!data && jsonData.exercise_plan.progress.current_day) {
        setSelectedDay(jsonData.exercise_plan.progress.current_day);
      }
      
      return jsonData;
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Initial Mount
  useEffect(() => {
    fetchPlanData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // --- Logic: Check for Completion after an update ---
  const handleExerciseCompleted = async () => {
    // 1. Close the exercise detail modal
    setIsModalOpen(false);
    
    // 2. Refresh data to get latest statuses
    const newData = await fetchPlanData();

    if (newData) {
      // 3. Find the current session in the new data
      const currentWeekSessions = newData.exercise_plan.weekly_schedule[0]?.sessions || [];
      const updatedSession = currentWeekSessions.find((s) => s.day === selectedDay);

      if (updatedSession) {
        // 4. Check if ALL exercises are completed
        const allExercisesDone = updatedSession.exercises.every(
          (ex) => ex.status.trim() === 'completed' || ex.status === SESSION_STATUS.COMPLETED
        );

        // 5. If all done, show the celebration modal
        if (allExercisesDone) {
            // Optional: slight delay for UX smoothness
            setTimeout(() => setIsCongratsOpen(true), 300);
        }
      }
    }
  };

  // --- Loading & Error Views ---
  if (loading && !data) { // Only show full loader if no data exists yet
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white text-slate-400 gap-4">
        <Loader2 className="animate-spin text-blue-600" size={48} />
        <p className="font-medium animate-pulse">Loading your plan...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white text-slate-500 gap-4">
        <div className="bg-red-50 p-6 rounded-2xl border border-red-100 text-center">
          <p className="text-red-500 font-bold mb-2">Error Loading Dashboard</p>
          <p className="text-sm mb-4">{error}</p>
          <button
            onClick={() => fetchPlanData()}
            className="px-6 py-2 bg-white border border-red-200 text-red-500 rounded-full text-sm font-bold hover:bg-red-50 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // --- Prepare Data for Render ---
  const { plan_info, weekly_schedule, progress } = data.exercise_plan;
  const currentWeekSessions = weekly_schedule[0]?.sessions || [];

  const displayedSession =
    currentWeekSessions.find((s) => s.day === selectedDay) ||
    currentWeekSessions[0];

  return (
    <div className="min-h-screen bg-white p-6 md:p-12 font-sans text-slate-900">
      <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* LEFT COLUMN: Dashboard & Exercises */}
        <div className="lg:col-span-2 space-y-8">
          <div className="flex justify-between items-end">
            <div>
              <h1 className="text-3xl font-bold text-blue-800 tracking-tight">
                Overview
              </h1>
              <p className="text-slate-400 font-medium">
                Week {progress.current_week} - Day {selectedDay}
              </p>
            </div>
            <button
              onClick={() => fetchPlanData()}
              className="p-2 text-slate-300 hover:text-blue-600 transition-colors"
              title="Refresh Data"
            >
              <RefreshCw size={20} />
            </button>
          </div>

          {/* User Info Card */}
          <div className="bg-blue-100/60 rounded-[2rem] p-8 flex justify-between items-center border border-blue-100 relative overflow-hidden">
            <div className="z-1 relative">
              <h2 className="text-3xl font-bold text-slate-800">
                {plan_info.user_name}
              </h2>
              <p className="text-blue-600 font-semibold mt-1">
                Goal: {plan_info.primary_goal}
              </p>
            </div>
            <div className="text-right relative">
              <p className="text-5xl font-bold text-blue-400">
                {Math.round(progress.completion_percent)}%
              </p>
              <p className="text-[10px] uppercase z-1 font-bold text-blue-300">
                Total Completion
              </p>
            </div>
            <div className="absolute -right-10 -bottom-20 w-64 h-64 bg-blue-200/50 rounded-full blur-3xl" />
          </div>

          {/* Exercises List */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-800 ml-2 flex items-center gap-2">
              <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-md uppercase font-bold">
                {displayedSession?.duration_min
                  ? `${displayedSession.duration_min} min`
                  : "Plan"}
              </span>
              {displayedSession?.title || "Rest Day"}
            </h3>

            {displayedSession?.exercises &&
            displayedSession.exercises.length > 0 ? (
              displayedSession.exercises.map((ex) => (
                <div
                  key={ex.id}
                  className={`bg-white p-6 rounded-3xl border shadow-sm flex items-center justify-between group transition-all hover:shadow-md
                    ${ex.status.trim() === "completed" ? "border-green-100 bg-green-50/30" : "border-slate-100"}
                  `}
                >
                  <div className="flex items-center gap-6">
                    <div
                      className={`p-3 rounded-full ${ex.status.trim() === "completed" ? "bg-green-100 text-green-600" : "bg-slate-50 text-slate-300"}`}
                    >
                      <PlayCircle size={24} />
                    </div>
                    <div>
                      <h4
                        className={`font-bold ${ex.status === "completed" ? "text-green-900" : "text-slate-800"}`}
                      >
                        {ex.name}
                      </h4>
                      <p className="text-[11px] text-slate-400 font-bold uppercase mt-1">
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
                <p>No exercises scheduled for today.</p>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Roadmap Sidebar */}
        <aside className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-xl h-fit sticky top-6">
          <h3 className="font-bold text-slate-800 text-xl mb-10">Roadmap</h3>
          <div className="relative space-y-12">
            <div className="absolute left-[11px] top-2 bottom-2 w-[1.5px] bg-slate-100" />
            {currentWeekSessions.map((session: Session, idx: number) => {
              const isLocked = session.session_status === SESSION_STATUS.LOCKED;
              const isActive = selectedDay === session.day;
              const isCompleted =
                session.session_status === SESSION_STATUS.COMPLETED;

              return (
                <button
                  key={session.title + idx}
                  disabled={isLocked}
                  onClick={() => setSelectedDay(session.day)}
                  className={`relative pl-10 w-full text-left transition-all outline-none group ${
                    isLocked ? "cursor-not-allowed" : "cursor-pointer"
                  }`}
                >
                  <div
                    className={`absolute left-0 w-6 h-6 rounded-full border-4 border-white z-1 shadow-sm transition-all duration-300
                      ${
                        isActive
                          ? "bg-blue-600 scale-110"
                          : isCompleted
                            ? "bg-green-500"
                            : isLocked
                              ? "bg-slate-200"
                              : "bg-white border-blue-200"
                      }`}
                  >
                    {isActive && (
                      <div className="w-1.5 h-1.5 bg-white rounded-full m-auto mt-[5px]" />
                    )}
                  </div>

                  <div
                    className={`transition-all duration-300 ${
                      isActive
                        ? "opacity-100 translate-x-1"
                        : isLocked
                          ? "opacity-30"
                          : "opacity-60 group-hover:opacity-100"
                    }`}
                  >
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter flex items-center gap-1">
                      Day {session.day}
                      {isLocked && <span aria-hidden>🔒</span>}
                      {isCompleted && <span className="text-green-500">✓</span>}
                    </p>
                    <p
                      className={`font-bold text-sm ${isActive ? "text-blue-900" : "text-slate-700"}`}
                    >
                      {session.title}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </aside>
      </main>

      {/* Exercise Detail Modal */}
      <Modal
        key={activeEx?.id ?? "no-ex"}
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={activeEx ? `Detail - ${activeEx.name}` : "Exercise Detail"}
      >
        <ExerciseModalContent
          selectedDay={selectedDay}
          activeEx={activeEx}
          onComplete={handleExerciseCompleted} // <--- Pass the new handler here
        />
      </Modal>

      {/* CONGRATULATIONS MODAL */}
      <Modal
        open={isCongratsOpen}
        onClose={() => setIsCongratsOpen(false)}
        title="" // Empty title for cleaner look
      >
        <CompletionModal onClose={() => setIsCongratsOpen(false)} />
      </Modal>
    </div>
  );
}