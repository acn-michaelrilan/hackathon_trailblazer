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

// Helper functions
const toStr = (v: FormDataEntryValue | null, fallback = "") =>
  (v?.toString() ?? "").trim() || fallback;

const toNum = (v: FormDataEntryValue | null, fallback = 0) => {
  if (v == null) return fallback;
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
};

const yesNo = (formData: FormData, k: string) =>
  formData.get(k)?.toString() === "yes";

const isChecked = (formData: FormData, name: string) =>
  formData.get(name) != null;

const pickFromMap = (
  formData: FormData,
  map: Record<string, string>,
) =>
  Object.entries(map)
    .filter(([name]) => isChecked(formData, name))
    .map(([, value]) => value);

export function buildPayload(formData: FormData) {
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
      subtype:
        formData.get("arthritis_joint_pain_subtype")?.toString() ?? "",
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

  const medical_safety_and_risk_flags: MedicalSafetyAndRiskFlags = {
    medical_safety_and_risk_flags: {
      vitals: {
        blood_pressure,
        resting_heart_rate: toNum(formData.get("resting_heart_rate"), 0),
      },
      heart_condition: yesNo(formData, "heart_condition"),
      heart_condition_details:
        formData.get("heart_condition_details")?.toString() ?? "",
      pacemaker_or_implants: yesNo(formData, "pacemaker_or_implant"),
      history_of_falls_last_6_months: yesNo(
        formData,
        "history_of_falls_last_6_months",
      ),
      number_of_falls: toNum(formData.get("number_of_falls"), 0),
      dizziness_or_fainting_episodes: yesNo(
        formData,
        "dizziness_or_fainting_episodes",
      ),
      dizziness_details: formData.get("dizziness_details")?.toString() ?? "",
      pain_scale: toNum(formData.get("pain_scale"), 0),
      pain_location: formData.get("pain_location")?.toString() ?? "",
    },
  };

  // --- Current Activity Level ---
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
  const actPrimaryRaw = toStr(formData.get("primary_goal"), "");
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
  const actSecondaryGoals = pickFromMap(formData, actSecondaryGoalsMap);

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
    current_activity_level: toStr(
      formData.get("current_activity_level"),
      "",
    ),
    activity_details: toStr(formData.get("activity_details"), ""),
    goals: {
      primary_goal: actPrimary,
      secondary_goals: actSecondaryGoals,
    },
    specific_targets: pickFromMap(formData, actTargetsMap),
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
        rest_frequency: toStr(formData.get("rest_frequency"), ""),
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
      support_person_available: yesNo(formData, "support_person_available"),
      support_person_details: toStr(
        formData.get("support_person_details"),
        "",
      ),
    },
  };

  // --- Additional Information ---
  const medications_raw = formData.getAll("medications");
  const submittedTimestamp = toStr(formData.get("timestamp"), "");
  const additional_information: AdditionalInformation = {
    additional_information: {
      medications: medications_raw
        .map((v) => v?.toString().trim())
        .filter(Boolean) as string[],
      physical_therapy_history: yesNo(formData, "physical_therapy_history"),
      pt_sessions_completed: toNum(formData.get("pt_sessions_completed"), 0),
      pt_end_date: toStr(formData.get("pt_end_date"), ""),
      clearance_for_exercise: yesNo(formData, "clearance_for_exercise"),
      physician_notes: toStr(formData.get("physician_notes"), ""),
      timestamp: submittedTimestamp || new Date().toISOString(),
    },
  };

  // Compose final JSON
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

  return payload;
}
