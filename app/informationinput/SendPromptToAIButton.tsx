"use client";

const sendPromptToAI = async () => {
  try {
    const response = await fetch("/api/generate-plan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}), // Empty body is fine since API uses mock data
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
      }}
    >
      Test AI
    </button>
  );
}
