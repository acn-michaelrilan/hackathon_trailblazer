// app/informationinput/accordions/GeneralFitnessAccordion.tsx
"use client";

import MedicalSafetyRiskFlags from "../MedicalSafetyRiskFlags";
import GeneralCurrentActivityLevel from "../GeneralCurrentActivityLevel";
import ExercisePreferencesTolerance from "../ExercisePreferencesTolerance";
import ExerciseEnvironment from "../ExerciseEnvironment";
import AdditionalInformation from "../AdditionalInformation";

export default function GeneralFitnessAccordion() {
  return (
    <details className="acc" data-acc="general">
      <summary className="acc-summary">
        <span>Important Information</span>
        <svg
          className="chev"
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M12 15.5 6.5 10l1.4-1.4L12 12.7l4.1-4.1L17.5 10z"></path>
        </svg>
      </summary>

      <div className="acc-panel">
        <p>
          Since you selected{" "}
          <strong>General fitness &amp; active lifestyle</strong>, please answer
          the following:
        </p>

        {/* Risk Level (shared name so backend can keep using formData.get("risk_level")) */}
        <div style={{ marginTop: 12 }}>
          <label style={{ whiteSpace: "nowrap", fontWeight: 600 }}>
            Risk Level
          </label>
          <div className="choice-row">
            <div style={{ position: "relative" }}>
              <input
                className="vh"
                type="radio"
                id="risk_low_general"
                name="risk_level"
                value="low"
              />
              <label className="pill" htmlFor="risk_low_general">
                Low
              </label>
            </div>
            <div style={{ position: "relative" }}>
              <input
                className="vh"
                type="radio"
                id="risk_medium_general"
                name="risk_level"
                value="medium"
              />
              <label className="pill" htmlFor="risk_medium_general">
                Medium
              </label>
            </div>
            <div style={{ position: "relative" }}>
              <input
                className="vh"
                type="radio"
                id="risk_high_general"
                name="risk_level"
                value="high"
              />
              <label className="pill" htmlFor="risk_high_general">
                High
              </label>
            </div>
          </div>
        </div>

        {/* Medical Profile (you can tailor options for general users here) */}
        <section className="modal-section">
          <h3 style={{ color: "#1f3fae", marginTop: 12, marginBottom: 6 }}>
            Medical / Wellness Profile
          </h3>

          <p>Relevant health background (optional)</p>

          {/* For now, reusing the same fields so your save() works without changes.
              Later, you can replace these with general-only fields and adjust save() accordingly. */}
          <div style={{ marginTop: 8 }}>
            <label className="muted">
              Do you have any health conditions we should be aware of?
            </label>
          </div>

          <textarea
            name="notes"
            rows={2}
            style={{ width: "100%", padding: 6 }}
          />
        </section>

        <hr style={{ margin: "16px 0" }} />

        {/* Reuse the same sections */}
        <section className="modal-section">
          <h3 style={{ color: "#1f3fae" }}>Functional Ability</h3>

          <p>Current Mobility Level</p>
          <label>
            <input
              type="radio"
              name="mobility_level"
              value="fully_independent"
            />{" "}
            Fully Independent
          </label>
          <label style={{ marginLeft: 12 }}>
            <input
              type="radio"
              name="mobility_level"
              value="independent_with_mild_difficulty"
            />{" "}
            Independent with mild difficulty
          </label>
          <label style={{ marginLeft: 12 }}>
            <input
              type="radio"
              name="mobility_level"
              value="requires_assistive_device"
            />{" "}
            Requires assistive device (e.g., cane, walker)
          </label>
          <label style={{ marginLeft: 12 }}>
            <input
              type="radio"
              name="mobility_level"
              value="requires_physical_assistance"
            />{" "}
            Requires physical assistance from another person
          </label>
          <label style={{ marginLeft: 12 }}>
            <input
              type="radio"
              name="mobility_level"
              value="limited_seated_or_bed_bound"
            />{" "}
            Limited mobility (primarily seated or bed‑bound)
          </label>

          <p style={{ marginTop: 16 }}>Walking Ability</p>
          <label>
            <input
              type="radio"
              name="walking_ability"
              value="independent_without_limitations"
            />{" "}
            Walks independently without limitations
          </label>
          <label style={{ marginLeft: 12 }}>
            <input
              type="radio"
              name="walking_ability"
              value="independent_with_discomfort"
            />{" "}
            Walks independently but with occasional discomfort
          </label>
          <label style={{ marginLeft: 12 }}>
            <input
              type="radio"
              name="walking_ability"
              value="short_distance_walks_only"
            />{" "}
            Short‑distance walking only
          </label>
          <label style={{ marginLeft: 12 }}>
            <input
              type="radio"
              name="walking_ability"
              value="walks_with_assistive_device"
            />{" "}
            Walks with assistive device
          </label>
          <label style={{ marginLeft: 12 }}>
            <input type="radio" name="walking_ability" value="unable_to_walk" />{" "}
            Unable to walk
          </label>

          <p style={{ marginTop: 16 }}>Upper Limb Function (Left)</p>
          <select name="upper_limb_left" style={{ padding: 6 }}>
            <option value="">Select</option>
            <option value="normal">Normal</option>
            <option value="limited">Limited</option>
            <option value="impaired">Impaired</option>
          </select>

          <p style={{ marginTop: 12 }}>Upper Limb Function (Right)</p>
          <select name="upper_limb_right" style={{ padding: 6 }}>
            <option value="">Select</option>
            <option value="normal">Normal</option>
            <option value="limited">Limited</option>
            <option value="impaired">Impaired</option>
          </select>

          <p style={{ marginTop: 16 }}>Range of Motion</p>
          <label>
            <input type="radio" name="range_of_motion" value="limited" />{" "}
            Limited
          </label>
          <label style={{ marginLeft: 12 }}>
            <input type="radio" name="range_of_motion" value="moderate" />{" "}
            Moderate
          </label>
          <label style={{ marginLeft: 12 }}>
            <input
              type="radio"
              name="range_of_motion"
              value="full_with_caution"
            />{" "}
            Full (with caution)
          </label>
        </section>

        <hr style={{ margin: "16px 0" }} />

        <MedicalSafetyRiskFlags />
        <hr style={{ margin: "16px 0" }} />
        <GeneralCurrentActivityLevel />

        <hr style={{ margin: "16px 0" }} />
        <ExercisePreferencesTolerance />

        <hr style={{ margin: "16px 0" }} />
        <ExerciseEnvironment />

        <hr style={{ margin: "16px 0" }} />
        <AdditionalInformation />
      </div>

      <div className="acc-footer">
        <button
          type="button"
          className="btn btn-primary"
          data-acc-done
          data-acc="general"
        >
          Done
        </button>
      </div>
    </details>
  );
}
