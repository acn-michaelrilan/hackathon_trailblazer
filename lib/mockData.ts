import type { Exercise, ExercisePlanData } from "@/types";

export const MOCK_DATA: ExercisePlanData = {
  exercise_plan: {
    plan_info: { user_name: "John Doe", primary_goal: "Stroke Recovery" },
    weekly_schedule: [
      {
        sessions: [
          {
            day: 1,
            title: "Arm & Legs Foundations",
            session_status: "in_progress",
            exercises: [
              {
                id: "1",
                name: "Arm Raises",
                sets: 3,
                reps: 10,
                description:
                  "Arm Raises is a gentle mobility and strengthening exercise that targets the muscles of the shoulders and arms.",
                steps: [
                  "Start Position: Sit or stand with arms relaxed.",
                  "Lift arms slowly to shoulder height.",
                  "Hold for 2 seconds.",
                  "Lower with control.",
                ],
                video_url: "#",
                status: "not_started",
              },
              {
                id: "2",
                name: "Hand Open and Close",
                sets: 3,
                reps: 10,
                description:
                  "Hand Open and Close targets the muscles of the hands, fingers, and forearm for dexterity.",
                steps: [
                  "Spread fingers wide.",
                  "Close into a firm fist.",
                  "Repeat with control.",
                ],
                video_url: "#",
                status: "not_started",
              },
              {
                id: "3",
                name: "Seated Marching",
                sets: 3,
                reps: 10,
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
            exercises: [],
            session_status: "unlocked",
          },
          {
            day: 3,
            title: "Full Body Mobility",
            exercises: [],
            session_status: "unlocked",
          },
          {
            day: 4,
            title: "Abs and Back Strengthening",
            exercises: [],
            session_status: "locked",
          },
        ],
      },
    ],
    progress: { completion_percent: 25, current_week: 1, current_day: 1 },
  },
};
