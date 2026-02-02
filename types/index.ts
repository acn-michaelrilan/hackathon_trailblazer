export interface Exercise {
  id: string;
  name: string;
  description: string;
  steps: string[];
  sets: number;
  reps: number;
  video_url: string;
  status: string;
}

export interface Session {
  day: number;
  title: string;
  exercises: Exercise[];
  session_status: string;
}

export interface ExercisePlanData {
  exercise_plan: {
    plan_info: { user_name: string; primary_goal: string };
    weekly_schedule: { sessions: Session[] }[];
    progress: {
      completion_percent: number;
      current_week: number;
      current_day: number;
    };
  };
}
