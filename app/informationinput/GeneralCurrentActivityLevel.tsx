// app/informationinput/GeneralCurrentActivityLevel.tsx
"use client";

export default function GeneralCurrentActivityLevel() {
  const sectionClass = "msr-section";

  const styles = `
    .${sectionClass} .hint { color: #6b7280; font-size: 12px; margin-top: 4px; }
  `;

  return (
    <section className={`modal-section ${sectionClass}`}>
      <style>{styles}</style>

      <h3 style={{ color: "#1f3fae" }}>Current Activity Level</h3>

      {/* Activity level */}
      <p style={{ marginTop: 16 }}>How active are you currently?</p>
      <select name="current_activity_level" style={{ padding: 6 }}>
        <option value="">Select</option>
        <option value="sedentary">Sedentary (little/no exercise)</option>
        <option value="lightly_active">Lightly active (1–3×/week)</option>
        <option value="moderately_active">Moderately active (3–5×/week)</option>
        <option value="very_active">Very active (6–7×/week)</option>
      </select>

      {/* Activity details */}
      <p style={{ marginTop: 16 }}>
        What are your usual activities? (optional)
      </p>
      <textarea
        name="activity_details"
        rows={2}
        placeholder="e.g., jog 2×/week; yoga on weekends"
        style={{ width: "100%", padding: 6 }}
      />

      {/* Goals */}
      <p style={{ marginTop: 16, marginBottom: 8 }}>
        What are your health and fitness goals?
      </p>

      {/* Primary goal (radio) */}
      <p className="hint" style={{ marginTop: 8 }}>
        Choose your primary goal:
      </p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 8,
          marginTop: 4,
        }}
      >
        <label>
          <input type="radio" name="primary_goal" value="weight_management" />{" "}
          Weight management
        </label>

        <label>
          <input type="radio" name="primary_goal" value="increase_strength" />{" "}
          Build muscle / increase strength
        </label>

        <label>
          <input type="radio" name="primary_goal" value="cardio_fitness" />{" "}
          Cardio fitness
        </label>

        <label>
          <input
            type="radio"
            name="primary_goal"
            value="flexibility_mobility"
          />{" "}
          Flexibility &amp; mobility
        </label>
      </div>

      {/* Secondary goals (checkboxes) */}
      <p className="hint" style={{ marginTop: 8 }}>
        Choose secondary goals (optional):
      </p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 8,
          marginTop: 4,
        }}
      >
        <label>
          <input
            type="checkbox"
            name="goal_increase_steps"
            value="increase_steps"
          />{" "}
          Increase daily steps
        </label>

        <label>
          <input
            type="checkbox"
            name="goal_improve_posture"
            value="improve_posture"
          />{" "}
          Improve posture / core
        </label>

        <label>
          <input
            type="checkbox"
            name="goal_reduce_stress"
            value="reduce_stress"
          />{" "}
          Reduce stress
        </label>

        <label>
          <input type="checkbox" name="goal_gain_energy" value="gain_energy" />{" "}
          Gain energy
        </label>

        <label>
          <input
            type="checkbox"
            name="goal_improve_endurance"
            value="improve_endurance"
          />{" "}
          Improve endurance
        </label>

        <label>
          <input
            type="checkbox"
            name="goal_general_toning"
            value="general_toning"
          />{" "}
          General toning
        </label>
      </div>

      {/* Specific targets */}
      <p style={{ marginTop: 20, marginBottom: 16 }}>
        What specific targets would you like to work toward?
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 8,
          marginTop: 4,
        }}
      >
        <label>
          <input type="checkbox" name="target_run_5k" value="run_5k" /> Run 5km
        </label>

        <label>
          <input
            type="checkbox"
            name="target_do_10k_steps"
            value="ten_k_steps_per_day"
          />{" "}
          10k steps/day
        </label>

        <label>
          <input
            type="checkbox"
            name="target_increase_vo2"
            value="increase_cardio_capacity"
          />{" "}
          Increase cardio capacity
        </label>

        <label>
          <input
            type="checkbox"
            name="target_full_body_strength"
            value="full_body_strength"
          />{" "}
          Full-body strength routine
        </label>

        <label>
          <input
            type="checkbox"
            name="target_mobility_flow"
            value="daily_mobility_flow"
          />{" "}
          Daily mobility flow
        </label>

        <label>
          <input
            type="checkbox"
            name="target_event_ready"
            value="event_training"
          />{" "}
          Train for an event
        </label>
      </div>
    </section>
  );
}
