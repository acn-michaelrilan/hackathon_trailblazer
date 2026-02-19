// app/informationinput/CurrentActivityLevel.tsx
"use client";

import { useRef, useState } from "react";

type FieldErrors = Record<string, string>;

export default function CurrentActivityLevel() {
  const sectionRef = useRef<HTMLElement | null>(null);

  const sectionClass = "msr-section";
  const groupClass = "msr-group";

  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const styles = `
    .${sectionClass} .hint { color: #6b7280; font-size: 12px; margin-top: 4px; }
    .${groupClass} label + label { margin-left: 12px; }

    details > summary::-webkit-details-marker { display: none; }

    .goalRow {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 12px;
      align-items: start;
      margin-top: 8px;
    }

    .goalField { min-width: 0; }

    .goalField select,
    .goalField details { width: 100%; }

    @media (max-width: 900px) {
      .goalRow { grid-template-columns: 1fr; }
    }
  `;

  const FieldError = ({ name }: { name: string }) => {
    const msg = fieldErrors[name];
    if (!msg) return null;
    return (
      <p style={{ color: "crimson", marginTop: 6, fontWeight: 600 }}>{msg}</p>
    );
  };

  const getFieldValue = (name: string) => {
    const root = sectionRef.current;
    if (!root) return "";
    const el = root.querySelector<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >(`[name="${name}"]`);
    if (!el) return "";
    return (el as HTMLInputElement).value ?? "";
  };

  const hasAnySpecificTargetChecked = () => {
    const root = sectionRef.current;
    if (!root) return false;

    const checks = root.querySelectorAll<HTMLInputElement>(
      'input[type="checkbox"][name^="target_"]',
    );
    return Array.from(checks).some((c) => c.checked);
  };

  // Call this from the parent accordion Done validation (recommended),
  // OR you can keep it here for local checking.
  const validateAndSetErrors = () => {
    const nextErrors: FieldErrors = {};

    // Required select: activity level
    const currentActivity = getFieldValue("current_activity_level");
    if (!currentActivity) {
      nextErrors["current_activity_level"] =
        "How active are you on a typical day is required.";
    }

    // Required select: primary goal
    const primaryGoal = getFieldValue("primary_goal");
    if (!primaryGoal) {
      nextErrors["primary_goal"] = "Primary goal is required.";
    }

    setFieldErrors(nextErrors);

    const hasErrors = Object.keys(nextErrors).length > 0;

    if (hasErrors) {
      const root = sectionRef.current;

      if (!currentActivity) {
        root?.querySelector('[name="current_activity_level"]')?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      } else if (!primaryGoal) {
        root?.querySelector('[name="primary_goal"]')?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      } else {
        root?.querySelector('[data-targets="true"]')?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }

    return !hasErrors;
  };

  // Clears errors as user fixes inputs
  const onSectionChange = () => {
    const root = sectionRef.current;
    if (!root) return;

    setFieldErrors((prev) => {
      const next = { ...prev };

      if (getFieldValue("current_activity_level"))
        delete next["current_activity_level"];
      if (getFieldValue("primary_goal")) delete next["primary_goal"];

      return next;
    });
  };

  return (
    <section
      ref={(el) => {
        sectionRef.current = el;
      }}
      className={`modal-section ${sectionClass}`}
      onChange={onSectionChange}
    >
      <style>{styles}</style>

      <h3 style={{ color: "#1f3fae" }}>Current Activity Level</h3>

      {/* activity level profiling */}
      <p style={{ marginTop: 16 }}>
        How active are you on a typical day?{" "}
        <span style={{ color: "red" }}>*</span>
      </p>
      <select
        name="current_activity_level"
        style={{ padding: 6 }}
        required
        defaultValue=""
      >
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
      <FieldError name="current_activity_level" />

      {/* activity details (optional) */}
      <p style={{ marginTop: 16 }}>
        Tell us a bit about your daily activity (Optional)
      </p>
      <textarea
        name="activity_details"
        rows={2}
        style={{ width: "100%", padding: 6 }}
      />

      {/* goals */}
      <p style={{ marginTop: 16, marginBottom: 8 }}>
        What are your health and movement goals?
      </p>

      <div className="goalRow">
        {/* PRIMARY GOAL (required) */}
        <div className="goalField">
          <p className="hint" style={{ marginTop: 0 }}>
            Choose your primary goal: <span style={{ color: "red" }}>*</span>
          </p>
          <select
            name="primary_goal"
            style={{ padding: 6, width: "100%" }}
            required
            defaultValue=""
          >
            <option value="">Select</option>
            <option value="reduce_pain">Reduce pain</option>
            <option value="restore_strength">Restore strength</option>
            <option value="recover_after_surgery">
              Recover after surgery/injury
            </option>
            <option value="prevent_decline">Prevent future injury</option>
          </select>
          <FieldError name="primary_goal" />
        </div>

        {/* SECONDARY GOAL (optional) */}
        <div className="goalField">
          <p className="hint" style={{ marginTop: 0 }}>
            Choose your secondary goal: (Optional)
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

            {/* your secondary goal checkboxes unchanged */}
            <div
              style={{
                marginTop: 10,
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              <label
                style={{
                  display: "grid",
                  gridTemplateColumns: "16px 1fr",
                  gap: 10,
                }}
              >
                <input
                  type="checkbox"
                  name="goal_improve_mobility"
                  value="improve_mobility"
                />
                <span>Improve mobility &amp; ROM</span>
              </label>
              <label
                style={{
                  display: "grid",
                  gridTemplateColumns: "16px 1fr",
                  gap: 10,
                }}
              >
                <input
                  type="checkbox"
                  name="goal_improve_balance"
                  value="improve_balance"
                />
                <span>Improve balance &amp; prevent falls</span>
              </label>
              <label
                style={{
                  display: "grid",
                  gridTemplateColumns: "16px 1fr",
                  gap: 10,
                }}
              >
                <input
                  type="checkbox"
                  name="goal_increase_endurance"
                  value="increase_endurance"
                />
                <span>Increase endurance</span>
              </label>
              <label
                style={{
                  display: "grid",
                  gridTemplateColumns: "16px 1fr",
                  gap: 10,
                }}
              >
                <input
                  type="checkbox"
                  name="goal_move_independently"
                  value="move_independently"
                />
                <span>Move independently</span>
              </label>
            </div>
          </details>
        </div>

        {/* SPECIFIC TARGETS */}
        <div className="goalField" data-targets="true">
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

            {/* your target checkboxes unchanged */}
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
                }}
              >
                <input
                  type="checkbox"
                  name="target_climb_stairs"
                  value="climb_stairs"
                />
                <span>Climb stairs without assistance</span>
              </label>
              <label
                style={{
                  display: "grid",
                  gridTemplateColumns: "16px 1fr",
                  gap: 10,
                }}
              >
                <input
                  type="checkbox"
                  name="target_get_in_out_bed"
                  value="get_in_out_bed"
                />
                <span>Get in and out of bed independently</span>
              </label>
              <label
                style={{
                  display: "grid",
                  gridTemplateColumns: "16px 1fr",
                  gap: 10,
                }}
              >
                <input
                  type="checkbox"
                  name="target_stand_without_hands"
                  value="stand_without_hands"
                />
                <span>Stand up from a chair without using hands</span>
              </label>
              <label
                style={{
                  display: "grid",
                  gridTemplateColumns: "16px 1fr",
                  gap: 10,
                }}
              >
                <input
                  type="checkbox"
                  name="target_use_hand_daily_tasks"
                  value="use_hand_daily_tasks"
                />
                <span>Use my affected hand to eat and dress</span>
              </label>
              <label
                style={{
                  display: "grid",
                  gridTemplateColumns: "16px 1fr",
                  gap: 10,
                }}
              >
                <input
                  type="checkbox"
                  name="target_walk_longer"
                  value="walk_longer"
                />
                <span>Walk longer distances without getting tired</span>
              </label>
              <label
                style={{
                  display: "grid",
                  gridTemplateColumns: "16px 1fr",
                  gap: 10,
                }}
              >
                <input
                  type="checkbox"
                  name="target_regain_balance_turning"
                  value="regain_balance_turning"
                />
                <span>Regain balance while turning or changing direction</span>
              </label>

              <label
                style={{
                  display: "grid",
                  gridTemplateColumns: "16px 1fr",
                  gap: 10,
                }}
              >
                <input
                  type="checkbox"
                  name="target_return_to_driving"
                  value="return_to_driving"
                />
                <span>Return to driving safely</span>
              </label>

              <label
                style={{
                  display: "grid",
                  gridTemplateColumns: "16px 1fr",
                  gap: 10,
                }}
              >
                <input
                  type="checkbox"
                  name="target_return_to_work_or_school"
                  value="return_to_work_or_school"
                />
                <span>Go back to work or school</span>
              </label>

              <label
                style={{
                  display: "grid",
                  gridTemplateColumns: "16px 1fr",
                  gap: 10,
                }}
              >
                <input
                  type="checkbox"
                  name="target_carry_groceries"
                  value="carry_groceries"
                />
                <span>Carry groceries without losing balance</span>
              </label>

              <label
                style={{
                  display: "grid",
                  gridTemplateColumns: "16px 1fr",
                  gap: 10,
                }}
              >
                <input
                  type="checkbox"
                  name="target_improve_coordination"
                  value="improve_coordination"
                />
                <span>Improve coordination of my affected side</span>
              </label>

              <label
                style={{
                  display: "grid",
                  gridTemplateColumns: "16px 1fr",
                  gap: 10,
                }}
              >
                <input
                  type="checkbox"
                  name="target_walk_uneven_surfaces"
                  value="walk_uneven_surfaces"
                />
                <span>Walk on uneven surfaces safely</span>
              </label>

              <label
                style={{
                  display: "grid",
                  gridTemplateColumns: "16px 1fr",
                  gap: 10,
                }}
              >
                <input
                  type="checkbox"
                  name="target_reduce_spasticity"
                  value="reduce_spasticity"
                />
                <span>Reduce spasticity or stiffness in affected limbs</span>
              </label>

              <label
                style={{
                  display: "grid",
                  gridTemplateColumns: "16px 1fr",
                  gap: 10,
                }}
              >
                <input
                  type="checkbox"
                  name="target_improve_grip"
                  value="improve_grip"
                />
                <span>Improve hand grip and fine motor control</span>
              </label>

              <label
                style={{
                  display: "grid",
                  gridTemplateColumns: "16px 1fr",
                  gap: 10,
                }}
              >
                <input
                  type="checkbox"
                  name="target_bathe_independently"
                  value="bathe_independently"
                />
                <span>Bathe and toilet independently</span>
              </label>

              <label
                style={{
                  display: "grid",
                  gridTemplateColumns: "16px 1fr",
                  gap: 10,
                }}
              >
                <input
                  type="checkbox"
                  name="target_return_to_sports"
                  value="return_to_sports"
                />
                <span>Return to recreational activities or sports</span>
              </label>
            </div>
          </details>
        </div>
      </div>

      {/* NOTE:
          validateAndSetErrors() needs to be called by the parent accordion's Done button validation.
          If you want, I can show you the exact patch for StrokeAccordion & GeneralFitnessAccordion.
      */}
    </section>
  );
}
