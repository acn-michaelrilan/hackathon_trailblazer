// Core domain models
export interface Equipment {
  equipment: string;
}

export interface Step {
  step_text: string;
}

export interface Tip {
  tip_text: string;
}

export interface Warning {
  warning_text: string;
}

export interface SafetyNote {
  note: string;
}

// Exercise-related types
export interface ExerciseDefinition {
  exercise_id: string;
  name: string;
  description: string;
  easier?: string;
  harder?: string;
  video_url: string;
  exercise_equipment: Equipment[];
  exercise_steps: Step[];
  exercise_tips: Tip[];
  exercise_warnings: Warning[];
}

export interface ExerciseProgress {
  completed_sets?: number;
  notes?: string;
}

export interface ExerciseParams {
  sets: number;
  reps: number;
  hold_sec?: number | null;
  rest_sec: number;
}

export interface SessionExercise extends ExerciseParams, ExerciseProgress {
  position: number;
  status: string;
  exercise_definitions: ExerciseDefinition;
}

// Flattened exercise for UI use (combines definition + session data)
export interface Exercise extends ExerciseParams, ExerciseProgress {
  id: string;
  sessionExerciseId: string; // UUID of the session_exercises table row
  name: string;
  description: string;
  steps: string[];
  video_url: string;
  status: string;
  equipment?: string[];
  tips?: string[];
  easier?: string;
  harder?: string;
  warnings?: string[];
}

// Session-related types
export interface SessionProgress {
  session_status: string;
  completed_date?: string | null;
}

export interface SessionBase {
  day: number;
  title: string;
  duration_min?: number;
}

export interface Session extends SessionBase, SessionProgress {
  exercises: Exercise[];
}

export interface SessionData extends SessionBase, SessionProgress {
  session_id: string;
  session_exercises: SessionExercise[];
}

// Plan-related types
export interface PlanWeek {
  week_num: number;
  focus: string;
  plan_sessions: SessionData[];
}

export interface PlanProgress {
  total_sessions?: number;
  completed_sessions?: number;
  completion_percent: number;
  current_week: number;
  current_day: number;
  next_session_date?: string;
}

export interface PlanMetadata {
  plan_id: string;
  user_name: string;
  created_date?: string;
  total_weeks?: number;
  sessions_per_week?: number;
  difficulty?: string;
  primary_goal: string;
}

export interface ExercisePlan extends PlanMetadata {
  plan_safety_notes: SafetyNote[];
  plan_progress?: PlanProgress;
  plan_weeks: PlanWeek[];
}

// Alternative plan structure (seems to be a different representation)
export interface WeeklySchedule {
  week?: number;
  focus?: string;
  sessions: Session[];
}

export interface ExercisePlanData {
  exercise_plan: {
    plan_info: PlanMetadata & {
      safety_notes?: string[];
    };
    weekly_schedule: WeeklySchedule[];
    progress: PlanProgress;
  };
}

// Component props
export interface ExerciseViewProps {
  selectedDay: number;
  activeEx: Exercise | null;
  onComplete?: () => void;
}

// Type guards
export function isSessionData(
  session: Session | SessionData,
): session is SessionData {
  return "session_id" in session && "session_exercises" in session;
}

export function isSession(session: Session | SessionData): session is Session {
  return "exercises" in session && !("session_id" in session);
}
