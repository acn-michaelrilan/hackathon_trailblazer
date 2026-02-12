// app/informationinput/page.tsx
import UserTypeAccordionController from "./UserTypeAccordionController";
import UserTypeAccordion from "./UserTypeAccordion";
import { redirect } from "next/navigation";
import {
  BasicProfile,
  UserTypeAndRisk,
  MedicalProfile,
  FunctionalAbility,
  MedicalSafetyAndRiskFlags,
  CurrentActivityLevel,
  ExercisePreferencesAndTolerance,
  ExerciseEnvironment,
  AdditionalInformation,
} from "../../types";
import { createClient } from "@/backend/server";

const supabase = await createClient();

const {
  data: { user },
} = await supabase.auth.getUser();
if (!user) {
  redirect("/login");
}

export default async function InformationInput() {
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

    const sys = formData.get("bp_sys")?.toString().trim() ?? "";
    const dia = formData.get("bp_dia")?.toString().trim() ?? "";
    const blood_pressure = sys && dia ? `${sys}/${dia}` : "";

    const yesNo = (k: string) => formData.get(k)?.toString() === "yes";
    const toNum = (v: FormDataEntryValue | null, fallback = 0) => {
      if (v == null) return fallback;
      const n = Number(v);
      return Number.isFinite(n) ? n : fallback;
    };

    const medical_safety_and_risk_flags: MedicalSafetyAndRiskFlags = {
      medical_safety_and_risk_flags: {
        vitals: {
          blood_pressure,
          resting_heart_rate: toNum(formData.get("resting_heart_rate"), 0),
        },
        heart_condition: yesNo("heart_condition"),
        heart_condition_details:
          formData.get("heart_condition_details")?.toString() ?? "",
        pacemaker_or_implants: yesNo("pacemaker_or_implant"),
        history_of_falls_last_6_months: yesNo("history_of_falls_last_6_months"),
        number_of_falls: toNum(formData.get("number_of_falls"), 0),
        dizziness_or_fainting_episodes: yesNo("dizziness_or_fainting_episodes"),
        dizziness_details: formData.get("dizziness_details")?.toString() ?? "",
        pain_scale: toNum(formData.get("pain_scale"), 0),
        pain_location: formData.get("pain_location")?.toString() ?? "",
      },
    };

    // --- Current Activity Level ---
    const toStr = (v: FormDataEntryValue | null, fallback = "") =>
      (v?.toString() ?? "").trim() || fallback;

    // Secondary goal checkboxes → array
    const secGoalChecked = (name: string) =>
      formData.get(name)?.toString() === "on";
    const pickFromMap = (map: Record<string, string>) =>
      Object.entries(map)
        .filter(([name]) => secGoalChecked(name))
        .map(([, value]) => value);

    // Maps that reflect your CurrentActivityLevel.tsx names/values
    const secondaryGoalsMap: Record<string, string> = {
      goal_improve_mobility: "improve_mobility",
      goal_improve_balance: "improve_balance",
      goal_increase_endurance: "increase_endurance",
      goal_move_independently: "move_independently",
    };

    const targetsMap: Record<string, string> = {
      target_climb_stairs: "climb_stairs",
      target_get_in_out_bed: "get_in_out_bed",
      target_stand_without_hands: "stand_without_hands",
      target_use_hand_daily_tasks: "use_hand_daily_tasks",
      target_walk_longer: "walk_longer",
      target_regain_balance_turning: "regain_balance_turning",
      target_return_to_driving: "return_to_driving",
      target_return_to_work_or_school: "return_to_work_or_school",
      target_carry_groceries: "carry_groceries",
      target_improve_coordination: "improve_coordination",
      target_walk_uneven_surfaces: "walk_uneven_surfaces",
      target_reduce_spasticity: "reduce_spasticity",
      target_improve_grip: "improve_grip",
      target_bathe_independently: "bathe_independently",
      target_return_to_sports: "return_to_sports",
    };

    // --- Current Activity Level (conflict-free helpers) ---
    const actGetStr = (v: FormDataEntryValue | null, fallback = "") =>
      (v?.toString() ?? "").trim() || fallback;

    const actIsChecked = (name: string) => formData.get(name) != null; // presence-based

    const actPickFromMap = (map: Record<string, string>) =>
      Object.entries(map)
        .filter(([name]) => actIsChecked(name))
        .map(([, value]) => value);

    // Primary goals (radio) — only the 4 options present in your updated UI
    const actAllowedPrimary = new Set([
      "reduce_pain",
      "restore_strength",
      "recover_after_surgery",
      "prevent_decline",
      //general goals
      "weight_management",
      "increase_strength",
      "cardio_fitness",
      "flexibility_mobility",
    ]);
    const actPrimaryRaw = actGetStr(formData.get("primary_goal"), "");
    const actPrimary = actAllowedPrimary.has(actPrimaryRaw)
      ? actPrimaryRaw
      : "";

    // Secondary goals (checkboxes) — from your updated UI
    const actSecondaryGoalsMap: Record<string, string> = {
      goal_improve_mobility: "improve_mobility",
      goal_improve_balance: "improve_balance",
      goal_increase_endurance: "increase_endurance",
      goal_move_independently: "move_independently",
      //general sec goals

      goal_increase_steps: "increase_steps",
      goal_improve_posture: "improve_posture",
      goal_reduce_stress: "reduce_stress",
      goal_gain_energy: "gain_energy",
      goal_improve_endurance: "improve_endurance",
      goal_general_toning: "general_toning",
    };
    const actSecondaryGoals = actPickFromMap(actSecondaryGoalsMap);

    // Specific targets (checkboxes)
    const actTargetsMap: Record<string, string> = {
      target_climb_stairs: "climb_stairs",
      target_get_in_out_bed: "get_in_out_bed",
      target_stand_without_hands: "stand_without_hands",
      target_use_hand_daily_tasks: "use_hand_daily_tasks",
      target_walk_longer: "walk_longer",
      target_regain_balance_turning: "regain_balance_turning",
      target_return_to_driving: "return_to_driving",
      target_return_to_work_or_school: "return_to_work_or_school",
      target_carry_groceries: "carry_groceries",
      target_improve_coordination: "improve_coordination",
      target_walk_uneven_surfaces: "walk_uneven_surfaces",
      target_reduce_spasticity: "reduce_spasticity",
      target_improve_grip: "improve_grip",
      target_bathe_independently: "bathe_independently",
      target_return_to_sports: "return_to_sports",
      //general targets

      target_run_5k: "run_5k",
      target_do_10k_steps: "ten_k_steps_per_day",
      target_increase_vo2: "increase_cardio_capacity",
      target_full_body_strength: "full_body_strength",
      target_mobility_flow: "daily_mobility_flow",
      target_event_ready: "event_training",
    };

    const current_activity_level: CurrentActivityLevel = {
      current_activity_level: actGetStr(
        formData.get("current_activity_level"),
        "",
      ),
      activity_details: actGetStr(formData.get("activity_details"), ""),
      goals: {
        primary_goal: actPrimary,
        secondary_goals: actSecondaryGoals,
      },
      specific_targets: actPickFromMap(actTargetsMap),
    };

    // --- Exercise Preferences & Tolerance ---
    const exercise_preferences_and_tolerance: ExercisePreferencesAndTolerance =
      {
        exercise_preferences_and_tolerance: {
          preferred_session_length: toStr(
            formData.get("preferred_session_length"),
            "",
          ),
          preferred_intensity: toStr(formData.get("preferred_intensity"), ""),
          rest_tolerance: toStr(formData.get("rest_tolerance"), ""),
          rest_frequency: toStr(formData.get("rest_frequency"), ""), // value from hidden/computed field
          time_of_day_preference: toStr(
            formData.get("time_of_day_preference"),
            "",
          ),
          fatigue_concerns: toStr(formData.get("fatigue_concerns"), ""),
        },
      };

    // --- Exercise Environment ---
    const equipment_available_raw = formData.getAll("equipment_available");
    const exercise_environment: ExerciseEnvironment = {
      exercise_environment: {
        location: toStr(formData.get("location"), ""),
        equipment_available: equipment_available_raw
          .map((v) => v?.toString().trim())
          .filter(Boolean) as string[],
        support_person_available: yesNo("support_person_available"), // expects radio values "yes" / "no"
        support_person_details: toStr(
          formData.get("support_person_details"),
          "",
        ),
      },
    };

    // --- Additional Information ---
    // Note: Your type expects `timestamp` INSIDE `additional_information`
    const medications_raw = formData.getAll("medications");
    const submittedTimestamp = toStr(formData.get("timestamp"), "");
    const additional_information: AdditionalInformation = {
      additional_information: {
        medications: medications_raw
          .map((v) => v?.toString().trim())
          .filter(Boolean) as string[],
        physical_therapy_history: yesNo("physical_therapy_history"),
        pt_sessions_completed: toNum(formData.get("pt_sessions_completed"), 0),
        pt_end_date: toStr(formData.get("pt_end_date"), ""),
        clearance_for_exercise: yesNo("clearance_for_exercise"),
        physician_notes: toStr(formData.get("physician_notes"), ""),
        timestamp: submittedTimestamp || new Date().toISOString(),
      },
    };

    // Compose final JSON (avoid double nesting with spread)
    const payload = {
      ...basic_profile,
      ...user_type_and_risk,
      ...medical_profile,
      ...functional_ability,
      ...medical_safety_and_risk_flags,
      ...current_activity_level,
      ...exercise_preferences_and_tolerance,
      ...exercise_environment,
      ...additional_information,
      submittedTimestamp,
    };

    console.log(JSON.stringify(payload, null, 2));

    redirect("/overview");
  }
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }
  const userId = user.id;
  console.log(userId);

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
  
  /* Hide all accordions by default */
.usr-wrap details[data-acc] { display: none; }

/* Show based on which one is open (set by JS) */
.usr-wrap[data-acc-open="stroke"] details[data-acc="stroke"] { display: block; }
.usr-wrap[data-acc-open="general"] details[data-acc="general"] { display: block; }

/* Collapsed state overrides visibility */
.usr-wrap[data-acc-collapsed="true"] details[data-acc] { display: none !important; }

/* NEW: if UI is set to hidden, hide accordions even if data-acc-open is set */
.usr-wrap[data-acc-ui="hidden"] details[data-acc] { display: none !important; }


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
                  min={1}
                  max={98}
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
