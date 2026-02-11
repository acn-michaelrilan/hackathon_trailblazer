import type { ExercisePlanData } from "@/types";

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
                description:
                  "Arm Raises is a gentle mobility and strengthening exercise that targets the muscles of the shoulders and arms.",
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
                description:
                  "Hand Open and Close targets the muscles of the hands, fingers, and forearm for dexterity.",
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
                description:
                  "Seated Marching is a low-impact exercise that strengthens the hip flexors and core.",
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
};

export const INPUT_MOCK_DATA = {
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
    pacemaker_or_implants: false,
    history_of_falls_last_6_months: false,
    dizziness_or_fainting_episodes: false,
    pain_scale: 0,
  },

  current_activity_level: "active",

  activity_details:
    "runs 3x per week (5K), yoga 2x per week, strength training 2x per week",

  goals: {
    primary_goal: "increase_strength",
    secondary_goals: ["improve_endurance", "general_wellness"],
    specific_targets: [
      "run a half marathon in 6 months",
      "increase core strength",
      "maintain flexibility",
    ],
  },

  exercise_preferences_and_tolerance: {
    preferred_session_length: "30_plus_min",
    preferred_intensity: "moderate",
    rest_tolerance: "normal",
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
  },

  additional_information: {
    medications: [],
    physical_therapy_history: false,
    clearance_for_exercise: true,
    physician_notes: "annual checkup - all clear",
  },

  timestamp: "2026-02-02T10:30:00Z",
};
