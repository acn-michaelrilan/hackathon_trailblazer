// app/informationinput/CurrentActivityLevel.tsx
export default function CurrentActivityLevel() {
  const sectionClass = "msr-section";
  const groupClass = "msr-group";

  const styles = `
  .${sectionClass} .hint { color: #6b7280; font-size: 12px; margin-top: 4px; }
  .${groupClass} label + label { margin-left: 12px; }

  /* make summary look like a normal dropdown */
  details > summary::-webkit-details-marker { display: none; }

  /* ✅ container for primary/secondary/targets in one row */
  .goalRow {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 12px;
    align-items: start;
    margin-top: 8px;
  }

  .goalField {
    min-width: 0;
  }

  /* ensure full width controls */
  .goalField select,
  .goalField details {
    width: 100%;
  }

  /* responsive: stack on smaller screens */
  @media (max-width: 900px) {
    .goalRow {
      grid-template-columns: 1fr;
    }
  }
`;

  return (
    <section className={`modal-section ${sectionClass}`}>
      <style>{styles}</style>

      <h3 style={{ color: "#1f3fae" }}>Current Activity Level</h3>

      {/* activity level profiling */}
      <p style={{ marginTop: 16 }}>How active are you on a typical day?</p>
      <select name="current_activity_level" style={{ padding: 6 }}>
        <option value="">Select</option>
        <option value="sedentary_activity">
          Sedentary — Mostly sitting; very little movement or exercise.
        </option>
        <option value="light_activity">
          Light Activity — Light daily movement (short walks, light chores).
        </option>
        <option value="moderate_activity">
          Moderate Activity — Regular activity or exercise 3–5× per week.
        </option>
        <option value="heavy_activity">
          Heavy Activity — Intense exercise or very active job most days.
        </option>
      </select>

      {/* activity details */}
      <p style={{ marginTop: 16 }}>
        Tell us a bit about your daily activity (optional)
      </p>
      <textarea
        name="activity_details"
        rows={2}
        style={{ width: "100%", padding: 6 }}
      />

      {/* goals (checkboxes) */}
      <p style={{ marginTop: 16, marginBottom: 8 }}>
        What are your health and movement goals?
      </p>

      <div className="goalRow">
        {/* PRIMARY GOAL */}
        <div className="goalField">
          <p className="hint" style={{ marginTop: 0 }}>
            Choose your primary goal:
          </p>

          <select name="primary_goal" style={{ padding: 6, width: "100%" }}>
            <option value="">Select</option>
            <option value="reduce_pain">Reduce pain</option>
            <option value="restore_strength">Restore strength</option>
            <option value="recover_after_surgery">
              Recover after surgery/injury
            </option>
            <option value="prevent_decline">Prevent future injury</option>
          </select>
        </div>

        {/* SECONDARY GOAL */}
        <div className="goalField">
          <p className="hint" style={{ marginTop: 0 }}>
            Choose your secondary goal:
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

            <div
              style={{
                marginTop: 10,
                display: "flex",
                flexDirection: "column",
                gap: 10,
                maxHeight: 180,
                overflowY: "auto",
                paddingRight: 6,
              }}
            >
              <label
                style={{
                  display: "grid",
                  gridTemplateColumns: "16px 1fr",
                  gap: 10,
                  alignItems: "start",
                  lineHeight: 1.3,
                }}
              >
                <input
                  type="checkbox"
                  name="goal_improve_mobility"
                  value="improve_mobility"
                  style={{ marginTop: 2 }}
                />
                <span>Improve mobility &amp; ROM</span>
              </label>

              <label
                style={{
                  display: "grid",
                  gridTemplateColumns: "16px 1fr",
                  gap: 10,
                  alignItems: "start",
                  lineHeight: 1.3,
                }}
              >
                <input
                  type="checkbox"
                  name="goal_improve_balance"
                  value="improve_balance"
                  style={{ marginTop: 2 }}
                />
                <span>Improve balance &amp; prevent falls</span>
              </label>

              <label
                style={{
                  display: "grid",
                  gridTemplateColumns: "16px 1fr",
                  gap: 10,
                  alignItems: "start",
                  lineHeight: 1.3,
                }}
              >
                <input
                  type="checkbox"
                  name="goal_increase_endurance"
                  value="increase_endurance"
                  style={{ marginTop: 2 }}
                />
                <span>Increase endurance</span>
              </label>

              <label
                style={{
                  display: "grid",
                  gridTemplateColumns: "16px 1fr",
                  gap: 10,
                  alignItems: "start",
                  lineHeight: 1.3,
                }}
              >
                <input
                  type="checkbox"
                  name="goal_move_independently"
                  value="move_independently"
                  style={{ marginTop: 2 }}
                />
                <span>Move independently</span>
              </label>
            </div>
          </details>
        </div>

        {/* SPECIFIC TARGETS */}
        <div className="goalField">
          <p className="hint" style={{ marginTop: 0 }}>
            Specific targets:
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

            <div
              style={{
                marginTop: 10,
                display: "flex",
                flexDirection: "column",
                gap: 10,
                maxHeight: 200,
                overflowY: "auto",
                paddingRight: 6,
              }}
            >
              <label
                style={{
                  display: "grid",
                  gridTemplateColumns: "16px 1fr",
                  gap: 10,
                  alignItems: "start",
                  lineHeight: 1.3,
                }}
              >
                <input
                  type="checkbox"
                  name="target_climb_stairs"
                  value="climb_stairs"
                  style={{ marginTop: 2 }}
                />
                <span>Climb stairs without assistance</span>
              </label>

              <label
                style={{
                  display: "grid",
                  gridTemplateColumns: "16px 1fr",
                  gap: 10,
                  alignItems: "start",
                  lineHeight: 1.3,
                }}
              >
                <input
                  type="checkbox"
                  name="target_get_in_out_bed"
                  value="get_in_out_bed"
                  style={{ marginTop: 2 }}
                />
                <span>Get in and out of bed independently</span>
              </label>

              <label
                style={{
                  display: "grid",
                  gridTemplateColumns: "16px 1fr",
                  gap: 10,
                  alignItems: "start",
                  lineHeight: 1.3,
                }}
              >
                <input
                  type="checkbox"
                  name="target_stand_without_hands"
                  value="stand_without_hands"
                  style={{ marginTop: 2 }}
                />
                <span>Stand up from a chair without using hands</span>
              </label>

              <label
                style={{
                  display: "grid",
                  gridTemplateColumns: "16px 1fr",
                  gap: 10,
                  alignItems: "start",
                  lineHeight: 1.3,
                }}
              >
                <input
                  type="checkbox"
                  name="target_use_hand_daily_tasks"
                  value="use_hand_daily_tasks"
                  style={{ marginTop: 2 }}
                />
                <span>Use my affected hand to eat and dress</span>
              </label>

              <label
                style={{
                  display: "grid",
                  gridTemplateColumns: "16px 1fr",
                  gap: 10,
                  alignItems: "start",
                  lineHeight: 1.3,
                }}
              >
                <input
                  type="checkbox"
                  name="target_walk_longer"
                  value="walk_longer"
                  style={{ marginTop: 2 }}
                />
                <span>Walk longer distances without getting tired</span>
              </label>

              <label
                style={{
                  display: "grid",
                  gridTemplateColumns: "16px 1fr",
                  gap: 10,
                  alignItems: "start",
                  lineHeight: 1.3,
                }}
              >
                <input
                  type="checkbox"
                  name="target_regain_balance_turning"
                  value="regain_balance_turning"
                  style={{ marginTop: 2 }}
                />
                <span>Regain balance while turning or changing direction</span>
              </label>

              <label
                style={{
                  display: "grid",
                  gridTemplateColumns: "16px 1fr",
                  gap: 10,
                  alignItems: "start",
                  lineHeight: 1.3,
                }}
              >
                <input
                  type="checkbox"
                  name="target_return_to_driving"
                  value="return_to_driving"
                  style={{ marginTop: 2 }}
                />
                <span>Return to driving safely</span>
              </label>

              <label
                style={{
                  display: "grid",
                  gridTemplateColumns: "16px 1fr",
                  gap: 10,
                  alignItems: "start",
                  lineHeight: 1.3,
                }}
              >
                <input
                  type="checkbox"
                  name="target_return_to_work_or_school"
                  value="return_to_work_or_school"
                  style={{ marginTop: 2 }}
                />
                <span>Go back to work or school</span>
              </label>

              <label
                style={{
                  display: "grid",
                  gridTemplateColumns: "16px 1fr",
                  gap: 10,
                  alignItems: "start",
                  lineHeight: 1.3,
                }}
              >
                <input
                  type="checkbox"
                  name="target_carry_groceries"
                  value="carry_groceries"
                  style={{ marginTop: 2 }}
                />
                <span>Carry groceries without losing balance</span>
              </label>

              <label
                style={{
                  display: "grid",
                  gridTemplateColumns: "16px 1fr",
                  gap: 10,
                  alignItems: "start",
                  lineHeight: 1.3,
                }}
              >
                <input
                  type="checkbox"
                  name="target_improve_coordination"
                  value="improve_coordination"
                  style={{ marginTop: 2 }}
                />
                <span>Improve coordination of my affected side</span>
              </label>

              <label
                style={{
                  display: "grid",
                  gridTemplateColumns: "16px 1fr",
                  gap: 10,
                  alignItems: "start",
                  lineHeight: 1.3,
                }}
              >
                <input
                  type="checkbox"
                  name="target_walk_uneven_surfaces"
                  value="walk_uneven_surfaces"
                  style={{ marginTop: 2 }}
                />
                <span>Walk on uneven surfaces safely</span>
              </label>

              <label
                style={{
                  display: "grid",
                  gridTemplateColumns: "16px 1fr",
                  gap: 10,
                  alignItems: "start",
                  lineHeight: 1.3,
                }}
              >
                <input
                  type="checkbox"
                  name="target_reduce_spasticity"
                  value="reduce_spasticity"
                  style={{ marginTop: 2 }}
                />
                <span>Reduce spasticity or stiffness in affected limbs</span>
              </label>

              <label
                style={{
                  display: "grid",
                  gridTemplateColumns: "16px 1fr",
                  gap: 10,
                  alignItems: "start",
                  lineHeight: 1.3,
                }}
              >
                <input
                  type="checkbox"
                  name="target_improve_grip"
                  value="improve_grip"
                  style={{ marginTop: 2 }}
                />
                <span>Improve hand grip and fine motor control</span>
              </label>

              <label
                style={{
                  display: "grid",
                  gridTemplateColumns: "16px 1fr",
                  gap: 10,
                  alignItems: "start",
                  lineHeight: 1.3,
                }}
              >
                <input
                  type="checkbox"
                  name="target_bathe_independently"
                  value="bathe_independently"
                  style={{ marginTop: 2 }}
                />
                <span>Bathe and toilet independently</span>
              </label>

              <label
                style={{
                  display: "grid",
                  gridTemplateColumns: "16px 1fr",
                  gap: 10,
                  alignItems: "start",
                  lineHeight: 1.3,
                }}
              >
                <input
                  type="checkbox"
                  name="target_return_to_sports"
                  value="return_to_sports"
                  style={{ marginTop: 2 }}
                />
                <span>Return to recreational activities or sports</span>
              </label>
            </div>
          </details>
        </div>
      </div>
    </section>
  );
}
