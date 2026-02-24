"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import LoadingOverlay from "./LoadingOverlay";
import { INPUT_MOCK_DATA_2 } from "@/lib/mockData";
import { buildPayload } from "./payloadBuilder";

export default function SendPromptToAIButton() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const sendPromptToAI = async () => {
    try {
      setIsLoading(true);

      // Get the form element
      const form = document.querySelector("form");
      if (!form) {
        alert("Form not found");
        return;
      }

      const formData = new FormData(form);
      const payload = buildPayload(formData);
      console.log("Sending payload:", payload);

      // 1. Generate plan (also upserts server-side)
      const response = await fetch("/api/generate-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: payload }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate plan");
      }

      const plan = await response.json();
      console.log("Generated Plan:", plan);

      // 2. Navigate to overview on success
      router.push("/overview");
    } catch (err) {
      console.error("Error generating plan:", err);
      alert("Failed to generate plan. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <LoadingOverlay isOpen={isLoading} />
      <button
        onClick={sendPromptToAI}
        type="button"
        disabled={isLoading}
        style={{
          background: isLoading ? "#6cab2f99" : "#6cab2f",
          color: "white",
          padding: "12px 40px",
          borderRadius: 8,
          border: "none",
          fontSize: 16,
          marginLeft: "12px",
          cursor: isLoading ? "not-allowed" : "pointer",
        }}
      >
        {isLoading ? "Generating..." : "Generate Plan"}
      </button>
    </>
  );
}
