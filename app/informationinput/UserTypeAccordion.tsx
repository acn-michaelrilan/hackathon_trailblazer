// app/informationinput/UserTypeAccordion.tsx
"use client";

import StrokeAccordion from "./accordions/StrokeAccordion";
import GeneralFitnessAccordion from "./accordions/GeneralFitnessAccordion";

export default function UserTypeAccordion() {
  const usrClass = "usr-wrap";

  return (
    <section
      className={usrClass}
      style={{ marginTop: 24 }}
      data-acc-collapsed="true"
    >
      <h2 style={{ color: "#1f3fae" }}>User Type and Risk Level</h2>

      {/* Pills */}
      <div style={{ marginTop: 8, marginBottom: 6 }} />
      <div className="choice-grid">
        {/* Stroke */}
        <div style={{ position: "relative", marginBottom: 12 }}>
          <input
            className="vh"
            type="radio"
            id="stroke_recovery_neurological"
            name="user_category"
            value="stroke_recovery_neurological"
          />
          <label className="pill" htmlFor="stroke_recovery_neurological">
            Stroke recovery / neurological condition
          </label>
        </div>

        {/* General */}
        <div style={{ position: "relative" }}>
          <input
            className="vh"
            type="radio"
            id="general_fitness"
            name="user_category"
            value="general_fitness_active_lifestyle"
          />
          <label className="pill" htmlFor="general_fitness">
            General fitness &amp; active lifestyle
          </label>
        </div>
      </div>

      {/* Two independent accordions (only one is visible at a time via CSS) */}
      <StrokeAccordion />
      <GeneralFitnessAccordion />
    </section>
  );
}
