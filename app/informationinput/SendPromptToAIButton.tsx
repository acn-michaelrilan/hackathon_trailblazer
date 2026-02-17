"use client";

import { buildPayload } from "./payloadBuilder";

const sendPromptToAI = async () => {
  try {
    // Get the form element
    const form = document.querySelector("form");
    if (!form) {
      alert("Form not found");
      return;
    }

    // Build payload from form data
    const formData = new FormData(form);
    const payload = buildPayload(formData);

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

    // Do something with the plan data
    alert("Plan generated successfully!");
    return plan; // Return the plan if you need it elsewhere
  } catch (err) {
    console.error("Error generating plan:", err);
    alert("Failed to generate plan. Please try again.");
  }
};

export default function SendPromptToAIButton() {
  return (
    <button
      onClick={sendPromptToAI}
      type="button"
      style={{
        background: "#6cab2f",
        color: "white",
        padding: "12px 40px",
        borderRadius: 8,
        border: "none",
        fontSize: 16,
        marginLeft: "12px",
      }}
    >
      Test AI
    </button>
  );
}
