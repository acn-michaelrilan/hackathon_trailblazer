// app/informationinput/page.tsx
import UserTypeAccordionController from "./UserTypeAccordionController";
import UserTypeAccordion from "./UserTypeAccordion";
import {
  BasicProfile,
  UserTypeAndRisk,
  MedicalProfile,
  FunctionalAbility,
} from "../../types";

export default function informationinput() {
  async function save(formData: FormData) {
    "use server";

    // --- Basic Profile ---
    const basic_profile: BasicProfile = {
      basic_profile: {
        name: formData.get("name")?.toString() ?? "",
        age: Number(formData.get("age")?.toString() ?? 0),
        sex: formData.get("sex")?.toString() ?? "",
        height_cm: Number(formData.get("height")?.toString() ?? 0),
        weight_kg: Number(formData.get("weight")?.toString() ?? 0),
        dominant_side: formData.get("dominant_side")?.toString() ?? "",
      },
    };

    // --- Medical Profile (build conditions per selected condition) ---
    const medical_profile: MedicalProfile = {
      medical_profile: {
        conditions: [],
        notes: formData.get("notes")?.toString() ?? "",
      },
    };

    if (formData.get("medical_condition_stroke")) {
      medical_profile.medical_profile.conditions.push({
        type: "stroke",
        subtype: formData.get("stroke_subtype")?.toString() ?? "",
        date_of_diagnosis: formData.get("stroke_date")?.toString() ?? "",
        affected_side: formData.get("stroke_side")?.toString() ?? "",
        severity: formData.get("stroke_severity")?.toString() ?? "",
      });
    }

    if (formData.get("medical_condition_neurological_condition")) {
      medical_profile.medical_profile.conditions.push({
        type: "neurological_condition",
        subtype:
          formData.get("neurological_condition_subtype")?.toString() ?? "",
        date_of_diagnosis:
          formData.get("neurological_condition_date")?.toString() ?? "",
        affected_side:
          formData.get("neurological_condition_side")?.toString() ?? "",
        severity:
          formData.get("neurological_condition_severity")?.toString() ?? "",
      });
    }

    if (formData.get("medical_condition_post_surgery")) {
      medical_profile.medical_profile.conditions.push({
        type: "post_surgery",
        subtype: formData.get("post_surgery_subtype")?.toString() ?? "",
        date_of_diagnosis: formData.get("post_surgery_date")?.toString() ?? "",
        affected_side: formData.get("post_surgery_side")?.toString() ?? "",
        severity: formData.get("post_surgery_severity")?.toString() ?? "",
      });
    }

    if (formData.get("medical_condition_arthritis_joint_pain")) {
      medical_profile.medical_profile.conditions.push({
        type: "arthritis_joint_pain",
        subtype: formData.get("arthritis_joint_pain_subtype")?.toString() ?? "",
        date_of_diagnosis:
          formData.get("arthritis_joint_pain_date")?.toString() ?? "",
        affected_side:
          formData.get("arthritis_joint_pain_side")?.toString() ?? "",
        severity:
          formData.get("arthritis_joint_pain_severity")?.toString() ?? "",
      });
    }

    if (formData.get("medical_condition_cardiovascular_condition")) {
      medical_profile.medical_profile.conditions.push({
        type: "cardiovascular_condition",
        subtype:
          formData.get("cardiovascular_condition_subtype")?.toString() ?? "",
        date_of_diagnosis:
          formData.get("cardiovascular_condition_date")?.toString() ?? "",
        affected_side:
          formData.get("cardiovascular_condition_side")?.toString() ?? "",
        severity:
          formData.get("cardiovascular_condition_severity")?.toString() ?? "",
      });
    }

    if (formData.get("medical_condition_other")) {
      medical_profile.medical_profile.conditions.push({
        type: formData.get("other_condition_name")?.toString() ?? "other",
        subtype: formData.get("other_subtype")?.toString() ?? "",
        date_of_diagnosis: formData.get("other_date")?.toString() ?? "",
        affected_side: formData.get("other_side")?.toString() ?? "",
        severity: formData.get("other_severity")?.toString() ?? "",
      });
    }

    // --- Functional Ability ---
    const functional_ability: FunctionalAbility = {
      functional_ability: {
        mobility_level: formData.get("mobility_level")?.toString() ?? "",
        walking_ability: formData.get("walking_ability")?.toString() ?? "",
        assistive_device: formData.get("assistive_device")?.toString() ?? "",
        upper_limb_function: {
          left_arm: formData.get("upper_limb_left")?.toString() ?? "",
          right_arm: formData.get("upper_limb_right")?.toString() ?? "",
        },
        range_of_motion: formData.get("range_of_motion")?.toString() ?? "",
      },
    };

    // --- User Type & Risk ---
    const user_type_and_risk: UserTypeAndRisk = {
      user_type_and_risk: {
        category: formData.get("user_category")?.toString() ?? "",
        risk_level: formData.get("risk_level")?.toString() ?? "",
      },
    };

    // Compose final JSON (avoid double nesting with spread)
    const payload = {
      ...basic_profile,
      ...user_type_and_risk,
      ...medical_profile,
      ...functional_ability,
    };

    console.log(JSON.stringify(payload, null, 2));
  }

  // ====== Component-scoped styles (no global CSS) ======
  const DESKTOP_BP = 1280;
  const SPACER_PX = 24;
  const MIN_ITEM_WIDTH = 180;
  const GAP_PX = 16;

  const rootClass = "pi-wrap";
  const usrClass = "usr-wrap";

  const styles = `
  /* (styles unchanged — keeping your existing CSS here) */
  .${rootClass} .personal-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(${MIN_ITEM_WIDTH}px, 1fr));
    gap: ${GAP_PX}px;
    align-items: start;
    margin-top: ${GAP_PX}px;
  }
  @media (min-width: ${DESKTOP_BP}px) {
    .${rootClass} .personal-grid {
      grid-template-columns:
        1fr 1fr 1fr
        ${SPACER_PX}px
        1fr 1fr 1fr;
      gap: ${GAP_PX}px;
    }
  }
  .${rootClass} .spacer { display: none; }
  @media (min-width: ${DESKTOP_BP}px) { .${rootClass} .spacer { display: block; } }

  .${rootClass} .field { display: flex; flex-direction: column; gap: 6px; min-width: 0; }
  .${rootClass} .inline-options { display: flex; gap: 12px; align-items: center; flex-wrap: nowrap; }
  .${rootClass} .inline-radio { display: inline-flex; gap: 6px; align-items: center; white-space: nowrap; }

  .${usrClass} .choice-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 12px;
    margin-top: 12px;
  }
  @media (min-width: 560px) {
    .${usrClass} .choice-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  .${usrClass} .vh { position: absolute; opacity: 0; pointer-events: none; width: 0; height: 0; }
  .${usrClass} .pill {
    display: inline-flex; align-items: center; justify-content: center;
    padding: 1px 1px; border-radius: 9999px; border: 1px solid #d0d5dd;
    background: #ffffff; color: #1f3fae; font-weight: 600; cursor: pointer;
    transition: background .15s ease, color .15s ease, border-color .15s ease, box-shadow .15s ease;
    user-select: none; text-align: center; width: 100%;
  }
  .${usrClass} .pill:hover { border-color: #b8c0cc; background: #f7f9ff; }
  .${usrClass} .pill:active { transform: translateY(0.5px); }
  .${usrClass} .vh:checked + .pill {
    background: #1f3fae; color: #ffffff; border-color: #1f3fae; box-shadow: 0 0 0 3px rgba(31, 63, 174, 0.18);
  }
  .${usrClass} .vh:focus-visible + .pill, .${usrClass} .pill:focus-visible {
    outline: 3px solid rgba(31, 63, 174, 0.4); outline-offset: 2px;
  }
  .muted { color: #6b7280; font-size: 13px; }

  .${rootClass} .choice-grid { display: grid; grid-template-columns: 1fr; gap: 12px; margin-top: 12px; }
  @media (min-width: 560px) {
    .${rootClass} .choice-grid { grid-template-columns: repeat(2, 1fr); }
  }
  .${rootClass} .vh { position: absolute; opacity: 0; pointer-events: none; width: 0; height: 0; }
  .${rootClass} .pill {
    display: inline-flex; align-items: center; justify-content: center;
    padding: 1px 1px; border-radius: 9999px; border: 1px solid #d0d5dd; background: #ffffff;
    color: #1f3fae; font-weight: 600; cursor: pointer; transition: background .15s ease, color .15s ease, border-color .15s ease, box-shadow .15s ease;
    user-select: none; text-align: center; width: 100%;
  }
  .${rootClass} .pill:hover { border-color: #b8c0cc; background: #f7f9ff; }
  .${rootClass} .pill:active { transform: translateY(0.5px); }
  .${rootClass} .vh:checked + .pill {
    background: #1f3fae; color: #ffffff; border-color: #1f3fae; box-shadow: 0 0 0 3px rgba(31, 63, 174, 0.18);
  }
  .${rootClass} .vh:focus-visible + .pill, .${rootClass} .pill:focus-visible {
    outline: 3px solid rgba(31, 63, 174, 0.4); outline-offset: 2px;
  }

  .${usrClass} .btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; padding: 10px 16px; border-radius: 10px; font-weight: 600; cursor: pointer; user-select: none; transition: transform .05s ease, background .15s ease, color .15s ease, border-color .15s ease, box-shadow .15s ease; text-decoration: none; border: 1px solid transparent; }
  .${usrClass} .btn:active { transform: translateY(0.5px); }
  .${usrClass} .btn-primary { background: #1f3fae; color: #ffffff; border-color: #1f3fae; }
  .${usrClass} .btn-primary:hover { background: #2448c7; border-color: #2448c7; box-shadow: 0 0 0 3px rgba(31,63,174,0.18); }
  .${usrClass} .btn-ghost { background: #ffffff; color: #1f2937; border-color: #e5e7eb; }
  .${usrClass} .btn-ghost:hover { background: #f8fafc; border-color: #d1d5db; }

  .${usrClass} .icon-btn { background: transparent; border: none; padding: 8px; border-radius: 8px; cursor: pointer; color: #1f3fae; }
  .${usrClass} .icon-btn:hover { background: #eef2ff; }

  .usr-wrap .modal .choice-grid--row .pill { width: auto; white-space: nowrap; padding: 8px 12px; font-size: 14px; }
  .usr-wrap .modal .choice-row .pill { width: auto; padding: 6px 10px; font-size: 14px; white-space: nowrap; }
  .usr-wrap .modal .choice-row > div { display: inline-block; }

  .usr-wrap details.acc {
    background: #ffffff; color: #111827; border: 1px solid #e5e7eb; border-radius: 12px;
    box-shadow: 0 8px 24px rgba(0,0,0,0.08); overflow: clip;
  }
  .usr-wrap details[data-acc] { display: none; }
  .usr-wrap:has(#stroke_recovery_neurological:checked) details[data-acc] { display: block; }
  .usr-wrap[data-acc-collapsed="true"] details[data-acc] { display: none !important; }

  .usr-wrap .acc-summary {
    list-style: none; cursor: pointer; display: flex; align-items: center; justify-content: space-between; gap: 12px;
    padding: 16px 20px; background: #f8faff; border-bottom: 1px solid #eef2f7; font-weight: 700; color: #1f3fae;
  }
  .usr-wrap .acc-summary::-webkit-details-marker { display: none; }
  .usr-wrap .acc-summary .chev { transition: transform .18s ease; color: #1f3fae; }
  .usr-wrap details[open] .acc-summary .chev { transform: rotate(180deg); }
  .usr-wrap .acc-panel { padding: 16px 20px; line-height: 1.5; background: #ffffff; }
  .usr-wrap .acc-footer { padding: 14px 20px; display: flex; justify-content: flex-end; gap: 12px; border-top: 1px solid #eef2f7; background: #fafbff; }
  .usr-wrap .acc-panel .choice-row { display: flex; flex-wrap: nowrap; align-items: center; gap: 6px; margin-top: 8px; }
  .usr-wrap .acc-panel .choice-row .pill { width: auto; padding: 6px 10px; font-size: 14px; white-space: nowrap; }
  `;

  return (
    <div className="min-h-screen bg-white p-6 md:p-12 font-sans text-slate-900">
      <main style={{ maxWidth: 900, margin: "0 auto", padding: 32 }}>
        <style>{styles}</style>

        <UserTypeAccordionController />

        <h1 style={{ textAlign: "center", fontSize: 36, color: "#1f3fae" }}>
          <strong>LOG YOUR DATA</strong>
        </h1>
        <p style={{ textAlign: "center", marginBottom: 40 }}>
          Track and record your information
        </p>

        <form action={save}>
          {/* ================= Personal Information ================= */}
          <section className={rootClass}>
            <h2 style={{ color: "#1f3fae" }}>Personal Information</h2>

            <div className="personal-grid">
              {/* Name */}
              <div className="field">
                <label>Name</label>
                <input
                  name="name"
                  type="text"
                  placeholder="enter name"
                  required
                  style={{ width: "100%" }}
                />
              </div>

              {/* Age */}
              <div className="field">
                <label>Age</label>
                <input
                  name="age"
                  type="number"
                  placeholder="enter age"
                  required
                  style={{ width: "100%" }}
                />
              </div>

              {/* Sex */}
              <div className="field">
                <label style={{ whiteSpace: "nowrap" }}>Sex</label>
                <div className="inline-options">
                  <label className="inline-radio">
                    <input type="radio" name="sex" value="male" required />
                    Male
                  </label>
                  <label className="inline-radio">
                    <input type="radio" name="sex" value="female" />
                    Female
                  </label>
                </div>
              </div>

              {/* Spacer (desktop only) */}
              <div className="spacer" aria-hidden="true" />

              {/* Height */}
              <div className="field">
                <label>Height</label>
                <input
                  name="height"
                  type="number"
                  placeholder="enter height in cm"
                  style={{ width: "100%" }}
                />
              </div>

              {/* Weight */}
              <div className="field">
                <label>Weight</label>
                <input
                  name="weight"
                  type="number"
                  placeholder="enter weight in kg"
                  style={{ width: "100%" }}
                />
              </div>

              {/* Dominant Side */}
              <div>
                <label style={{ whiteSpace: "nowrap" }}>Dominant Side</label>

                <div className="choice-grid" style={{ marginTop: 1 }}>
                  <div style={{ position: "relative" }}>
                    <input
                      className="vh"
                      type="radio"
                      id="dominant_left"
                      name="dominant_side"
                      value="left"
                      required
                    />
                    <label className="pill" htmlFor="dominant_left">
                      Left
                    </label>
                  </div>
                  <div style={{ position: "relative" }}>
                    <input
                      className="vh"
                      type="radio"
                      id="dominant_right"
                      name="dominant_side"
                      value="right"
                    />
                    <label className="pill" htmlFor="dominant_right">
                      Right
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ================= User Type & Risk Level + Medical Profile ================= */}
          <UserTypeAccordion />

          <hr />

          {/* ================= Save ================= */}
          <div style={{ textAlign: "center", marginTop: 32 }}>
            <button
              type="submit"
              style={{
                background: "#6cab2f",
                color: "white",
                padding: "12px 40px",
                borderRadius: 8,
                border: "none",
                fontSize: 16,
              }}
            >
              Save
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
