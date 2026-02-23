"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import {
  PlayCircle,
  Loader2,
  RefreshCw,
  Trophy,
  X,
  PartyPopper,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import type { Exercise, ExercisePlanData, Session } from "@/types";
import Modal from "@/app/component/modal";
import { SESSION_STATUS } from "@/backend/utils/constants";

// Lazy load the modal content
const ExerciseModalContent = dynamic(() => import("./exercise_modal_content"), {
  ssr: false,
});

// --- SUB-COMPONENT: Enhanced Exercise Success Popup ---
function ExerciseSuccessModal({
  onClose,
  exerciseName,
}: {
  onClose: () => void;
  exerciseName: string;
}) {
  const [quote, setQuote] = useState("");

  useEffect(() => {
    const motivationalQuotes = [
      "Strength doesn't come from what you can do. It comes from overcoming the things you once couldn't.",
      "The only bad workout is the one that didn't happen.",
      "What seems impossible today will one day become your warm-up.",
      "Don't stop when you're tired. Stop when you're done.",
      "It never gets easier, you just get stronger.",
      "Your body can stand almost anything. It's your mind that you have to convince.",
      "A one-hour workout is 4% of your day. No excuses.",
      "Success starts with self-discipline.",
      "Every rep brings you one step closer to your goal.",
      "You don't have to be extreme, just consistent.",
    ];

    // Pick a random quote from the array
    const randomQuote =
      motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
    setQuote(randomQuote);
  }, []);

  return (
    <div className="relative flex flex-col items-center text-center p-4 sm:p-8 w-full min-h-[450px] justify-between overflow-hidden rounded-4xl">
      {/* Top Badge */}
      <div className="relative z-10 bg-white/80 backdrop-blur-sm border border-slate-100 text-slate-500 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2 shadow-sm">
        <Sparkles size={14} className="text-yellow-500" />
        Milestone Reached
      </div>

      {/* Success Icon */}
      <div className="relative my-4 z-10">
        <div className="absolute inset-0 bg-green-100 rounded-full scale-150 blur-xl opacity-60 animate-pulse" />
        <div className="relative bg-gradient-to-tr from-green-400 to-green-500 text-white p-5 rounded-full shadow-xl shadow-green-200/50 ring-4 ring-green-50">
          <CheckCircle2 size={56} strokeWidth={2.5} />
        </div>

        {/* Decorative elements */}
        <div className="absolute -top-4 -left-6 w-3 h-3 bg-yellow-400 rounded-full animate-bounce" />
        <div className="absolute top-4 -right-8 w-2.5 h-2.5 bg-blue-400 rounded-full" />
        <div className="absolute -bottom-2 -right-4 text-purple-400 opacity-70">
          <PartyPopper size={24} />
        </div>
      </div>

      {/* Core Content */}
      <div className="space-y-15 mb-6 z-10 w-full px-2">
        <h2 className="text-3xl sm:text-4xl font-black text-slate-800 tracking-tight">
          Nailed It!
        </h2>
        <p className="text-slate-500 text-sm sm:text-base font-medium leading-relaxed mb-5">
          You just crushed{" "}
          <span className="text-blue-700 font-bold bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">
            {exerciseName}
          </span>
          .
          <br className="hidden sm:block mt-1" /> Take a breath, and let's keep
          this momentum going.
        </p>
      </div>

      {/* Motivational Quote & Action */}
      <div className="w-full mt-auto z-10 flex flex-col items-center gap-5">
        <div className="bg-slate-50/80 backdrop-blur-sm border border-slate-100 rounded-2xl p-4 w-full relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-blue-400 rounded-l-2xl"></div>
          <p className="text-xs sm:text-sm text-slate-500 italic font-medium min-h-[40px] flex items-center justify-center">
            {quote ? `"${quote}"` : "..."}
          </p>
        </div>

        <button
          onClick={onClose}
          className="group w-full bg-slate-800 hover:bg-green-500 text-white font-bold py-4 rounded-2xl text-lg transition-all duration-300 active:scale-95 shadow-lg shadow-slate-200 hover:shadow-green-200 flex items-center justify-center gap-3"
        >
          Continue Journey
          <ArrowRight
            size={25}
            className="opacity-70 group-hover:translate-x-2 transition-transform"
          />
        </button>
      </div>
    </div>
  );
}

function CompletionModal({
  onClose,
  sessionTitle,
}: {
  onClose: () => void;
  sessionTitle: string;
}) {
  return (
    <div className="relative text-center p-4 sm:p-8 max-w-md mx-auto overflow-hidden">
      {/* 1. Animated Background Celebration Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-2 h-2 bg-yellow-400 rounded-full animate-ping" />
        <div className="absolute top-20 right-10 w-3 h-3 bg-blue-400 rounded-full animate-bounce" />
        <div className="absolute bottom-20 left-1/4 w-2 h-2 bg-pink-400 rounded-full animate-pulse" />
        {/* Large ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-yellow-200/30 blur-[80px] rounded-full z-0" />
      </div>

      <div className="relative z-10 space-y-8">
        {/* 2. Grand Trophy Header */}
        <div className="relative inline-block">
          {/* Rotating rays background effect */}
          <div className="absolute inset-0 bg-yellow-400/20 blur-3xl rounded-full scale-150 animate-pulse" />

          <div className="relative bg-gradient-to-b from-yellow-100 to-orange-100 p-8 rounded-full inline-flex items-center justify-center ring-8 ring-yellow-50 shadow-2xl">
            <Trophy
              size={80}
              className="text-yellow-600 drop-shadow-[0_10px_10px_rgba(202,138,4,0.3)] animate-bounce"
            />
            {/* Small floating sparkles */}
            <Sparkles
              className="absolute -top-2 -right-2 text-yellow-500 animate-pulse"
              size={32}
            />
          </div>

          <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-2 shadow-xl border border-orange-100">
            <PartyPopper className="text-orange-500 animate-tada" size={28} />
          </div>
        </div>

        {/* 3. High-Energy Text */}
        <div className="space-y-2">
          <h2 className="text-4xl font-black bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 bg-clip-text text-transparent tracking-tight">
            SESSION CRUSHED!
          </h2>
          <div className="flex items-center justify-center gap-2">
            <div className="h-[1px] w-8 bg-slate-200" />
            <p className="text-blue-600 font-bold text-lg uppercase tracking-widest">
              {sessionTitle}
            </p>
            <div className="h-[1px] w-8 bg-slate-200" />
          </div>
          <p className="text-slate-500 font-medium">
            You’ve completed every task for today. <br />
            This is what progress looks like!
          </p>
        </div>

        {/* 4. Achievement Stats Grid */}
        <div className="grid grid-cols-3 gap-3 relative">
          <div className="bg-white p-4 rounded-2xl border-2 border-green-100 shadow-sm transition-transform hover:scale-105">
            <p className="text-[10px] font-black text-green-500 uppercase mb-1">
              Status
            </p>
            <p className="text-sm font-bold text-slate-700">Perfect</p>
          </div>
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-4 rounded-2xl shadow-lg shadow-blue-200 transition-transform hover:scale-105">
            <p className="text-[10px] font-black text-blue-100 uppercase mb-1">
              Effort
            </p>
            <p className="text-lg font-black text-white">100%</p>
          </div>
          <div className="bg-white p-4 rounded-2xl border-2 border-purple-100 shadow-sm transition-transform hover:scale-105">
            <p className="text-[10px] font-black text-purple-500 uppercase mb-1">
              Streak
            </p>
            <p className="text-sm font-bold text-slate-700">+1 Day</p>
          </div>
        </div>

        {/* 5. Big Finish Button */}
        <button
          onClick={onClose}
          className="group relative w-full overflow-hidden bg-slate-900 hover:bg-blue-600 text-white font-black py-5 rounded-2xl text-xl shadow-2xl transition-all active:scale-95 flex items-center justify-center gap-3"
        >
          <span className="relative z-10">Finished</span>
          <ArrowRight
            size={24}
            className="relative z-10 group-hover:translate-x-2 transition-transform"
          />
          {/* Animated button shine */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        </button>

        <p className="text-xs text-slate-400 font-bold uppercase tracking-tighter">
          Ready for a well-deserved rest?
        </p>
      </div>
    </div>
  );
}

export default function OverviewDashboard() {
  const [data, setData] = useState<ExercisePlanData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [activeEx, setActiveEx] = useState<Exercise | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isExSuccessOpen, setIsExSuccessOpen] = useState(false);
  const [isCongratsOpen, setIsCongratsOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState<number>(1);

  const fetchPlanData = async (): Promise<ExercisePlanData | null> => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("/api/exercise-plan");
      if (!res.ok) throw new Error("Failed to load plan");
      const jsonData: ExercisePlanData = await res.json();
      setData(jsonData);
      if (!data && jsonData.exercise_plan.progress.current_day) {
        setSelectedDay(jsonData.exercise_plan.progress.current_day);
      }
      return jsonData;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred",
      );
      return null;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlanData();
  }, []);

  const handleExerciseCompleted = async () => {
    setIsModalOpen(false);
    setIsExSuccessOpen(true);
    await fetchPlanData();
  };

  const handleCloseExSuccess = () => {
    setIsExSuccessOpen(false);
    if (data) {
      const currentWeekSessions =
        data.exercise_plan.weekly_schedule[0]?.sessions || [];
      const updatedSession = currentWeekSessions.find(
        (s) => s.day === selectedDay,
      );

      if (updatedSession) {
        const allExercisesDone = updatedSession.exercises.every(
          (ex) =>
            ex.status.trim() === SESSION_STATUS.COMPLETED ||
            ex.status === SESSION_STATUS.COMPLETED,
        );

        if (allExercisesDone) {
          setTimeout(() => setIsCongratsOpen(true), 400);
        }
      }
    }
  };

  if (loading && !data)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-blue-600" />
      </div>
    );

  if (error || !data)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500 font-bold">{error}</p>
      </div>
    );

  const { plan_info, weekly_schedule, progress } = data.exercise_plan;
  const currentWeekSessions = weekly_schedule[0]?.sessions || [];
  const displayedSession =
    currentWeekSessions.find((s) => s.day === selectedDay) ||
    currentWeekSessions[0];

  return (
    <div className="min-h-screen bg-white p-4 md:p-12 font-sans text-slate-900">
      <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-12">
        <div className="lg:col-span-2 space-y-6 md:space-y-8">
          <div className="flex justify-between items-end px-2">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-blue-800 tracking-tight">
                Overview
              </h1>
              <p className="text-slate-400 font-medium text-sm">
                Week {progress.current_week} - Day {selectedDay}
              </p>
            </div>
            <button
              onClick={() => fetchPlanData()}
              className="p-2 text-slate-300 hover:text-blue-600 transition-colors"
            >
              <RefreshCw size={20} />
            </button>
          </div>

          <div className="bg-blue-100/60 rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-8 flex justify-between items-center border border-blue-100 relative overflow-hidden">
            <div className="z-10 relative">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-800">
                {plan_info.user_name}
              </h2>
              <p className="text-blue-600 font-semibold text-sm md:text-base mt-1">
                Goal: {plan_info.primary_goal}
              </p>
            </div>
            <div className="text-right z-10">
              <p className="text-4xl md:text-5xl font-bold text-blue-400">
                {Math.round(progress.completion_percent)}%
              </p>
              <p className="text-[10px] uppercase font-bold text-blue-300">
                Total Completion
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-bold text-slate-800 ml-2 flex items-center gap-2">
              <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-md uppercase">
                {displayedSession?.duration_min
                  ? `${displayedSession.duration_min} min`
                  : "Plan"}
              </span>
              {displayedSession?.title || "Rest Day"}
            </h3>

            {displayedSession?.exercises.map((ex) => (
              <div
                key={ex.id}
                className={`bg-white p-4 md:p-6 rounded-2xl md:rounded-3xl border shadow-sm flex items-center justify-between transition-all ${ex.status.trim() === SESSION_STATUS.COMPLETED ? "border-green-100 bg-green-50/30" : "border-slate-100 hover:border-slate-200"}`}
              >
                <div className="flex items-center gap-4 md:gap-6">
                  <div
                    className={`p-2 md:p-3 rounded-full ${ex.status.trim() === SESSION_STATUS.COMPLETED ? "bg-green-100 text-green-600" : "bg-slate-50 text-slate-300"}`}
                  >
                    {ex.status.trim() === SESSION_STATUS.COMPLETED ? (
                      <CheckCircle2 size={20} className="md:w-6 md:h-6" />
                    ) : (
                      <PlayCircle size={20} className="md:w-6 md:h-6" />
                    )}
                  </div>
                  <div>
                    <h4
                      className={`font-bold text-sm md:text-base ${ex.status === SESSION_STATUS.COMPLETED ? "text-green-900" : "text-slate-800"}`}
                    >
                      {ex.name}
                    </h4>
                    <p className="text-[10px] md:text-[11px] text-slate-400 font-bold uppercase">
                      {ex.sets} sets • {ex.reps} reps
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setActiveEx(ex);
                    setIsModalOpen(true);
                  }}
                  className="bg-slate-100 text-slate-600 text-[10px] md:text-xs font-bold px-4 md:px-6 py-2 rounded-lg border border-slate-200 hover:bg-blue-600 hover:text-white transition-all"
                >
                  Open
                </button>
              </div>
            ))}
          </div>
        </div>

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

      {/* DETAIL MODAL */}
      <Modal
        key={activeEx?.id}
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`Detail - ${activeEx?.name}`}
      >
        <ExerciseModalContent
          selectedDay={selectedDay}
          activeEx={activeEx}
          onComplete={handleExerciseCompleted}
        />
      </Modal>

      {/* SUCCESS POPUP (Enhanced) */}
      <Modal open={isExSuccessOpen} onClose={handleCloseExSuccess} title="">
        <ExerciseSuccessModal
          onClose={handleCloseExSuccess}
          exerciseName={activeEx?.name || "Exercise"}
        />
      </Modal>

      {/* SESSION COMPLETE (Tightened) */}
      <Modal
        open={isCongratsOpen}
        onClose={() => setIsCongratsOpen(false)}
        title=""
      >
        <CompletionModal
          onClose={() => setIsCongratsOpen(false)}
          sessionTitle={displayedSession?.title || "Workout"}
        />
      </Modal>
    </div>
  );
}
