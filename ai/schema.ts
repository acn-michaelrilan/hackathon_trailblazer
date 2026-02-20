/**
 * This file contains the complete JSON schema specification for the exercise plan output.
 * This schema is included in the AI prompt to ensure consistent, structured responses.
 */

export const EXERCISE_PLAN_TS_SCHEMA = `
type ExercisePlanOutput = {
  profile: {
    user_id: string; // UUID of the user
  };
  exercise_plan: {
    plan_info: {
      plan_id: string; // Format: EP-YYYY-XXXX-NNN
      user_name: string;
      created_date: string; // YYYY-MM-DD
      total_weeks: number; // 1-52
      sessions_per_week: number; // 1-7
      difficulty: 'beginner' | 'intermediate' | 'advanced';
      primary_goal: string;
      // Critical: Include medical precautions, contraindications, and supervision needs
      safety_notes: string[];
    };
    weekly_schedule: Array<{
      week: number; // 1-based
      focus: string; // Theme/Focus
      sessions: Array<{
        day: number; // 1-7
        title: string;
        duration_min: number;
        // 'not_started' for first unlocked session, 'locked' for future, 'completed' for finished
        session_status: 'not_started' | 'locked' | 'completed';
        completed_date: string | null; // YYYY-MM-DD or null
        exercises: Array<{
          id: string; // Format: W[week]D[day]-EX[number] e.g. W1D1-EX001
          sessionExerciseId: string; // UUID of the session_exercises table row (empty string if not yet persisted)
          name: string;
          description: string; // Purpose and benefits
          equipment: string[]; // Use "None" if bodyweight only
          steps: string[]; // Sequential numbered instructions
          sets: number;
          reps: number | null; // Use for count-based; null if time-based
          hold_sec: number | null; // Use for time-based; null if rep-based
          rest_sec: number;
          tips: string[]; // Form cues and common mistakes to avoid
          easier: string; // MANDATORY: Regression option
          harder: string; // MANDATORY: Progression option
          warnings: string[]; // Safety warnings, contraindications, stop conditions
          video_url: string; // YouTube URL demonstrating the exercise
          status: 'not_started' | 'in_progress' | 'completed' | 'locked';
          completed_sets?: number; // Default 0
          notes?: string; // Default ""
        }>;
      }>;
    }>;
    progress: {
      total_sessions: number; // Default 0
      completed_sessions: number; // Default 0
      completion_percent: number; // Default 0
      current_week: number;
      current_day: number;
      next_session_date: string; // YYYY-MM-DD
    };
  };
}`;
