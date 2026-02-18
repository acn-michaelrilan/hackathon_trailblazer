// app/informationinput/accordions/GeneralFitnessAccordion.tsx
"use client";

import { useRef, useState } from "react";
import MedicalSafetyRiskFlags from "../MedicalSafetyRiskFlags";
import GeneralCurrentActivityLevel from "../GeneralCurrentActivityLevel";
import ExercisePreferencesTolerance from "../ExercisePreferencesTolerance";
import ExerciseEnvironment from "../ExerciseEnvironment";
import AdditionalInformation from "../AdditionalInformation";

type FieldErrors = Record<string, string>;

export default function GeneralFitnessAccordion() {
  const detailsRef = useRef<HTMLDetailsElement | null>(null);

  const [riskError, setRiskError] = useState<string>("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  // Helper to render consistent inline errors (same style as StrokeAccordion)
  const FieldError = ({ name }: { name: string }) => {
    const msg = fieldErrors[name];
    if (!msg) return null;
    return (
      <p style={{ color: "crimson", marginTop: 6, fontWeight: 600 }}>{msg}</p>
    );
  };

  // Clear errors as user edits fields
  const onPanelChange = (e: React.ChangeEvent<HTMLDivElement>) => {
    const target = e.target as
      | HTMLInputElement
      | HTMLSelectElement
      | HTMLTextAreaElement;
    if (!target?.name) return;

    if (target.name === "risk_level") setRiskError("");

    setFieldErrors((prev) => {
      if (!prev[target.name]) return prev;
      const next = { ...prev };
      delete next[target.name];
      return next;
    });
  };

  const getFieldValue = (name: string) => {
    const root = detailsRef.current;
    if (!root) return "";
    const el = root.querySelector<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >(`[name="${name}"]`);
    if (!el) return "";
    return (el as HTMLInputElement).value ?? "";
  };

  const validateAndSetErrors = () => {
    const nextFieldErrors: FieldErrors = {};

    const root = detailsRef.current;

    // 1) Risk level required
    const riskChecked = root?.querySelector<HTMLInputElement>(
      'input[type="radio"][name="risk_level"]:checked',
    );
    if (!riskChecked) setRiskError("Risk Level is required.");
    else setRiskError("");

    setFieldErrors(nextFieldErrors);

    const hasErrors = !riskChecked || Object.keys(nextFieldErrors).length > 0;

    if (hasErrors) {
      // Scroll to first error for better UX
      const firstName =
        (!riskChecked && "risk_level") || Object.keys(nextFieldErrors)[0];

      if (firstName === "risk_level") {
        root?.querySelector(".choice-row")?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      } else if (firstName) {
        root?.querySelector(`[name="${firstName}"]`)?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }

    return !hasErrors;
  };

  return (
    <details ref={detailsRef} className="acc" data-acc="general">
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

      <div className="acc-panel" onChange={onPanelChange}>
        <p>
          Since you selected{" "}
          <strong>General fitness &amp; active lifestyle</strong>, please answer
          the following:
        </p>

        {/* Risk Level */}
        <div style={{ marginTop: 12 }}>
          <label style={{ whiteSpace: "nowrap", fontWeight: 600 }}>
            Risk Level <span style={{ color: "red" }}>*</span>
          </label>

          {riskError && (
            <p style={{ color: "crimson", marginTop: 6, fontWeight: 600 }}>
              {riskError}
            </p>
          )}

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

        {/* Medical / Wellness Profile (optional) */}
        <section className="modal-section">
          <h3 style={{ color: "#1f3fae", marginTop: 12, marginBottom: 6 }}>
            Medical / Wellness Profile
          </h3>

          <p>Relevant health background (optional)</p>

          <div style={{ marginTop: 8 }}>
            <label className="muted">
              Do you have any health conditions we should be aware of?
            </label>
          </div>

          {/* ✅ stays optional */}
          <textarea
            name="notes"
            rows={2}
            style={{ width: "100%", padding: 6 }}
          />
        </section>

        <hr style={{ margin: "16px 0" }} />

        <h3 style={{ color: "#1f3fae" }}>Functional Ability</h3>

        <section className="modal-section">
          {/* Row 1 */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 12,
              alignItems: "end",
              marginTop: 8,
            }}
          >
            <div>
              <p style={{ margin: 0, marginBottom: 6 }}>
                Current Mobility Level <span style={{ color: "red" }}>*</span>
              </p>
              <select
                name="mobility_level"
                required
                style={{ padding: 6, width: "100%" }}
                defaultValue=""
              >
                <option value="">Select</option>
                <option value="fully_independent">Fully Independent</option>
                <option value="independent_with_mild_difficulty">
                  Independent with mild difficulty
                </option>
                <option value="requires_assistive_device">
                  Requires assistive device (e.g., cane, walker)
                </option>
                <option value="requires_physical_assistance">
                  Requires physical assistance from another person
                </option>
                <option value="limited_seated_or_bed_bound">
                  Limited mobility (primarily seated or bed‑bound)
                </option>
              </select>
              <FieldError name="mobility_level" />
            </div>

            <div>
              <p style={{ margin: 0, marginBottom: 6 }}>
                Walking Ability <span style={{ color: "red" }}>*</span>
              </p>
              <select
                name="walking_ability"
                required
                style={{ padding: 6, width: "100%" }}
                defaultValue=""
              >
                <option value="">Select</option>
                <option value="independent_without_limitations">
                  Walks independently without limitations
                </option>
                <option value="independent_with_discomfort">
                  Walks independently but with occasional discomfort
                </option>
                <option value="short_distance_walks_only">
                  Short‑distance walking only
                </option>
                <option value="walks_with_assistive_device">
                  Walks with assistive device
                </option>
                <option value="unable_to_walk">Unable to walk</option>
              </select>
              <FieldError name="walking_ability" />
            </div>

            <div>
              <p style={{ margin: 0, marginBottom: 6 }}>
                Range of Motion <span style={{ color: "red" }}>*</span>
              </p>
              <select
                name="range_of_motion"
                required
                style={{ padding: 6, width: "100%" }}
                defaultValue=""
              >
                <option value="">Select</option>
                <option value="limited">Limited</option>
                <option value="moderate">Moderate</option>
                <option value="full_with_caution">Full (with caution)</option>
              </select>
              <FieldError name="range_of_motion" />
            </div>
          </div>

          {/* Row 2 */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 12,
              alignItems: "end",
              marginTop: 16,
            }}
          >
            <div>
              <p style={{ margin: 0, marginBottom: 6 }}>
                Upper Limb Function (Left){" "}
                <span style={{ color: "red" }}>*</span>
              </p>
              <select
                name="upper_limb_left"
                required
                style={{ padding: 6, width: "100%" }}
                defaultValue=""
              >
                <option value="">Select</option>
                <option value="normal">Normal</option>
                <option value="limited">Limited</option>
                <option value="impaired">Impaired</option>
              </select>
              <FieldError name="upper_limb_left" />
            </div>

            <div>
              <p style={{ margin: 0, marginBottom: 6 }}>
                Upper Limb Function (Right){" "}
                <span style={{ color: "red" }}>*</span>
              </p>
              <select
                name="upper_limb_right"
                required
                style={{ padding: 6, width: "100%" }}
                defaultValue=""
              >
                <option value="">Select</option>
                <option value="normal">Normal</option>
                <option value="limited">Limited</option>
                <option value="impaired">Impaired</option>
              </select>
              <FieldError name="upper_limb_right" />
            </div>
          </div>
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
          onClick={(e) => {
            const ok = validateAndSetErrors();
            if (!ok) {
              // Prevent controller from hiding UI
              e.preventDefault();
              e.stopPropagation();
            }
          }}
        >
          Done
        </button>
      </div>
    </details>
  );
}
