// app/informationinput/GeneralCurrentActivityLevel.tsx
"use client";

export default function GeneralCurrentActivityLevel() {
  const sectionClass = "msr-section";

  const styles = `
  .${sectionClass} .hint { color: #6b7280; font-size: 12px; margin-top: 4px; }

  /* Make summary look like a normal dropdown */
  .${sectionClass} details > summary::-webkit-details-marker { display: none; }

  /* Fix checkbox + wrapped text alignment */
  .${sectionClass} .checkItem {
    display: grid;
    grid-template-columns: 16px 1fr;
    gap: 10px;
    align-items: start;
    line-height: 1.3;
  }
  .${sectionClass} .checkItem input[type="checkbox"] { margin-top: 2px; }

  /* Scrollable dropdown list */
  .${sectionClass} .dropdownList {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-height: 200px;
    overflow-y: auto;
    padding-right: 6px;
  }

  /* ✅ NEW: align Primary / Secondary / Targets in one row */
  .${sectionClass} .goalRow {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 12px;
    align-items: start;
    margin-top: 8px;
  }

  .${sectionClass} .goalField {
    min-width: 0; /* prevents overflow in grid columns */
  }

  .${sectionClass} .goalField select,
  .${sectionClass} .goalField details {
    width: 100%;
  }

  /* responsive: stack on smaller screens */
  @media (max-width: 900px) {
    .${sectionClass} .goalRow {
      grid-template-columns: 1fr;
    }
  }
`;

  return (
    <section className={`modal-section ${sectionClass}`}>
      <style>{styles}</style>

      <h3 style={{ color: "#1f3fae" }}>Current Activity Level</h3>

      {/* Activity level */}
      <p style={{ marginTop: 16 }}>
        How active are you currently? <span style={{ color: "red" }}>*</span>
      </p>
      <select name="current_activity_level" required style={{ padding: 6 }}>
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

      <div className="goalRow">
        {/* ✅ Primary goal */}
        <div className="goalField">
          <p className="hint" style={{ marginTop: 0 }}>
            Choose your primary goal: <span style={{ color: "red" }}>*</span>
          </p>

          <select
            name="primary_goal"
            required
            style={{ padding: 6, width: "100%" }}
          >
            <option value="">Select</option>
            <option value="weight_management">Weight management</option>
            <option value="increase_strength">
              Build muscle / increase strength
            </option>
            <option value="cardio_fitness">Cardio fitness</option>
            <option value="flexibility_mobility">
              Flexibility &amp; mobility
            </option>
          </select>
        </div>

        {/* ✅ Secondary goals */}
        <div className="goalField">
          <p className="hint" style={{ marginTop: 0 }}>
            Choose secondary goals (Optional):
          </p>

          <details
            style={{
              border: "1px solid #d1d5db",
              borderRadius: 6,
              padding: 8,
              background: "#fff",
            }}
          >
            <summary
              style={{
                cursor: "pointer",
                listStyle: "none",
                outline: "none",
                userSelect: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 8,
                fontSize: 16,
              }}
            >
              <span>Select</span>
              <span style={{ color: "#6b7280" }}>▾</span>
            </summary>

            <div className="dropdownList">
              <label className="checkItem">
                <input
                  type="checkbox"
                  name="goal_increase_steps"
                  value="increase_steps"
                />
                <span>Increase daily steps</span>
              </label>

              <label className="checkItem">
                <input
                  type="checkbox"
                  name="goal_improve_posture"
                  value="improve_posture"
                />
                <span>Improve posture / core</span>
              </label>

              <label className="checkItem">
                <input
                  type="checkbox"
                  name="goal_reduce_stress"
                  value="reduce_stress"
                />
                <span>Reduce stress</span>
              </label>

              <label className="checkItem">
                <input
                  type="checkbox"
                  name="goal_gain_energy"
                  value="gain_energy"
                />
                <span>Gain energy</span>
              </label>

              <label className="checkItem">
                <input
                  type="checkbox"
                  name="goal_improve_endurance"
                  value="improve_endurance"
                />
                <span>Improve endurance</span>
              </label>

              <label className="checkItem">
                <input
                  type="checkbox"
                  name="goal_general_toning"
                  value="general_toning"
                />
                <span>General toning</span>
              </label>
            </div>
          </details>
        </div>

        {/* ✅ Specific targets */}
        <div className="goalField">
          <p className="hint" style={{ marginTop: 0 }}>
            Specific targets: (Optional)
          </p>

          <details
            style={{
              border: "1px solid #d1d5db",
              borderRadius: 6,
              padding: 8,
              background: "#fff",
            }}
          >
            <summary
              style={{
                cursor: "pointer",
                listStyle: "none",
                outline: "none",
                userSelect: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 8,
                fontSize: 16,
              }}
            >
              <span>Select</span>
              <span style={{ color: "#6b7280" }}>▾</span>
            </summary>

            <div className="dropdownList" style={{ maxHeight: 180 }}>
              <label className="checkItem">
                <input type="checkbox" name="target_run_5k" value="run_5k" />
                <span>Run 5km</span>
              </label>

              <label className="checkItem">
                <input
                  type="checkbox"
                  name="target_do_10k_steps"
                  value="ten_k_steps_per_day"
                />
                <span>10k steps/day</span>
              </label>

              <label className="checkItem">
                <input
                  type="checkbox"
                  name="target_increase_vo2"
                  value="increase_cardio_capacity"
                />
                <span>Increase cardio capacity</span>
              </label>

              <label className="checkItem">
                <input
                  type="checkbox"
                  name="target_full_body_strength"
                  value="full_body_strength"
                />
                <span>Full-body strength routine</span>
              </label>

              <label className="checkItem">
                <input
                  type="checkbox"
                  name="target_mobility_flow"
                  value="daily_mobility_flow"
                />
                <span>Daily mobility flow</span>
              </label>

              <label className="checkItem">
                <input
                  type="checkbox"
                  name="target_event_ready"
                  value="event_training"
                />
                <span>Train for an event</span>
              </label>
            </div>
          </details>
        </div>
      </div>
    </section>
  );
}
