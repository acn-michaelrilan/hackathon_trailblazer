import type { ExercisePlanData, InformationInputData } from "@/types";

export const MOCK_DATA: ExercisePlanData = {
  exercise_plan: {
    plan_info: {
      plan_id: "mock-plan-001",
      user_name: "John Doe",
      primary_goal: "Stroke Recovery",
      total_weeks: 4,
      sessions_per_week: 3,
    },
    weekly_schedule: [
      {
        week: 1,
        focus: "Foundation Building",
        sessions: [
          {
            day: 1,
            title: "Arm & Legs Foundations",
            session_status: "completed",
            duration_min: 45,
            exercises: [
              {
                id: "1",
                sessionExerciseId: "se-001",
                name: "Arm Raises",
                sets: 3,
                reps: 10,
                rest_sec: 30,
                description: "Arm Raises is a gentle mobility and strengthening exercise that targets the muscles of the shoulders and arms.",
                steps: [
                  "Start Position: Sit or stand with arms relaxed.",
                  "Lift arms slowly to shoulder height.",
                  "Hold for 2 seconds.",
                  "Lower with control.",
                ],
                video_url: "#",
                status: "completed",
                completed_sets: 3,
              },
              {
                id: "2",
                sessionExerciseId: "se-002",
                name: "Hand Open and Close",
                sets: 3,
                reps: 10,
                rest_sec: 20,
                description: "Hand Open and Close targets the muscles of the hands, fingers, and forearm for dexterity.",
                steps: [
                  "Spread fingers wide.",
                  "Close into a firm fist.",
                  "Repeat with control.",
                ],
                video_url: "#",
                status: "completed",
                completed_sets: 3,
              },
              {
                id: "3",
                sessionExerciseId: "se-003",
                name: "Seated Marching",
                sets: 3,
                reps: 10,
                rest_sec: 30,
                description: "Seated Marching is a low-impact exercise that strengthens the hip flexors and core.",
                steps: [
                  "Sit upright in a sturdy chair.",
                  "Lift right knee toward chest.",
                  "Lower and repeat with left knee.",
                ],
                video_url: "#",
                status: "not_started",
              },
            ],
          },
          {
            day: 2,
            title: "Core Stability",
            session_status: "in_progress",
            duration_min: 40,
            exercises: [],
          },
          {
            day: 3,
            title: "Full Body Mobility",
            session_status: "locked",
            duration_min: 50,
            exercises: [],
          },
        ],
      },
    ],
    progress: {
      completion_percent: 25,
      current_week: 1,
      current_day: 1,
      total_sessions: 12,
      completed_sessions: 3,
    },
  },
  progress: {
    total_sesssions: 0,
    completed_sessions: 0,
    completion_percent: 0,
    current_week: 0,
    current_day: 0,
    next_session_date: ""
  },
  profile: {
    user_id: ""
  }
};

export const INPUT_MOCK_DATA: InformationInputData = {
  user_type_and_risk: {
    category: "general_fitness_active_lifestyle",
    risk_level: "low",
  },

  basic_profile: {
    name: "Sarah K.",
    age: 34,
    sex: "female",
    height_cm: 165,
    weight_kg: 60,
    dominant_side: "right",
  },

  medical_profile: {
    conditions: [],
    notes: "no significant medical history",
  },

  functional_ability: {
    mobility_level: "independent_standing",
    walking_ability: "independent_normal_pace",
    assistive_device: "none",
    upper_limb_function: {
      left_arm: "near_normal",
      right_arm: "near_normal",
    },
    range_of_motion: "full_with_caution",
  },

  medical_safety_and_risk_flags: {
    vitals: {
      blood_pressure: "118/75",
      resting_heart_rate: 58,
    },
    heart_condition: false,
    heart_condition_details: "none",
    pacemaker_or_implants: false,
    history_of_falls_last_6_months: false,
    number_of_falls: 0,
    dizziness_or_fainting_episodes: false,
    dizziness_details: "none",
    pain_scale: 0,
    pain_location: "none",
  },

  current_activity_level: "active",

  activity_details:
    "runs 3x per week (5K), yoga 2x per week, strength training 2x per week",

  goals: {
    primary_goal: "increase_strength",
    secondary_goals: ["improve_endurance", "general_wellness"],
  },

  specific_targets: [
    "run a half marathon in 6 months",
    "increase core strength",
    "maintain flexibility",
  ],

  exercise_preferences_and_tolerance: {
    preferred_session_length: "30_plus_min",
    preferred_intensity: "moderate",
    rest_tolerance: "normal",
    rest_frequency: "normal",
    time_of_day_preference: "early_morning",
    fatigue_concerns: "none",
  },

  exercise_environment: {
    location: "gym",
    equipment_available: [
      "resistance_band",
      "light_weights",
      "balance_aids_wall",
    ],
    support_person_available: false,
    support_person_details: "none",
  },

  additional_information: {
    medications: [],
    physical_therapy_history: false,
    pt_sessions_completed: 0,
    pt_end_date: "",
    clearance_for_exercise: true,
    physician_notes: "annual checkup - all clear",
    timestamp: "2026-02-02T10:30:00Z",
  },
};

export const INPUT_MOCK_DATA_2: InformationInputData = {
  user_type_and_risk: {
    category: "rehabilitation_post_injury",
    risk_level: "moderate",
  },
  basic_profile: {
    name: "James T.",
    age: 58,
    sex: "male",
    height_cm: 180,
    weight_kg: 92,
    dominant_side: "right",
  },
  medical_profile: {
    conditions: [
      {
        type: "cardiovascular",
        subtype: "hypertension",
        date_of_diagnosis: "2019-03-10",
        affected_side: "none",
        severity: "mild",
      },
      {
        type: "metabolic",
        subtype: "type_2_diabetes",
        date_of_diagnosis: "2021-07-22",
        affected_side: "none",
        severity: "moderate",
      },
      {
        type: "musculoskeletal",
        subtype: "chronic_lower_back_pain",
        date_of_diagnosis: "2024-06-01",
        affected_side: "bilateral",
        severity: "moderate",
      },
      {
        type: "musculoskeletal",
        subtype: "shoulder_strain",
        date_of_diagnosis: "2024-09-15",
        affected_side: "right",
        severity: "mild",
      },
    ],
    notes:
      "all conditions managed with medication; cleared for low-to-moderate exercise by physician",
  },
  functional_ability: {
    mobility_level: "independent_with_limitations",
    walking_ability: "independent_slow_pace",
    assistive_device: "none",
    upper_limb_function: {
      left_arm: "near_normal",
      right_arm: "limited",
    },
    range_of_motion: "limited_pain_free_range",
  },
  medical_safety_and_risk_flags: {
    vitals: {
      blood_pressure: "138/88",
      resting_heart_rate: 72,
    },
    heart_condition: false,
    heart_condition_details: "none",
    pacemaker_or_implants: false,
    history_of_falls_last_6_months: true,
    number_of_falls: 2,
    dizziness_or_fainting_episodes: true,
    dizziness_details:
      "occasional dizziness when standing quickly, likely postural hypotension",
    pain_scale: 4,
    pain_location: "lower back, occasional right shoulder",
  },
  current_activity_level: "sedentary",
  activity_details:
    "mostly desk work, occasional short walks, no structured exercise in the past 18 months due to back injury",
  goals: {
    primary_goal: "pain_management_and_mobility",
    secondary_goals: ["weight_loss", "improve_balance", "general_wellness"],
  },
  specific_targets: [
    "reduce lower back pain from 4/10 to 2/10 within 3 months",
    "lose 8–10 kg over 6 months",
    "improve balance and reduce fall risk",
    "walk 30 minutes continuously without discomfort",
  ],
  exercise_preferences_and_tolerance: {
    preferred_session_length: "15_to_30_min",
    preferred_intensity: "low",
    rest_tolerance: "frequent_rest_needed",
    rest_frequency: "high",
    time_of_day_preference: "late_morning",
    fatigue_concerns: "tires_quickly_due_to_deconditioning",
  },
  exercise_environment: {
    location: "home",
    equipment_available: [
      "resistance_band",
      "chair",
      "balance_aids_wall",
      "foam_roller",
    ],
    support_person_available: true,
    support_person_details: "spouse available on weekends",
  },
  additional_information: {
    medications: ["metformin", "lisinopril", "ibuprofen_as_needed"],
    physical_therapy_history: true,
    pt_sessions_completed: 12,
    pt_end_date: "2025-09-15",
    clearance_for_exercise: true,
    physician_notes:
      "cleared for low-to-moderate intensity exercise; avoid heavy lifting and high-impact activity; monitor blood pressure pre/post exercise",
    timestamp: "2026-02-10T09:00:00Z",
  },
};
