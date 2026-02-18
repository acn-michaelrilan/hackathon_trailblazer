// ./MedicalSafetyRiskFlags.tsx
"use client";

import { useState } from "react";

type YesNo = "yes" | "no" | "";

export default function MedicalSafetyRiskFlags() {
  const sectionClass = "msr-section";
  const groupClass = "msr-group";
  const depClass = "msr-dep";

  // Track radio selections to control required/disabled for dependent fields
  const [heartCondition, setHeartCondition] = useState<YesNo>("");
  const [falls, setFalls] = useState<YesNo>("");
  const [dizziness, setDizziness] = useState<YesNo>("");

  const styles = `
    /* Scoped styles for conditional display */
    .${sectionClass} .${depClass} { display: none; }

    /* Heart condition details only when Yes */
    .${groupClass}[data-key="heart_condition"]:has(#heart_condition_yes:checked) .dep-heart { display: block; }

    /* Pacemaker/implant details only when Yes */
    .${groupClass}[data-key="pacemaker_or_implant"]:has(#pacemaker_or_implant_yes:checked) .dep-pacemaker { display: block; }

    /* Number of falls only when Yes */
    .${groupClass}[data-key="history_of_falls_last_6_months"]:has(#history_of_falls_last_6_months_yes:checked) .dep-falls { display: block; }

    /* Dizziness details only when Yes */
    .${groupClass}[data-key="dizziness_or_fainting_episodes"]:has(#dizziness_or_fainting_episodes_yes:checked) .dep-dizziness { display: block; }
  `;

  const heartYes = heartCondition === "yes";
  const fallsYes = falls === "yes";
  const dizzinessYes = dizziness === "yes";

  return (
    <section className={`modal-section ${sectionClass}`}>
      <style>{styles}</style>

      <h3 style={{ color: "#1f3fae" }}>Medical Safety &amp; Risk Flags</h3>

      {/* Vitals (REQUIRED) */}
      <p>
        Vitals <span style={{ color: "red" }}>*</span>
      </p>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        {/* Blood Pressure */}
        <div>
          <label style={{ display: "block", fontSize: 12, color: "#666" }}>
            Blood Pressure (mmHg)
          </label>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
            <input
              type="number"
              inputMode="numeric"
              name="bp_sys"
              placeholder="Systolic"
              min={70}
              max={250}
              required
              style={{ width: 96 }}
            />
            <span>/</span>
            <input
              type="number"
              inputMode="numeric"
              name="bp_dia"
              placeholder="Diastolic"
              min={40}
              max={150}
              required
              style={{ width: 96 }}
            />
          </div>
        </div>

        {/* Resting Heart Rate */}
        <div>
          <label style={{ display: "block", fontSize: 12, color: "#666" }}>
            Resting Heart Rate (bpm)
          </label>
          <input
            type="number"
            inputMode="numeric"
            name="resting_heart_rate"
            placeholder="e.g., 72"
            min={30}
            max={220}
            required
            style={{ width: 160 }}
          />
        </div>
      </div>

      {/* Heart condition */}
      <div
        className={groupClass}
        data-key="heart_condition"
        style={{ marginTop: 16 }}
      >
        <p>
          Known Heart Condition <span style={{ color: "red" }}>*</span>
        </p>

        <label>
          <input
            type="radio"
            id="heart_condition_yes"
            name="heart_condition"
            value="yes"
            required
            onChange={() => setHeartCondition("yes")}
          />{" "}
          Yes
        </label>

        <label style={{ marginLeft: 12 }}>
          <input
            type="radio"
            id="heart_condition_no"
            name="heart_condition"
            value="no"
            onChange={() => setHeartCondition("no")}
          />{" "}
          No
        </label>

        <div className={`${depClass} dep-heart`} style={{ marginTop: 8 }}>
          <input
            type="text"
            name="heart_condition_details"
            placeholder="Details (e.g., hypertension, meds)"
            style={{ width: "100%" }}
            required={heartYes}
            disabled={!heartYes}
          />
        </div>
      </div>

      {/* Pacemaker / Implants (still optional per your note) */}
      <div
        className={groupClass}
        data-key="pacemaker_or_implant" // ✅ fixed to match CSS
        style={{ marginTop: 16 }}
      >
        <p>
          Pacemaker or Implant <span style={{ color: "red" }}>*</span>
        </p>

        <label>
          <input
            type="radio"
            id="pacemaker_or_implant_yes"
            name="pacemaker_or_implant"
            required
            value="yes"
          />{" "}
          Yes
        </label>

        <label style={{ marginLeft: 12 }}>
          <input
            type="radio"
            id="pacemaker_or_implant_no"
            name="pacemaker_or_implant"
            value="no"
          />{" "}
          No
        </label>

        {/* Optional details; appears only when Yes */}
        <div className={`${depClass} dep-pacemaker`} style={{ marginTop: 8 }}>
          <input
            type="text"
            name="pacemaker_or_implant_details"
            placeholder="Device type/notes (optional)"
            style={{ width: "100%" }}
          />
        </div>
      </div>

      {/* Falls */}
      <div
        className={groupClass}
        data-key="history_of_falls_last_6_months"
        style={{ marginTop: 16 }}
      >
        <p>
          Falls in the Last 6 Months <span style={{ color: "red" }}>*</span>
        </p>

        <label>
          <input
            type="radio"
            id="history_of_falls_last_6_months_yes"
            name="history_of_falls_last_6_months"
            value="yes"
            required
            onChange={() => setFalls("yes")}
          />{" "}
          Yes
        </label>

        <label style={{ marginLeft: 12 }}>
          <input
            type="radio"
            id="history_of_falls_last_6_months_no"
            name="history_of_falls_last_6_months"
            value="no"
            onChange={() => setFalls("no")}
          />{" "}
          No
        </label>

        <div className={`${depClass} dep-falls`} style={{ marginTop: 8 }}>
          <input
            type="number"
            inputMode="numeric"
            name="number_of_falls"
            min={1}
            max={50}
            placeholder="Number of falls"
            style={{ width: 200 }}
            required={fallsYes}
            disabled={!fallsYes}
          />
        </div>
      </div>

      {/* Dizziness / Fainting */}
      <div
        className={groupClass}
        data-key="dizziness_or_fainting_episodes"
        style={{ marginTop: 16 }}
      >
        <p>
          Dizziness or Fainting Episodes <span style={{ color: "red" }}>*</span>
        </p>

        <label>
          <input
            type="radio"
            id="dizziness_or_fainting_episodes_yes"
            name="dizziness_or_fainting_episodes"
            value="yes"
            required
            onChange={() => setDizziness("yes")}
          />{" "}
          Yes
        </label>

        <label style={{ marginLeft: 12 }}>
          <input
            type="radio"
            id="dizziness_or_fainting_episodes_no"
            name="dizziness_or_fainting_episodes"
            value="no"
            onChange={() => setDizziness("no")}
          />{" "}
          No
        </label>

        <div className={`${depClass} dep-dizziness`} style={{ marginTop: 8 }}>
          <input
            type="text"
            name="dizziness_details"
            placeholder="Details (e.g., on standing, frequency)"
            style={{ width: "100%" }}
            required={dizzinessYes}
            disabled={!dizzinessYes}
          />
        </div>
      </div>

      {/* Pain (still optional unless you want otherwise) */}
      <p style={{ marginTop: 16 }}>Are you experiencing any pain right now?</p>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          flexWrap: "wrap",
        }}
      >
        <label style={{ fontSize: 12, color: "#666" }}>
          Rate your pain (0–10)
        </label>
        <input
          type="range"
          name="pain_scale"
          min={0}
          max={10}
          step={1}
          defaultValue={0}
        />
      </div>

      <div style={{ marginTop: 8 }}>
        <input
          type="text"
          name="pain_location"
          placeholder="Where is the pain located?"
          style={{ width: "100%" }}
        />
      </div>
    </section>
  );
}
