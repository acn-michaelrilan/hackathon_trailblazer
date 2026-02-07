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
