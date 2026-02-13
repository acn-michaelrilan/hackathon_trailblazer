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

        <h3 style={{ color: "#1f3fae" }}>Functional Ability</h3>

        {/* Current Mobility Level */}
        <p style={{ marginTop: 8, marginBottom: 4 }}>Current Mobility Level</p>
        <section className="modal-section">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 8,
            }}
          >
            <label
              style={{
                display: "grid",
                gridTemplateColumns: "20px 1fr",
                columnGap: 10,
                alignItems: "start",
              }}
            >
              <input
                type="radio"
                name="mobility_level"
                value="fully_independent"
              />
              <span>Fully Independent</span>
            </label>

            <label
              style={{
                display: "grid",
                gridTemplateColumns: "20px 1fr",
                columnGap: 10,
                alignItems: "start",
              }}
            >
              <input
                type="radio"
                name="mobility_level"
                value="independent_with_mild_difficulty"
              />
              <span>Independent with mild difficulty</span>
            </label>

            <label
              style={{
                display: "grid",
                gridTemplateColumns: "20px 1fr",
                columnGap: 10,
                alignItems: "start",
              }}
            >
              <input
                type="radio"
                name="mobility_level"
                value="requires_assistive_device"
              />
              <span>Requires assistive device (e.g., cane, walker)</span>
            </label>

            <label
              style={{
                display: "grid",
                gridTemplateColumns: "20px 1fr",
                columnGap: 10,
                alignItems: "start",
              }}
            >
              <input
                type="radio"
                name="mobility_level"
                value="requires_physical_assistance"
              />
              <span>Requires physical assistance from another person</span>
            </label>

            <label
              style={{
                display: "grid",
                gridTemplateColumns: "20px 1fr",
                columnGap: 10,
                alignItems: "start",
              }}
            >
              <input
                type="radio"
                name="mobility_level"
                value="limited_seated_or_bed_bound"
              />
              <span>Limited mobility (primarily seated or bed‑bound)</span>
            </label>
          </div>

          {/* Walking Ability */}
          <p style={{ marginTop: 16, marginBottom: 4 }}>Walking Ability</p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 8,
            }}
          >
            <label
              style={{
                display: "grid",
                gridTemplateColumns: "20px 1fr",
                columnGap: 10,
                alignItems: "start",
              }}
            >
              <input
                type="radio"
                name="walking_ability"
                value="independent_without_limitations"
              />
              <span>Walks independently without limitations</span>
            </label>

            <label
              style={{
                display: "grid",
                gridTemplateColumns: "20px 1fr",
                columnGap: 10,
                alignItems: "start",
              }}
            >
              <input
                type="radio"
                name="walking_ability"
                value="independent_with_discomfort"
              />
              <span>Walks independently but with occasional discomfort</span>
            </label>

            <label
              style={{
                display: "grid",
                gridTemplateColumns: "20px 1fr",
                columnGap: 10,
                alignItems: "start",
              }}
            >
              <input
                type="radio"
                name="walking_ability"
                value="short_distance_walks_only"
              />
              <span>Short‑distance walking only</span>
            </label>

            <label
              style={{
                display: "grid",
                gridTemplateColumns: "20px 1fr",
                columnGap: 10,
                alignItems: "start",
              }}
            >
              <input
                type="radio"
                name="walking_ability"
                value="walks_with_assistive_device"
              />
              <span>Walks with assistive device</span>
            </label>

            <label
              style={{
                display: "grid",
                gridTemplateColumns: "20px 1fr",
                columnGap: 10,
                alignItems: "start",
              }}
            >
              <input
                type="radio"
                name="walking_ability"
                value="unable_to_walk"
              />
              <span>Unable to walk</span>
            </label>
          </div>

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
