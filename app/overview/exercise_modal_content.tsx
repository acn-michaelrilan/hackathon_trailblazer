"use client";

import { useState } from "react";
import { CheckCircle2, PlayCircle, Loader2 } from "lucide-react";
import type { ExerciseViewProps } from "@/types";
import { SESSION_STATUS } from "@/backend/utils/constants";

export default function ExerciseModalContent({
  selectedDay,
  activeEx,
  onComplete,
}: ExerciseViewProps) {
  const [isCompleting, setIsCompleting] = useState(false);

  if (!activeEx) return null;

  // Handler to update status in DB via API
  const handleComplete = async () => {
    try {
      setIsCompleting(true);

      // Call secure API endpoint instead of direct Supabase access
      const response = await fetch("/api/exercise-progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionExerciseId: activeEx.sessionExerciseId,
          completedSets: activeEx.sets,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update progress");
      }

      // Call parent callback to refresh data after successful completion
      if (onComplete) onComplete();
    } catch (err) {
      console.error("Error updating exercise:", err);
      alert("Failed to save progress. Please try again.");
    } finally {
      setIsCompleting(false);
    }
  };

  return (
    <div className="bg-white font-sans text-slate-800">
      <main className="max-w-4xl mx-auto">
        {/* Navigation & Title */}
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="bg-blue-800 text-white rounded-full p-1.5">
              <PlayCircle size={18} />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-blue-900">
              Day {selectedDay}: {activeEx.name}
            </h1>
          </div>

          {activeEx.status === "completed" && (
            <span className="flex items-center gap-1 text-green-600 font-bold bg-green-50 px-3 py-1 rounded-full text-sm w-fit">
              <CheckCircle2 size={16} /> Completed
            </span>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Left Side: Visuals & Metadata */}
          <div className="space-y-6">
            <div className="aspect-video bg-slate-100 rounded-3xl overflow-hidden shadow-sm border border-slate-200 flex items-center justify-center">
              {activeEx.video_url ? (
                /* You could embed the video here if desired */
                <div className="text-center p-6">
                  <PlayCircle
                    size={48}
                    className="text-blue-500 mx-auto mb-2"
                  />
                  <p className="text-sm text-slate-500 font-medium">
                    Video Tutorial Available
                  </p>
                </div>
              ) : (
                <p className="text-slate-400 italic">No video preview</p>
              )}
            </div>

            <div className="bg-blue-50/50 p-6 rounded-3xl border border-blue-100">
              <h4 className="text-sm font-bold text-blue-900 uppercase tracking-widest mb-4">
                Target Stats
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-2xl font-bold text-slate-900">
                    {activeEx.sets}
                  </p>
                  <p className="text-xs text-slate-500 uppercase font-bold">
                    Total Sets
                  </p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">
                    {activeEx.reps}
                  </p>
                  <p className="text-xs text-slate-500 uppercase font-bold">
                    Reps Per Set
                  </p>
                </div>
                {activeEx.hold_sec && (
                  <div>
                    <p className="text-2xl font-bold text-slate-900">
                      {activeEx.hold_sec}s
                    </p>
                    <p className="text-xs text-slate-500 uppercase font-bold">
                      Hold Time
                    </p>
                  </div>
                )}
                {activeEx.rest_sec && (
                  <div>
                    <p className="text-2xl font-bold text-slate-900">
                      {activeEx.rest_sec}s
                    </p>
                    <p className="text-xs text-slate-500 uppercase font-bold">
                      Rest Period
                    </p>
                  </div>
                )}
              </div>
            </div>

            {activeEx.video_url && (
              <a
                href={activeEx.video_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block w-full text-center bg-white border-2 border-blue-600 text-blue-600 font-bold py-3 rounded-xl hover:bg-blue-50 transition-colors"
              >
                Watch Tutorial on YouTube
              </a>
            )}
          </div>

          {/* Right Side: Detailed Instructions */}
          <div className="space-y-6">
            <section className="bg-slate-50 rounded-3xl p-6 border border-slate-100">
              <h3 className="font-bold text-lg mb-2 text-slate-900">
                Description
              </h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                {activeEx.description ||
                  "No description provided for this exercise."}
              </p>
            </section>

            {activeEx.steps && activeEx.steps.length > 0 && (
              <section className="bg-slate-50 rounded-3xl p-6 border border-slate-100">
                <h3 className="font-bold text-lg mb-4 text-slate-900">
                  Exercise Steps
                </h3>
                <ol className="text-slate-600 space-y-4 list-decimal ml-4 text-sm">
                  {activeEx.steps.map((step, index) => (
                    <li key={index} className="pl-2">
                      {step}
                    </li>
                  ))}
                </ol>
              </section>
            )}

            {/* Tips & Warnings */}
            {((activeEx.tips && activeEx.tips.length > 0) ||
              (activeEx.warnings && activeEx.warnings.length > 0)) && (
              <div className="grid grid-cols-1 gap-4">
                {activeEx.tips &&
                  activeEx.tips.map((tip, i) => (
                    <div
                      key={i}
                      className="bg-green-50 border border-green-100 p-4 rounded-2xl text-xs text-green-800"
                    >
                      <span className="font-bold">TIP:</span> {tip}
                    </div>
                  ))}
                {activeEx.warnings?.map((warning, i) => (
                  <div
                    key={i}
                    className="bg-red-50 border border-red-100 p-4 rounded-2xl text-xs text-red-800"
                  >
                    <span className="font-bold">CAUTION:</span> {warning}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-end mt-10">
          <button
            onClick={handleComplete}
            disabled={
              isCompleting || activeEx.status === SESSION_STATUS.COMPLETED
            }
            className={`
              flex items-center gap-2 font-bold py-4 px-12 rounded-2xl text-lg transition-all shadow-lg active:scale-95
              ${
                activeEx.status === SESSION_STATUS.COMPLETED
                  ? "bg-slate-200 text-slate-500 cursor-not-allowed"
                  : "bg-green-500 hover:bg-green-600 text-white"
              }
            `}
          >
            {isCompleting ? (
              <Loader2 className="animate-spin" size={20} />
            ) : activeEx.status === SESSION_STATUS.COMPLETED ? (
              "Already Completed"
            ) : (
              "Mark as Complete"
            )}
          </button>
        </div>
      </main>
    </div>
  );
}
