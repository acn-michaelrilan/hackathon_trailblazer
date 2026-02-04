"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Exercise } from "@/types";

type Props = {
  selectedDay: number;
  activeEx: Exercise | null;
};

export default function ExerciseModalContent({ selectedDay, activeEx }: Props) {
  return (
    <div className="bg-white p-4 md:p-6 font-sans text-slate-800">
      <main className="max-w-4xl mx-auto">
        {/* Navigation & Title */}
        <div className="flex flex-col md:flex-row md:items-center gap-6 mb-10">
          <Link
            href="/overview"
            className="inline-flex items-center text-slate-500 hover:text-slate-800 transition-colors"
          >
            <div className="bg-slate-800 text-white rounded-full p-1 mr-2">
              <ArrowLeft size={16} />
            </div>
            <span className="text-sm font-semibold uppercase tracking-tight">
              back to Menu
            </span>
          </Link>

          <h1 className="text-3xl md:text-4xl font-bold text-blue-800 md:ml-20">
            Day {selectedDay}: {activeEx?.name ?? "Exercise Detail"}
          </h1>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Left Side: Step-by-Step Image */}
          <div className="space-y-6">
            <div className="aspect-video bg-[#DDE1E6] rounded-3xl overflow-hidden shadow-md border border-gray-200">
              {/* Step-by-step instructional image */}
              <img
                src="http://googleusercontent.com/image_collection/image_retrieval/3183214607531754248_0"
                alt="Step by step diagram of hand open and close exercise"
                className="w-full h-full object-contain p-4"
              />
            </div>

            <div>
              <h2 className="font-bold text-2xl text-slate-900 leading-tight mb-2">
                Recovering through Hand Open <br /> and Close movements.
              </h2>
              <a
                href="https://www.youtube.com/watch?v=CaB9jwzxDz0"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 text-base underline font-medium hover:text-blue-700 transition-colors"
              >
                Watch Tutorial on Youtube
              </a>
            </div>
          </div>

          {/* Right Side: Instructions */}
          <div className="space-y-8">
            <section className="bg-[#DDE1E6] border-2 border-blue-900 rounded-3xl p-6 md:p-8 shadow-sm">
              <h3 className="font-bold text-xl mb-3 text-slate-900">
                Exercise Description
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Hand Open and Close is a gentle mobility and strengthening exercise
                that targets the muscles of the hands, fingers, and forearms. It's
                great for improving grip strength, reducing stiffness, and
                increasing circulation—perfect for warm-ups, desk breaks, or
                recovery routines.
              </p>
            </section>

            <section className="bg-[#DDE1E6] border-2 border-blue-900 rounded-3xl p-6 md:p-8 shadow-sm">
              <h3 className="font-bold text-xl mb-5 text-slate-900">Exercise Steps</h3>
              <ol className="text-slate-600 space-y-5 list-decimal ml-5">
                <li>
                  <span className="font-bold text-slate-900">Start Position</span> —
                  Sit or stand with your arms relaxed at your sides. Keep your hands
                  in front of you at a comfortable height.
                </li>
                <li>
                  <span className="font-bold text-slate-900">Open Your Hands</span> —
                  Spread your fingers as wide as you comfortably can, stretching them
                  outward without causing strain.
                </li>
                <li>
                  <span className="font-bold text-slate-900">Close Into a Fist</span> —
                  Gently curl your fingers inward to form a fist. Keep the squeeze firm
                  but not painful.
                </li>
                <li>
                  <span className="font-bold text-slate-900">Repeat with Control</span> —
                  Slowly open your hands again and continue the open‑close motion in a
                  steady rhythm.
                </li>
              </ol>
            </section>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-end mt-12">
          <button className="bg-[#1DB954] hover:bg-[#1aa34a] text-white font-bold py-3 px-10 rounded-xl text-xl transition-all shadow-lg active:scale-95">
            Complete
          </button>
        </div>
      </main>
    </div>
  );
}