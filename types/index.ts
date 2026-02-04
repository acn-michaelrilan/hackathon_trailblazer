export interface Exercise {
  id: string;
  name: string;
  description: string;
  steps: string[];
  sets: number;
  reps: number;
  video_url: string;
  status: string;
  equipment?: string[];
  hold_sec?: number | null;
  rest_sec?: number;
  tips?: string[];
  easier?: string;
  harder?: string;
  warnings?: string[];
  completed_sets?: number;
  notes?: string;
}

export interface Session {
  day: number;
  title: string;
  exercises: Exercise[];
  session_status: string;
  duration_min?: number;
  completed_date?: string | null;
}

export interface ExercisePlanData {
  exercise_plan: {
    plan_info: {
      plan_id?: string;
      user_name: string;
      primary_goal: string;
      created_date?: string;
      total_weeks?: number;
      sessions_per_week?: number;
      difficulty?: string;
      safety_notes?: string[];
    };
    weekly_schedule: {
      week?: number;
      focus?: string;
      sessions: Session[];
    }[];
    progress: {
      total_sessions?: number;
      completed_sessions?: number;
      completion_percent: number;
      current_week: number;
      current_day: number;
      next_session_date?: string;
    };
  };
}
