import { Loader2 } from "lucide-react";
import { LoadingOverlayProps } from "@/types";

export default function LoadingOverlay({
  isOpen,
  message = "Generating your plan...",
}: LoadingOverlayProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl p-8 flex flex-col items-center gap-6 shadow-2xl max-w-sm">
        <div className="relative">
          <div className="absolute inset-0 bg-blue-100 rounded-full scale-150 blur-xl opacity-60 animate-pulse" />
          <div className="relative bg-blue-50 p-6 rounded-full inline-flex items-center justify-center ring-4 ring-blue-100">
            <Loader2 size={48} className="text-blue-600 animate-spin" />
          </div>
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-blue-800 mb-2">
            Generating Plan
          </h2>
          <p className="text-slate-500">{message}</p>
        </div>
      </div>
    </div>
  );
}
