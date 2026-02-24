"use client";

import { buildPayload } from "./payloadBuilder";
import { useState } from "react";
import { redirect } from "next/navigation";
import LoadingOverlay from "./LoadingOverlay";
import { INPUT_MOCK_DATA_2 } from "@/lib/mockData";

export default function SendPromptToAIButton() {
  const [isLoading, setIsLoading] = useState(false);

  const sendPromptToAI = async () => {
    try {
      setIsLoading(true);
      // Get the form element
      const form = document.querySelector("form");
      if (!form) {
        alert("Form not found");
        return;
      }

      // Build payload from form data
      const formData = new FormData(form);
      const payload = INPUT_MOCK_DATA_2; // Use mock data for testing

      console.log("Sending payload:", payload);

      const response = await fetch("/api/generate-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: payload }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate plan");
      }

      // Handle successful response
      const plan = await response.json();
      console.log("Generated Plan:", plan);
      console.log("Plan ID:", plan.exercise_plan?.plan_info?.plan_id);

      const upsertResponse = await fetch("/api/upsert-exercise-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: plan }),
      });

      if (!upsertResponse.ok) {
        const errorData = await upsertResponse.json();
        throw new Error(errorData.error || "Failed to upsert exercise data");
      }

      // Do something with the plan data
      alert("Plan generated successfully!");
      redirect("/overview");
      return plan; // Return the plan if you need it elsewhere
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
        {isLoading ? "Generating..." : "Test AI"}
      </button>
    </>
  );
}
