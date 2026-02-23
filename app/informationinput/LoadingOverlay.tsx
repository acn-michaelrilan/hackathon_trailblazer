import { Loader2 } from "lucide-react";
import { LoadingOverlayProps } from "@/types";

export default function LoadingOverlay({
  isOpen,
  message = "We're crafting something special for you.",
}: LoadingOverlayProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[100] transition-all duration-300">
      {/* Darkened backdrop with heavy blur */}
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-md" />

      {/* Animated Background Blobs (Themed) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg h-64 opacity-50 pointer-events-none">
        <div className="absolute top-0 left-0 w-48 h-48 bg-[#7BA63F]/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-[#264D73]/30 rounded-full blur-3xl animate-pulse delay-700" />
      </div>

      {/* Content Card */}
      <div className="relative bg-white/80 backdrop-blur-xl border border-white/20 rounded-3xl p-10 flex flex-col items-center gap-6 shadow-[0_20px_50px_rgba(0,0,0,0.1)] max-w-sm w-[90%] mx-auto">
        
        {/* Spinner Section */}
        <div className="relative">
          {/* Soft outer glow */}
          <div className="absolute inset-0 bg-[#7BA63F]/20 rounded-full scale-150 blur-2xl opacity-60 animate-pulse" />
          
          <div className="relative bg-white rounded-full p-5 shadow-inner border border-slate-100">
            <Loader2 
              size={42} 
              className="text-[#7BA63F] animate-spin stroke-[2.5px]" 
            />
          </div>
        </div>

        {/* Text Section */}
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-extrabold text-[#264D73] tracking-tight">
            Generating Plan
          </h2>
          <div className="flex flex-col gap-1">
            <p className="text-[#7BA63F] font-semibold text-sm animate-pulse">
              Please hold on...
            </p>
            <p className="text-slate-500 text-sm leading-relaxed">
              {message}
            </p>
          </div>
        </div>

        {/* Minimal progress indicator decoration */}
        <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-[#7BA63F] to-[#264D73] w-1/3 animate-[loading_2s_infinite_ease-in-out]" />
        </div>
      </div>

      <style jsx>{`
        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
      `}</style>
    </div>
  );
}