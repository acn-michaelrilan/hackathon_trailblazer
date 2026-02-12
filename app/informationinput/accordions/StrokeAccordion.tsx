// app/informationinput/accordions/StrokeAccordion.tsx
"use client";

import { useState } from "react";
import MedicalSafetyRiskFlags from "../MedicalSafetyRiskFlags";
import CurrentActivityLevel from "../CurrentActivityLevel";
import ExercisePreferencesTolerance from "../ExercisePreferencesTolerance";
import ExerciseEnvironment from "../ExerciseEnvironment";
import AdditionalInformation from "../AdditionalInformation";

type ConditionKey =
  | "stroke"
  | "neurological_condition"
  | "post_surgery"
  | "arthritis_joint_pain"
  | "cardiovascular_condition"
  | "other";

export default function StrokeAccordion() {
  const [selectedConditions, setSelectedConditions] = useState<
    Record<ConditionKey, boolean>
  >({
    stroke: false,
    neurological_condition: false,
    post_surgery: false,
    arthritis_joint_pain: false,
    cardiovascular_condition: false,
    other: false,
  });

  const toggleCondition = (key: ConditionKey) =>
    setSelectedConditions((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <details className="acc" data-acc="stroke">
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
          <strong>Stroke recovery / neurological condition</strong>, please
          answer the following:
        </p>

        {/* Risk Level */}
        <div style={{ marginTop: 12 }}>
          <label style={{ whiteSpace: "nowrap", fontWeight: 600 }}>
            Risk Level
          </label>
          <div className="choice-row">
            <div style={{ position: "relative" }}>
              <input
                className="vh"
                type="radio"
                id="risk_low_stroke"
                name="risk_level"
                value="low"
              />
              <label className="pill" htmlFor="risk_low_stroke">
                Low
              </label>
            </div>
            <div style={{ position: "relative" }}>
              <input
                className="vh"
                type="radio"
                id="risk_medium_stroke"
                name="risk_level"
                value="medium"
              />
              <label className="pill" htmlFor="risk_medium_stroke">
                Medium
              </label>
            </div>
            <div style={{ position: "relative" }}>
              <input
                className="vh"
                type="radio"
                id="risk_high_stroke"
                name="risk_level"
                value="high"
              />
              <label className="pill" htmlFor="risk_high_stroke">
                High
              </label>
            </div>
          </div>
        </div>

        {/* Medical Profile */}
        <section className="modal-section">
          <h3 style={{ color: "#1f3fae", marginTop: 12, marginBottom: 6 }}>
            Medical Profile
          </h3>

          <p>Primary Medical Condition</p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 12,
              marginTop: 8,
            }}
          >
            {/* STROKE */}
            <div>
              <label>
                <input
                  type="checkbox"
                  name="medical_condition_stroke"
                  checked={selectedConditions.stroke}
                  onChange={() => toggleCondition("stroke")}
                />{" "}
                Stroke Recovery
              </label>

              {selectedConditions.stroke && (
                <div style={{ marginTop: 8 }}>
                  <p style={{ fontWeight: "bold" }}>Subtype</p>
                  <select
                    name="stroke_subtype"
                    style={{ width: "100%", padding: 6 }}
                  >
                    <option value="">Select</option>
                    <option value="ischemic">Ischemic Stroke</option>
                    <option value="hemorrhagic">Hemorrhagic Stroke</option>
                    <option value="transient_ischemic_attack">
                      Transient Ischemic Attack
                    </option>
                    <option value="lacunar">Lacunar Stroke</option>
                    <option value="subarachnoid_hemorrhage">
                      Subarachnoid Hemorrhage
                    </option>
                  </select>

                  <p style={{ marginTop: 8, fontWeight: "bold" }}>
                    Date of Diagnosis
                  </p>
                  <input
                    type="date"
                    name="stroke_date"
                    style={{ width: "100%", padding: 6 }}
                  />

                  <p style={{ marginTop: 8, fontWeight: "bold" }}>
                    Affected Side
                  </p>
                  <select
                    name="stroke_side"
                    style={{ width: "100%", padding: 6 }}
                  >
                    <option value="">Select</option>
                    <option value="left">Left</option>
                    <option value="right">Right</option>
                    <option value="bilateral">Bilateral</option>
                    <option value="none">None</option>
                  </select>

                  <p style={{ marginTop: 8, fontWeight: "bold" }}>Severity</p>
                  <select
                    name="stroke_severity"
                    style={{ width: "100%", padding: 6 }}
                  >
                    <option value="">Select</option>
                    <option value="mild">Mild</option>
                    <option value="moderate">Moderate</option>
                    <option value="severe">Severe</option>
                  </select>
                </div>
              )}
            </div>

            {/* NEUROLOGICAL */}
            <div>
              <label>
                <input
                  type="checkbox"
                  name="medical_condition_neurological_condition"
                  checked={selectedConditions.neurological_condition}
                  onChange={() => toggleCondition("neurological_condition")}
                />{" "}
                Neurological Condition
              </label>

              {selectedConditions.neurological_condition && (
                <div style={{ marginTop: 8 }}>
                  <p style={{ fontWeight: "bold" }}>Subtype</p>
                  <select
                    name="neurological_condition_subtype"
                    style={{ width: "100%", padding: 6 }}
                  >
                    <option value="">Select</option>
                    <option value="parkinsons_disease">
                      Parkinson's Disease
                    </option>
                    <option value="multiple_sclerosis">
                      Multiple Sclerosis
                    </option>
                    <option value="alzheimers_disease">
                      Alzheimer's Disease
                    </option>
                    <option value="epilepsy">Epilepsy</option>
                    <option value="amyotropic_lateral_sclerosis">
                      Amyotrophic Lateral Sclerosis
                    </option>
                  </select>

                  <p style={{ marginTop: 8, fontWeight: "bold" }}>
                    Date of Diagnosis
                  </p>
                  <input
                    type="date"
                    name="neurological_condition_date"
                    style={{ width: "100%", padding: 6 }}
                  />

                  <p style={{ marginTop: 8, fontWeight: "bold" }}>
                    Affected Side
                  </p>
                  <select
                    name="neurological_condition_side"
                    style={{ width: "100%", padding: 6 }}
                  >
                    <option value="">Select</option>
                    <option value="left">Left</option>
                    <option value="right">Right</option>
                    <option value="bilateral">Bilateral</option>
                    <option value="none">None</option>
                  </select>

                  <p style={{ marginTop: 8, fontWeight: "bold" }}>Severity</p>
                  <select
                    name="neurological_condition_severity"
                    style={{ width: "100%", padding: 6 }}
                  >
                    <option value="">Select</option>
                    <option value="mild">Mild</option>
                    <option value="moderate">Moderate</option>
                    <option value="severe">Severe</option>
                  </select>
                </div>
              )}
            </div>

            {/* POST SURGERY */}
            <div>
              <label>
                <input
                  type="checkbox"
                  name="medical_condition_post_surgery"
                  checked={selectedConditions.post_surgery}
                  onChange={() => toggleCondition("post_surgery")}
                />{" "}
                Post-Surgery
              </label>

              {selectedConditions.post_surgery && (
                <div style={{ marginTop: 8 }}>
                  <p style={{ fontWeight: "bold" }}>Subtype</p>
                  <select
                    name="post_surgery_subtype"
                    style={{ width: "100%", padding: 6 }}
                  >
                    <option value="">Select</option>
                    <option value="orthopedic_surgery">
                      Orthopedic Surgery
                    </option>
                    <option value="cardiac_surgery">Cardiac Surgery</option>
                    <option value="neurosurgery">Neurological Surgery</option>
                    <option value="abdominal_surgery">Abdominal Surgery</option>
                    <option value="tumor_removal_surgery">
                      Cancer/Tumor Removal Surgery
                    </option>
                  </select>

                  <p style={{ marginTop: 8, fontWeight: "bold" }}>
                    Date of Diagnosis
                  </p>
                  <input
                    type="date"
                    name="post_surgery_date"
                    style={{ width: "100%", padding: 6 }}
                  />

                  <p style={{ marginTop: 8, fontWeight: "bold" }}>
                    Affected Side
                  </p>
                  <select
                    name="post_surgery_side"
                    style={{ width: "100%", padding: 6 }}
                  >
                    <option value="">Select</option>
                    <option value="left">Left</option>
                    <option value="right">Right</option>
                    <option value="bilateral">Bilateral</option>
                    <option value="none">None</option>
                  </select>

                  <p style={{ marginTop: 8, fontWeight: "bold" }}>Severity</p>
                  <select
                    name="post_surgery_severity"
                    style={{ width: "100%", padding: 6 }}
                  >
                    <option value="">Select</option>
                    <option value="mild">Mild</option>
                    <option value="moderate">Moderate</option>
                    <option value="severe">Severe</option>
                  </select>
                </div>
              )}
            </div>

            {/* ARTHRITIS */}
            <div>
              <label>
                <input
                  type="checkbox"
                  name="medical_condition_arthritis_joint_pain"
                  checked={selectedConditions.arthritis_joint_pain}
                  onChange={() => toggleCondition("arthritis_joint_pain")}
                />{" "}
                Arthritis / Joint Pain
              </label>

              {selectedConditions.arthritis_joint_pain && (
                <div style={{ marginTop: 8 }}>
                  <p style={{ fontWeight: "bold" }}>Subtype</p>
                  <select
                    name="arthritis_joint_pain_subtype"
                    style={{ width: "100%", padding: 6 }}
                  >
                    <option value="">Select</option>
                    <option value="osteoarthritis">Osteoarthritis</option>
                    <option value="rheumatoid_arthtritis">
                      Rheumatoid Arthritis
                    </option>
                    <option value="psoriatic_arthritis">
                      Psoriatic Arthritis
                    </option>
                    <option value="gout">Gout</option>
                    <option value="ankylosing_spondylitis">
                      Ankylosing Spondylitis
                    </option>
                  </select>

                  <p style={{ marginTop: 8, fontWeight: "bold" }}>
                    Date of Diagnosis
                  </p>
                  <input
                    type="date"
                    name="arthritis_joint_pain_date"
                    style={{ width: "100%", padding: 6 }}
                  />

                  <p style={{ marginTop: 8, fontWeight: "bold" }}>
                    Affected Side
                  </p>
                  <select
                    name="arthritis_joint_pain_side"
                    style={{ width: "100%", padding: 6 }}
                  >
                    <option value="">Select</option>
                    <option value="left">Left</option>
                    <option value="right">Right</option>
                    <option value="bilateral">Bilateral</option>
                    <option value="none">None</option>
                  </select>

                  <p style={{ marginTop: 8, fontWeight: "bold" }}>Severity</p>
                  <select
                    name="arthritis_joint_pain_severity"
                    style={{ width: "100%", padding: 6 }}
                  >
                    <option value="">Select</option>
                    <option value="mild">Mild</option>
                    <option value="moderate">Moderate</option>
                    <option value="severe">Severe</option>
                  </select>
                </div>
              )}
            </div>

            {/* CARDIOVASCULAR */}
            <div>
              <label>
                <input
                  type="checkbox"
                  name="medical_condition_cardiovascular_condition"
                  checked={selectedConditions.cardiovascular_condition}
                  onChange={() => toggleCondition("cardiovascular_condition")}
                />{" "}
                Cardiovascular Condition
              </label>

              {selectedConditions.cardiovascular_condition && (
                <div style={{ marginTop: 8 }}>
                  <p style={{ fontWeight: "bold" }}>Subtype</p>
                  <select
                    name="cardiovascular_condition_subtype"
                    style={{ width: "100%", padding: 6 }}
                  >
                    <option value="">Select</option>
                    <option value="coronary_artery_disease">
                      Coronary Artery Disease
                    </option>
                    <option value="heart_failure">Heart Failure</option>
                    <option value="hypertension">Hypertension</option>
                    <option value="atrial_fibrillation">
                      Atrial Fibrillation
                    </option>
                    <option value="peripheral_artery_disease">
                      Peripheral Artery Disease
                    </option>
                  </select>

                  <p style={{ marginTop: 8, fontWeight: "bold" }}>
                    Date of Diagnosis
                  </p>
                  <input
                    type="date"
                    name="cardiovascular_condition_date"
                    style={{ width: "100%", padding: 6 }}
                  />

                  <p style={{ marginTop: 8, fontWeight: "bold" }}>
                    Affected Side
                  </p>
                  <select
                    name="cardiovascular_condition_side"
                    style={{ width: "100%", padding: 6 }}
                  >
                    <option value="">Select</option>
                    <option value="left">Left</option>
                    <option value="right">Right</option>
                    <option value="bilateral">Bilateral</option>
                    <option value="none">None</option>
                  </select>

                  <p style={{ marginTop: 8, fontWeight: "bold" }}>Severity</p>
                  <select
                    name="cardiovascular_condition_severity"
                    style={{ width: "100%", padding: 6 }}
                  >
                    <option value="">Select</option>
                    <option value="mild">Mild</option>
                    <option value="moderate">Moderate</option>
                    <option value="severe">Severe</option>
                  </select>
                </div>
              )}
            </div>

            {/* OTHER */}
            <div style={{ whiteSpace: "nowrap" }}>
              <label>
                <input
                  type="checkbox"
                  name="medical_condition_other"
                  checked={selectedConditions.other}
                  onChange={() => toggleCondition("other")}
                />{" "}
                Other:
              </label>
              <input
                type="text"
                name="other_condition_name"
                placeholder="Please specify"
                style={{ marginLeft: 4 }}
              />

              {selectedConditions.other && (
                <div style={{ marginTop: 8 }}>
                  <p style={{ fontWeight: "bold" }}>Subtype</p>
                  <select
                    name="other_subtype"
                    style={{ width: "100%", padding: 6 }}
                  >
                    <option value="">Select</option>
                    <option value="degenerative">Degenerative</option>
                    <option value="injury_related">Injury-related</option>
                    <option value="post_operative">
                      Post-operative Complication
                    </option>
                    <option value="none_specific">None-specific</option>
                  </select>

                  <p style={{ marginTop: 8, fontWeight: "bold" }}>
                    Date of Diagnosis
                  </p>
                  <input
                    type="date"
                    name="other_date"
                    style={{ width: "100%", padding: 6 }}
                  />

                  <p style={{ marginTop: 8, fontWeight: "bold" }}>
                    Affected Side
                  </p>
                  <select
                    name="other_side"
                    style={{ width: "100%", padding: 6 }}
                  >
                    <option value="">Select</option>
                    <option value="left">Left</option>
                    <option value="right">Right</option>
                    <option value="bilateral">Bilateral</option>
                    <option value="none">None</option>
                  </select>

                  <p style={{ marginTop: 8, fontWeight: "bold" }}>Severity</p>
                  <select
                    name="other_severity"
                    style={{ width: "100%", padding: 6 }}
                  >
                    <option value="">Select</option>
                    <option value="mild">Mild</option>
                    <option value="moderate">Moderate</option>
                    <option value="severe">Severe</option>
                  </select>
                </div>
              )}
            </div>
          </div>
        </section>

        <hr style={{ margin: "16px 0" }} />

        {/* Functional Ability + the rest (unchanged) */}
        <section className="modal-section">
          <h3 style={{ color: "#1f3fae" }}>Functional Ability</h3>

          <p>Current Mobility Level</p>
          <label>
            <input type="radio" name="mobility_level" value="seated_only" />{" "}
            Seated only
          </label>
          <label style={{ marginLeft: 12 }}>
            <input
              type="radio"
              name="mobility_level"
              value="assisted_standing"
            />{" "}
            Assisted standing
          </label>
          <label style={{ marginLeft: 12 }}>
            <input
              type="radio"
              name="mobility_level"
              value="independent_standing"
            />{" "}
            Independent standing
          </label>

          <p style={{ marginTop: 16 }}>Walking Ability</p>
          <label>
            <input type="radio" name="walking_ability" value="cannot_walk" />{" "}
            Cannot walk
          </label>
          <label style={{ marginLeft: 12 }}>
            <input
              type="radio"
              name="walking_ability"
              value="with_cane_walker"
            />{" "}
            With cane / walker
          </label>
          <label style={{ marginLeft: 12 }}>
            <input type="radio" name="walking_ability" value="independent" />{" "}
            Independent
          </label>

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

          <p style={{ marginTop: 16 }}>Assistive Device</p>
          <select name="assistive_device" style={{ padding: 6 }}>
            <option value="">Select</option>
            <option value="none">None</option>
            <option value="cane">Cane</option>
            <option value="walker">Walker</option>
            <option value="crutches">Crutches</option>
            <option value="wheelchair">Wheelchair</option>
          </select>

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
        </section>

        <hr style={{ margin: "16px 0" }} />

        <MedicalSafetyRiskFlags />
        <hr style={{ margin: "16px 0" }} />
        <CurrentActivityLevel />

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
          data-acc="stroke"
        >
          Done
        </button>
      </div>
    </details>
  );
}
