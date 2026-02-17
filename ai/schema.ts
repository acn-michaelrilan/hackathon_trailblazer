/**
 * This file contains the complete JSON schema specification for the exercise plan output.
 * This schema is included in the AI prompt to ensure consistent, structured responses.
 */

export const EXERCISE_PLAN_TS_SCHEMA = `
type ExercisePlanOutput = {
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
        // Status defaults: 'not_started'
        session_status: 'not_started' | 'in_progress' | 'completed';
        completed_date: string | null;
        exercises: Array<{
          // Format: W[week]D[day]-EX[number] (e.g., W1D1-EX001)
          id: string; 
          name: string;
          description: string; // Purpose and benefits
          equipment: string[]; // Use "None" if bodyweight
          steps: string[]; // Numbered sequential instructions
          sets: number;
          // Use reps for counts, null for time-based.
          reps: number | null; 
          // Use hold_sec for time-based, null for reps.
          hold_sec: number | null; 
          rest_sec: number;
          tips: string[]; // Form cues and mistakes to avoid
          easier: string; // MANDATORY: Regression option
          harder: string; // MANDATORY: Progression option
          // Safety warnings, contraindications, stop conditions
          warnings: string[]; 
          // Format: https://youtube.com/watch?v=[exercise-name]
          video_url: string; 
          status: 'not_started' | 'in_progress' | 'completed';
          completed_sets: number; // Default 0
          notes: string; // Default ""
        }>;
      }>;
    }>;
    progress: {
      total_sessions: number;
      completed_sessions: number;
      completion_percent: number;
      current_week: number;
      current_day: number;
      next_session_date: string; // YYYY-MM-DD
    };
  };
}`;
