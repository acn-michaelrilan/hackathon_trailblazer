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
  `;

  // '', 'yes', or 'no' — start with no selection
  const [hasSupport, setHasSupport] = useState<"" | "yes" | "no">("");

  return (
    <section className={`modal-section ${sectionClass}`}>
      <style>{styles}</style>

      <h3 style={{ color: "#1f3fae" }}>Exercise Environment</h3>

      {/* Location */}
      <div className="row">
        <p>Location</p>
        <select
          name="location"
          defaultValue=""
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

      {/* Equipment available (array via repeated name) */}
      <div className="row">
        <p>Equipment available</p>
        <div className="grid grid-2" style={{ marginTop: 6 }}>
          <label>
            <input type="checkbox" name="equipment_available" value="chair" />{" "}
            Chair
          </label>
          <label>
            <input
              type="checkbox"
              name="equipment_available"
              value="resistance_band"
            />{" "}
            Resistance band
          </label>
          <label>
            <input
              type="checkbox"
              name="equipment_available"
              value="balance_aids_wall"
            />{" "}
            Balance aids / Wall
          </label>
          {/* Suggested additional options */}
          <label>
            <input
              type="checkbox"
              name="equipment_available"
              value="yoga_mat"
            />{" "}
            Yoga mat
          </label>
          <label>
            <input
              type="checkbox"
              name="equipment_available"
              value="light_dumbbells"
            />{" "}
            Light dumbbells
          </label>
          <label>
            <input
              type="checkbox"
              name="equipment_available"
              value="stationary_bike"
            />{" "}
            Stationary bike
          </label>
          <label>
            <input
              type="checkbox"
              name="equipment_available"
              value="step_stool"
            />{" "}
            Step stool
          </label>
        </div>
      </div>

      {/* Support person available */}
      <div className="row">
        <p>Is a support person available during sessions?</p>
        <div className="inline" style={{ marginTop: 4 }}>
          <label>
            <input
              type="radio"
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
              placeholder="e.g., spouse available during exercise sessions"
              style={{ width: "100%" }}
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
