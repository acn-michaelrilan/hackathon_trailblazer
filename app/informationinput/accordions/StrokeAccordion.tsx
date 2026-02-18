// app/informationinput/accordions/StrokeAccordion.tsx
"use client";

import { useMemo, useRef, useState } from "react";
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

type FieldErrors = Record<string, string>;

export default function StrokeAccordion() {
  const detailsRef = useRef<HTMLDetailsElement | null>(null);

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

  // Existing message (group-level)
  const [conditionError, setConditionError] = useState<string>("");

  // NEW: risk inline error
  const [riskError, setRiskError] = useState<string>("");

  // NEW: per-field errors (subtype/date/side/severity)
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  // other text (controlled)
  const [otherText, setOtherText] = useState<string>("");

  const hasAtLeastOneCondition = (conds: Record<ConditionKey, boolean>) =>
    Object.values(conds).some(Boolean);

  const toggleCondition = (key: ConditionKey) =>
    setSelectedConditions((prev) => {
      const next = { ...prev, [key]: !prev[key] };

      // Clear errors when toggling
      setConditionError("");
      setFieldErrors((fe) => {
        const copy = { ...fe };

        // If unchecking a condition, clear its dependent field errors
        const clearByPrefix = (prefix: string) => {
          Object.keys(copy).forEach((k) => {
            if (k.startsWith(prefix)) delete copy[k];
          });
        };

        if (key === "stroke" && prev.stroke) clearByPrefix("stroke_");
        if (key === "neurological_condition" && prev.neurological_condition)
          clearByPrefix("neurological_condition_");
        if (key === "post_surgery" && prev.post_surgery)
          clearByPrefix("post_surgery_");
        if (key === "arthritis_joint_pain" && prev.arthritis_joint_pain)
          clearByPrefix("arthritis_joint_pain_");
        if (key === "cardiovascular_condition" && prev.cardiovascular_condition)
          clearByPrefix("cardiovascular_condition_");
        if (key === "other" && prev.other) {
          clearByPrefix("other_");
          delete copy["other_condition_name"];
        }

        return copy;
      });

      // If unchecking other, clear text + error
      if (key === "other" && prev.other) {
        setOtherText("");
      }

      return next;
    });

  // Helper to render consistent inline errors
  const FieldError = ({ name }: { name: string }) => {
    const msg = fieldErrors[name];
    if (!msg) return null;
    return (
      <p style={{ color: "crimson", marginTop: 6, fontWeight: 600 }}>{msg}</p>
    );
  };

  // Clear errors as user edits fields (single handler for whole panel)
  const onPanelChange = (e: React.ChangeEvent<HTMLDivElement>) => {
    const target = e.target as
      | HTMLInputElement
      | HTMLSelectElement
      | HTMLTextAreaElement;
    if (!target?.name) return;

    // Clear risk error if they pick a risk level
    if (target.name === "risk_level") setRiskError("");

    // Clear a specific field error once user changes that field
    setFieldErrors((prev) => {
      if (!prev[target.name]) return prev;
      const next = { ...prev };
      delete next[target.name];
      return next;
    });

    // Clear group-level condition error if they checked any condition
    if (target.name.startsWith("medical_condition_")) {
      setConditionError("");
    }
  };

  // Map of required fields per condition
  const requiredByCondition = useMemo(() => {
    return {
      stroke: [
        { name: "stroke_subtype", msg: "Stroke subtype is required." },
        { name: "stroke_date", msg: "Stroke date of diagnosis is required." },
        { name: "stroke_side", msg: "Stroke affected side is required." },
        { name: "stroke_severity", msg: "Stroke severity is required." },
      ],
      neurological_condition: [
        {
          name: "neurological_condition_subtype",
          msg: "Neurological condition subtype is required.",
        },
        {
          name: "neurological_condition_date",
          msg: "Neurological condition date of diagnosis is required.",
        },
        {
          name: "neurological_condition_side",
          msg: "Neurological condition affected side is required.",
        },
        {
          name: "neurological_condition_severity",
          msg: "Neurological condition severity is required.",
        },
      ],
      post_surgery: [
        {
          name: "post_surgery_subtype",
          msg: "Post-surgery subtype is required.",
        },
        {
          name: "post_surgery_date",
          msg: "Post-surgery date of diagnosis is required.",
        },
        {
          name: "post_surgery_side",
          msg: "Post-surgery affected side is required.",
        },
        {
          name: "post_surgery_severity",
          msg: "Post-surgery severity is required.",
        },
      ],
      arthritis_joint_pain: [
        {
          name: "arthritis_joint_pain_subtype",
          msg: "Arthritis / Joint Pain subtype is required.",
        },
        {
          name: "arthritis_joint_pain_date",
          msg: "Arthritis / Joint Pain date of diagnosis is required.",
        },
        {
          name: "arthritis_joint_pain_side",
          msg: "Arthritis / Joint Pain affected side is required.",
        },
        {
          name: "arthritis_joint_pain_severity",
          msg: "Arthritis / Joint Pain severity is required.",
        },
      ],
      cardiovascular_condition: [
        {
          name: "cardiovascular_condition_subtype",
          msg: "Cardiovascular condition subtype is required.",
        },
        {
          name: "cardiovascular_condition_date",
          msg: "Cardiovascular condition date of diagnosis is required.",
        },
        {
          name: "cardiovascular_condition_side",
          msg: "Cardiovascular condition affected side is required.",
        },
        {
          name: "cardiovascular_condition_severity",
          msg: "Cardiovascular condition severity is required.",
        },
      ],
      other: [
        {
          name: "other_condition_name",
          msg: 'Please specify the "Other" condition.',
        },
        { name: "other_subtype", msg: "Other subtype is required." },
        { name: "other_date", msg: "Other date of diagnosis is required." },
        { name: "other_side", msg: "Other affected side is required." },
        { name: "other_severity", msg: "Other severity is required." },
      ],
    } satisfies Record<ConditionKey, { name: string; msg: string }[]>;
  }, []);

  // DOM helper: read field value by name (works for uncontrolled fields)
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

    // 1) Risk level required
    const root = detailsRef.current;
    const riskChecked = root?.querySelector<HTMLInputElement>(
      'input[type="radio"][name="risk_level"]:checked',
    );
    if (!riskChecked) {
      setRiskError("Risk Level is required.");
    } else {
      setRiskError("");
    }

    // 2) At least one condition required
    const hasOne = hasAtLeastOneCondition(selectedConditions);
    if (!hasOne) {
      setConditionError("Please select at least 1 Primary Medical Condition.");
    } else {
      setConditionError("");
    }

    // 3) For each selected condition, enforce its required fields
    (Object.keys(selectedConditions) as ConditionKey[]).forEach((key) => {
      if (!selectedConditions[key]) return;

      requiredByCondition[key].forEach(({ name, msg }) => {
        // special case: other_condition_name is controlled by otherText
        if (name === "other_condition_name") {
          if (!otherText.trim()) nextFieldErrors[name] = msg;
          return;
        }

        const val = getFieldValue(name);
        if (!val || val.trim() === "") nextFieldErrors[name] = msg;
      });
    });

    setFieldErrors(nextFieldErrors);

    const hasErrors =
      !riskChecked || !hasOne || Object.keys(nextFieldErrors).length > 0;

    if (hasErrors) {
      // scroll to first error field for better UX
      const firstName =
        (!riskChecked && "risk_level") ||
        (!hasOne && "medical_profile") ||
        Object.keys(nextFieldErrors)[0];

      if (firstName === "risk_level") {
        root?.querySelector(".choice-row")?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      } else if (firstName === "medical_profile") {
        root?.querySelector(".modal-section")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
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
    <details ref={detailsRef} className="acc" data-acc="stroke">
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

      {/* 👇 This onChange clears errors as user fixes things */}
      <div className="acc-panel" onChange={onPanelChange}>
        <p>
          Since you selected{" "}
          <strong>Stroke recovery / neurological condition</strong>, please
          answer the following:
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

          {conditionError && (
            <p style={{ color: "crimson", marginTop: 6, fontWeight: 600 }}>
              {conditionError}
            </p>
          )}

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
                    required={selectedConditions.stroke}
                    style={{ width: "100%", padding: 6 }}
                    defaultValue=""
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
                  <FieldError name="stroke_subtype" />

                  <p style={{ marginTop: 8, fontWeight: "bold" }}>
                    Date of Diagnosis
                  </p>
                  <input
                    type="date"
                    name="stroke_date"
                    required={selectedConditions.stroke}
                    style={{ width: "100%", padding: 6 }}
                  />
                  <FieldError name="stroke_date" />

                  <p style={{ marginTop: 8, fontWeight: "bold" }}>
                    Affected Side
                  </p>
                  <select
                    name="stroke_side"
                    required={selectedConditions.stroke}
                    style={{ width: "100%", padding: 6 }}
                    defaultValue=""
                  >
                    <option value="">Select</option>
                    <option value="left">Left</option>
                    <option value="right">Right</option>
                    <option value="bilateral">Bilateral</option>
                    <option value="none">None</option>
                  </select>
                  <FieldError name="stroke_side" />

                  <p style={{ marginTop: 8, fontWeight: "bold" }}>Severity</p>
                  <select
                    name="stroke_severity"
                    required={selectedConditions.stroke}
                    style={{ width: "100%", padding: 6 }}
                    defaultValue=""
                  >
                    <option value="">Select</option>
                    <option value="mild">Mild</option>
                    <option value="moderate">Moderate</option>
                    <option value="severe">Severe</option>
                  </select>
                  <FieldError name="stroke_severity" />
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
                    required={selectedConditions.neurological_condition}
                    style={{ width: "100%", padding: 6 }}
                    defaultValue=""
                  >
                    <option value="">Select</option>
                    <option value="parkinsons_disease">
                      Parkinson&apos;s Disease
                    </option>
                    <option value="multiple_sclerosis">
                      Multiple Sclerosis
                    </option>
                    <option value="alzheimers_disease">
                      Alzheimer&apos;s Disease
                    </option>
                    <option value="epilepsy">Epilepsy</option>
                    <option value="amyotropic_lateral_sclerosis">
                      Amyotrophic Lateral Sclerosis
                    </option>
                  </select>
                  <FieldError name="neurological_condition_subtype" />

                  <p style={{ marginTop: 8, fontWeight: "bold" }}>
                    Date of Diagnosis
                  </p>
                  <input
                    type="date"
                    name="neurological_condition_date"
                    required={selectedConditions.neurological_condition}
                    style={{ width: "100%", padding: 6 }}
                  />
                  <FieldError name="neurological_condition_date" />

                  <p style={{ marginTop: 8, fontWeight: "bold" }}>
                    Affected Side
                  </p>
                  <select
                    name="neurological_condition_side"
                    required={selectedConditions.neurological_condition}
                    style={{ width: "100%", padding: 6 }}
                    defaultValue=""
                  >
                    <option value="">Select</option>
                    <option value="left">Left</option>
                    <option value="right">Right</option>
                    <option value="bilateral">Bilateral</option>
                    <option value="none">None</option>
                  </select>
                  <FieldError name="neurological_condition_side" />

                  <p style={{ marginTop: 8, fontWeight: "bold" }}>Severity</p>
                  <select
                    name="neurological_condition_severity"
                    required={selectedConditions.neurological_condition}
                    style={{ width: "100%", padding: 6 }}
                    defaultValue=""
                  >
                    <option value="">Select</option>
                    <option value="mild">Mild</option>
                    <option value="moderate">Moderate</option>
                    <option value="severe">Severe</option>
                  </select>
                  <FieldError name="neurological_condition_severity" />
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
                    required={selectedConditions.post_surgery}
                    style={{ width: "100%", padding: 6 }}
                    defaultValue=""
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
                  <FieldError name="post_surgery_subtype" />

                  <p style={{ marginTop: 8, fontWeight: "bold" }}>
                    Date of Diagnosis
                  </p>
                  <input
                    type="date"
                    name="post_surgery_date"
                    required={selectedConditions.post_surgery}
                    style={{ width: "100%", padding: 6 }}
                  />
                  <FieldError name="post_surgery_date" />

                  <p style={{ marginTop: 8, fontWeight: "bold" }}>
                    Affected Side
                  </p>
                  <select
                    name="post_surgery_side"
                    required={selectedConditions.post_surgery}
                    style={{ width: "100%", padding: 6 }}
                    defaultValue=""
                  >
                    <option value="">Select</option>
                    <option value="left">Left</option>
                    <option value="right">Right</option>
                    <option value="bilateral">Bilateral</option>
                    <option value="none">None</option>
                  </select>
                  <FieldError name="post_surgery_side" />

                  <p style={{ marginTop: 8, fontWeight: "bold" }}>Severity</p>
                  <select
                    name="post_surgery_severity"
                    required={selectedConditions.post_surgery}
                    style={{ width: "100%", padding: 6 }}
                    defaultValue=""
                  >
                    <option value="">Select</option>
                    <option value="mild">Mild</option>
                    <option value="moderate">Moderate</option>
                    <option value="severe">Severe</option>
                  </select>
                  <FieldError name="post_surgery_severity" />
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
                    required={selectedConditions.arthritis_joint_pain}
                    style={{ width: "100%", padding: 6 }}
                    defaultValue=""
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
                  <FieldError name="arthritis_joint_pain_subtype" />

                  <p style={{ marginTop: 8, fontWeight: "bold" }}>
                    Date of Diagnosis
                  </p>
                  <input
                    type="date"
                    name="arthritis_joint_pain_date"
                    required={selectedConditions.arthritis_joint_pain}
                    style={{ width: "100%", padding: 6 }}
                  />
                  <FieldError name="arthritis_joint_pain_date" />

                  <p style={{ marginTop: 8, fontWeight: "bold" }}>
                    Affected Side
                  </p>
                  <select
                    name="arthritis_joint_pain_side"
                    required={selectedConditions.arthritis_joint_pain}
                    style={{ width: "100%", padding: 6 }}
                    defaultValue=""
                  >
                    <option value="">Select</option>
                    <option value="left">Left</option>
                    <option value="right">Right</option>
                    <option value="bilateral">Bilateral</option>
                    <option value="none">None</option>
                  </select>
                  <FieldError name="arthritis_joint_pain_side" />

                  <p style={{ marginTop: 8, fontWeight: "bold" }}>Severity</p>
                  <select
                    name="arthritis_joint_pain_severity"
                    required={selectedConditions.arthritis_joint_pain}
                    style={{ width: "100%", padding: 6 }}
                    defaultValue=""
                  >
                    <option value="">Select</option>
                    <option value="mild">Mild</option>
                    <option value="moderate">Moderate</option>
                    <option value="severe">Severe</option>
                  </select>
                  <FieldError name="arthritis_joint_pain_severity" />
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
                    required={selectedConditions.cardiovascular_condition}
                    style={{ width: "100%", padding: 6 }}
                    defaultValue=""
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
                  <FieldError name="cardiovascular_condition_subtype" />

                  <p style={{ marginTop: 8, fontWeight: "bold" }}>
                    Date of Diagnosis
                  </p>
                  <input
                    type="date"
                    name="cardiovascular_condition_date"
                    required={selectedConditions.cardiovascular_condition}
                    style={{ width: "100%", padding: 6 }}
                  />
                  <FieldError name="cardiovascular_condition_date" />

                  <p style={{ marginTop: 8, fontWeight: "bold" }}>
                    Affected Side
                  </p>
                  <select
                    name="cardiovascular_condition_side"
                    required={selectedConditions.cardiovascular_condition}
                    style={{ width: "100%", padding: 6 }}
                    defaultValue=""
                  >
                    <option value="">Select</option>
                    <option value="left">Left</option>
                    <option value="right">Right</option>
                    <option value="bilateral">Bilateral</option>
                    <option value="none">None</option>
                  </select>
                  <FieldError name="cardiovascular_condition_side" />

                  <p style={{ marginTop: 8, fontWeight: "bold" }}>Severity</p>
                  <select
                    name="cardiovascular_condition_severity"
                    required={selectedConditions.cardiovascular_condition}
                    style={{ width: "100%", padding: 6 }}
                    defaultValue=""
                  >
                    <option value="">Select</option>
                    <option value="mild">Mild</option>
                    <option value="moderate">Moderate</option>
                    <option value="severe">Severe</option>
                  </select>
                  <FieldError name="cardiovascular_condition_severity" />
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
                value={otherText}
                disabled={!selectedConditions.other}
                required={selectedConditions.other}
                onChange={(e) => setOtherText(e.target.value)}
              />
              <FieldError name="other_condition_name" />

              {selectedConditions.other && (
                <div style={{ marginTop: 8 }}>
                  <p style={{ fontWeight: "bold" }}>Subtype</p>
                  <select
                    name="other_subtype"
                    required={selectedConditions.other}
                    style={{ width: "100%", padding: 6 }}
                    defaultValue=""
                  >
                    <option value="">Select</option>
                    <option value="degenerative">Degenerative</option>
                    <option value="injury_related">Injury-related</option>
                    <option value="post_operative">
                      Post-operative Complication
                    </option>
                    <option value="none_specific">None-specific</option>
                  </select>
                  <FieldError name="other_subtype" />

                  <p style={{ marginTop: 8, fontWeight: "bold" }}>
                    Date of Diagnosis
                  </p>
                  <input
                    type="date"
                    name="other_date"
                    required={selectedConditions.other}
                    style={{ width: "100%", padding: 6 }}
                  />
                  <FieldError name="other_date" />

                  <p style={{ marginTop: 8, fontWeight: "bold" }}>
                    Affected Side
                  </p>
                  <select
                    name="other_side"
                    required={selectedConditions.other}
                    style={{ width: "100%", padding: 6 }}
                    defaultValue=""
                  >
                    <option value="">Select</option>
                    <option value="left">Left</option>
                    <option value="right">Right</option>
                    <option value="bilateral">Bilateral</option>
                    <option value="none">None</option>
                  </select>
                  <FieldError name="other_side" />

                  <p style={{ marginTop: 8, fontWeight: "bold" }}>Severity</p>
                  <select
                    name="other_severity"
                    required={selectedConditions.other}
                    style={{ width: "100%", padding: 6 }}
                    defaultValue=""
                  >
                    <option value="">Select</option>
                    <option value="mild">Mild</option>
                    <option value="moderate">Moderate</option>
                    <option value="severe">Severe</option>
                  </select>
                  <FieldError name="other_severity" />
                </div>
              )}
            </div>
          </div>
        </section>

        <hr style={{ margin: "16px 0" }} />

        {/* Functional Ability + the rest (unchanged) */}
        <section className="modal-section">
          <h3 style={{ color: "#1f3fae" }}>Functional Ability</h3>

          {/* Row 1: Mobility + Walking + ROM */}
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
                style={{ padding: 6, width: "100%" }}
                required
              >
                <option value="">Select</option>
                <option value="seated_only">Seated only</option>
                <option value="assisted_standing">Assisted standing</option>
                <option value="independent_standing">
                  Independent standing
                </option>
              </select>
            </div>

            <div>
              <p style={{ margin: 0, marginBottom: 6 }}>
                Walking Ability <span style={{ color: "red" }}>*</span>
              </p>
              <select
                name="walking_ability"
                style={{ padding: 6, width: "100%" }}
                required
              >
                <option value="">Select</option>
                <option value="cannot_walk">Cannot walk</option>
                <option value="with_cane_walker">With cane / walker</option>
                <option value="independent">Independent</option>
              </select>
            </div>

            <div>
              <p style={{ margin: 0, marginBottom: 6 }}>
                Range of Motion <span style={{ color: "red" }}>*</span>
              </p>
              <select
                name="range_of_motion"
                style={{ padding: 6, width: "100%" }}
                required
              >
                <option value="">Select</option>
                <option value="limited">Limited</option>
                <option value="moderate">Moderate</option>
                <option value="full_with_caution">Full (with caution)</option>
              </select>
            </div>
          </div>

          {/* Row 2: Assistive Device + Upper Limb Left + Upper Limb Right */}
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
                style={{ padding: 6, width: "100%" }}
                required
              >
                <option value="">Select</option>
                <option value="normal">Normal</option>
                <option value="limited">Limited</option>
                <option value="impaired">Impaired</option>
              </select>
            </div>

            <div>
              <p style={{ margin: 0, marginBottom: 6 }}>
                Upper Limb Function (Right){" "}
                <span style={{ color: "red" }}>*</span>
              </p>
              <select
                name="upper_limb_right"
                style={{ padding: 6, width: "100%" }}
                required
              >
                <option value="">Select</option>
                <option value="normal">Normal</option>
                <option value="limited">Limited</option>
                <option value="impaired">Impaired</option>
              </select>
            </div>

            <div>
              <p style={{ margin: 0, marginBottom: 6 }}>
                Assistive Device <span style={{ color: "red" }}>*</span>
              </p>
              <select
                name="assistive_device"
                style={{ padding: 6, width: "100%" }}
                required
              >
                <option value="">Select</option>
                <option value="none">None</option>
                <option value="cane">Cane</option>
                <option value="walker">Walker</option>
                <option value="crutches">Crutches</option>
                <option value="wheelchair">Wheelchair</option>
              </select>
            </div>
          </div>
        </section>

        <hr style={{ margin: "16px 0" }} />

        {/* The rest of your sections remain unchanged */}
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
          onClick={(e) => {
            const ok = validateAndSetErrors();

            if (!ok) {
              // prevent your controller from hiding the UI (controller will also validate)
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
