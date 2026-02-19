// app/informationinput/ExerciseEnvironment.tsx
"use client";

import React, { useState } from "react";

export default function ExerciseEnvironment() {
  const sectionClass = "env-wrap";

  const styles = `
  .${sectionClass} .row { margin-top: 12px; }
  .${sectionClass} .grid { display: grid; grid-template-columns: 1fr; gap: 8px; }
  @media (min-width: 560px) {
    .${sectionClass} .grid-2 { grid-template-columns: repeat(2, 1fr); }
  }
  .${sectionClass} .inline { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
  .${sectionClass} select, .${sectionClass} input[type="text"] { padding: 6px; width: 100%; }

  /* ✅ dropdown marker cleanup */
  .${sectionClass} details > summary::-webkit-details-marker { display: none; }

  /* ✅ consistent checkbox + wrapped text alignment */
  .${sectionClass} .checkItem {
    display: grid;
    grid-template-columns: 16px 1fr;
    gap: 10px;
    align-items: start;
    line-height: 1.3;
  }
  .${sectionClass} .checkItem input[type="checkbox"] {
    margin-top: 2px; /* small visual nudge */
  }

  /* ✅ scrollable dropdown list */
  .${sectionClass} .dropdownList {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-height: 200px;
    overflow-y: auto;
    padding-right: 6px;
  }

  
.${sectionClass} .envRow2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    align-items: start;
    margin-top: 12px;
  }

  /* responsive: stack on smaller screens */
  @media (max-width: 700px) {
    .${sectionClass} .envRow2 {
      grid-template-columns: 1fr;
    }
  }
`;

  // '', 'yes', or 'no' — start with no selection
  const [hasSupport, setHasSupport] = useState<"" | "yes" | "no">("");

  return (
    <section className={`modal-section ${sectionClass}`}>
      <style>{styles}</style>

      <h3 style={{ color: "#1f3fae" }}>Exercise Environment</h3>

      <div className="envRow2">
        {/* Location */}
        <div className="row" style={{ marginTop: 0 }}>
          <p>
            Location <span style={{ color: "red" }}>*</span>
          </p>
          <select
            name="location"
            defaultValue=""
            required
            style={{ width: "100%", maxWidth: 250 }}
          >
            <option value="">Select</option>
            <option value="home">Home</option>
            <option value="park_public">Park / Public area</option>
            <option value="wellness_center">Wellness center</option>
            <option value="gym">Gym</option>
            <option value="clinic">Clinic</option>
            <option value="workplace">Workplace</option>
          </select>
        </div>

        {/* Equipment available (dropdown) */}
        <div className="row" style={{ marginTop: -7 }}>
          <p>Equipment available (Optional)</p>

          <details
            style={{
              border: "1px solid #d1d5db",
              borderRadius: 6,
              padding: 8,
              background: "#fff",
              width: "100%",
              marginTop: 6,
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
                  name="equipment_available"
                  value="chair"
                />
                <span>Chair</span>
              </label>

              <label className="checkItem">
                <input
                  type="checkbox"
                  name="equipment_available"
                  value="resistance_band"
                />
                <span>Resistance band</span>
              </label>

              <label className="checkItem">
                <input
                  type="checkbox"
                  name="equipment_available"
                  value="balance_aids_wall"
                />
                <span>Balance aids / Wall</span>
              </label>

              <label className="checkItem">
                <input
                  type="checkbox"
                  name="equipment_available"
                  value="yoga_mat"
                />
                <span>Yoga mat</span>
              </label>

              <label className="checkItem">
                <input
                  type="checkbox"
                  name="equipment_available"
                  value="light_dumbbells"
                />
                <span>Light dumbbells</span>
              </label>

              <label className="checkItem">
                <input
                  type="checkbox"
                  name="equipment_available"
                  value="stationary_bike"
                />
                <span>Stationary bike</span>
              </label>

              <label className="checkItem">
                <input
                  type="checkbox"
                  name="equipment_available"
                  value="step_stool"
                />
                <span>Step stool</span>
              </label>
            </div>
          </details>
        </div>
      </div>

      {/* Support person available */}
      <div className="row">
        <p>
          Is a support person available during sessions?{" "}
          <span style={{ color: "red" }}>*</span>
        </p>
        <div className="inline" style={{ marginTop: 4 }}>
          <label>
            <input
              type="radio"
              required
              name="support_person_available"
              value="yes"
              checked={hasSupport === "yes"}
              onChange={() => setHasSupport("yes")}
            />{" "}
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="support_person_available"
              value="no"
              checked={hasSupport === "no"}
              onChange={() => setHasSupport("no")}
            />{" "}
            No
          </label>
        </div>

        {hasSupport === "yes" && (
          <div style={{ marginTop: 8 }}>
            <p>Support person details</p>
            <input
              type="text"
              name="support_person_details"
              placeholder="Describe who they are and how they can assist you..."
              style={{
                border: "1px solid #cbd5e1",
                borderRadius: 6,
                padding: "8px 10px",
                width: "100%",
              }}
            />
          </div>
        )}

        {/* If NO or not selected, ensure empty details to avoid stale posts */}
        {hasSupport !== "yes" && (
          <input type="hidden" name="support_person_details" value="" />
        )}
      </div>
    </section>
  );
}
``;
