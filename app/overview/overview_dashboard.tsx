"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { PlayCircle, ArrowLeft, Loader2, RefreshCw } from "lucide-react";
import type { Exercise, ExercisePlanData, Session } from "@/types";
import Modal from "@/app/component/modal";
import { SESSION_STATUS } from "@/backend/utils/constants";
import { MOCK_DATA } from "@/lib/mockData"; // eslint-disable-line @typescript-eslint/no-unused-vars

// Lazy load the modal content for performance
const ExerciseModalContent = dynamic(() => import("./exercise_modal_content"), {
  ssr: false,
});

export default function OverviewDashboard() {
  // --- Data State ---
  const [data, setData] = useState<ExercisePlanData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // --- UI State ---
  const [view, setView] = useState<"overview" | "detail">("overview");
  const [activeEx, setActiveEx] = useState<Exercise | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState<number>(1);

  // --- 1. Fetch Data from API Route ---
  const fetchPlanData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Call your API route
      const res = await fetch("/api/exercise-plan");

      if (!res.ok) {
        if (res.status === 401)
          throw new Error("Please log in to view your plan");
        if (res.status === 404) throw new Error("No active plan found");
        throw new Error("Failed to load plan");
      }

      const jsonData: ExercisePlanData = await res.json();
      setData(jsonData);

      // Initialize the selected day based on progress (only on first load)
      if (!data && jsonData.exercise_plan.progress.current_day) {
        setSelectedDay(jsonData.exercise_plan.progress.current_day);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred",
      );
    } finally {
      setLoading(false);
    }
  };

  // --- 1B. ALTERNATIVE: Fetch Data from Mock Data ---
  // Uncomment the function below and the useEffect to use mock data instead of fetching from API
  /*
  const fetchPlanData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      // Use mock data
      setData(MOCK_DATA);

      // Initialize the selected day based on progress (only on first load)
      if (!data && MOCK_DATA.exercise_plan.progress.current_day) {
        setSelectedDay(MOCK_DATA.exercise_plan.progress.current_day);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  };
  */

  // Initial Fetch on Mount
  useEffect(() => {
    fetchPlanData();
    // Note: fetchPlanData intentionally not in dependencies - run once on mount
  }, []);

  // --- 2. Loading & Error States ---
  if (loading) {
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
            onClick={fetchPlanData}
            className="px-6 py-2 bg-white border border-red-200 text-red-500 rounded-full text-sm font-bold hover:bg-red-50 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // --- 3. Prepare Data for Render ---
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
            {/* Optional Refresh Button */}
            <button
              onClick={fetchPlanData}
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
            {/* Decorator Circle */}
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
                    ${ex.status === "completed" ? "border-green-100 bg-green-50/30" : "border-slate-100"}
                  `}
                >
                  <div className="flex items-center gap-6">
                    <div
                      className={`p-3 rounded-full ${ex.status === "completed" ? "bg-green-100 text-green-600" : "bg-slate-50 text-slate-300"}`}
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

      {/* Detail Modal */}
      <Modal
        key={activeEx?.id ?? "no-ex"}
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
        title={activeEx ? `Detail - ${activeEx.name}` : "Exercise Detail"}
      >
        <ExerciseModalContent
          selectedDay={selectedDay}
          activeEx={activeEx}
          onComplete={() => {
            setIsModalOpen(false);
            fetchPlanData();
          }}
        />
      </Modal>
    </div>
  );
}
