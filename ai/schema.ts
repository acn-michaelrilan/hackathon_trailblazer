/**
 * This file contains the complete JSON schema specification for the exercise plan output.
 * This schema is included in the AI prompt to ensure consistent, structured responses.
 */

import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

export const EXERCISE_PLAN_TS_SCHEMA = `
type ExercisePlanOutput = {
  exercise_plan: {
    plan_info: {
      plan_id: string; // Format: EP-YYYY-<2 Random Letters followed by 2 random numbers>-<3 random numbers>
      user_name: string;
      created_date?: string; // YYYY-MM-DD
      total_weeks?: number; // 1-52
      sessions_per_week?: number; // 1-7
      difficulty?: string; // e.g. beginner | intermediate | advanced
      primary_goal: string;
      safety_notes?: string[];
    };
    weekly_schedule: Array<{
      week?: number; // 1-based
      focus?: string; // Theme/Focus
      sessions: Array<{
        day: number; // 1-7
        title: string;
        duration_min?: number;
        session_status: string;
        completed_date?: string | null; // YYYY-MM-DD or null
        exercises: Array<{
          id: string; // Format: W[week]D[day]-EX[number] e.g. W1D1-EX001
          sessionExerciseId: string; // UUID of the session_exercises table row (empty string if not yet persisted)
          name: string;
          description: string; // Purpose and benefits
          steps: string[]; // Sequential numbered instructions
          video_url: string; // YouTube URL demonstrating the exercise should be search result for exercise name
          status: string;
          sets: number;
          reps: number;
          hold_sec?: number | null; // Use for time-based; null if rep-based
          rest_sec: number;
          equipment?: string[]; // Use "None" if bodyweight only
          tips?: string[]; // Form cues and common mistakes to avoid
          easier?: string; // Regression option
          harder?: string; // Progression option
          warnings?: string[]; // Safety warnings, contraindications, stop conditions
          completed_sets?: number; // Default 0
          notes?: string; // Default ""
        }>;
      }>;
    }>;
  };
};`;

const ExerciseSchema = z
  .object({
    id: z.string(),
    sessionExerciseId: z.string(),
    name: z.string(),
    description: z.string(),
    steps: z.array(z.string()),
    video_url: z.string(),
    status: z.string(),
    sets: z.number(),
    reps: z.number(),
    hold_sec: z.number().nullable().optional(),
    rest_sec: z.number(),
    equipment: z.array(z.string()).optional(),
    tips: z.array(z.string()).optional(),
    easier: z.string().optional(),
    harder: z.string().optional(),
    warnings: z.array(z.string()).optional(),
    completed_sets: z.number().optional(),
    notes: z.string().optional(),
  })
  .strict();

const SessionSchema = z
  .object({
    day: z.number(),
    title: z.string(),
    duration_min: z.number().optional(),
    session_status: z.string(),
    completed_date: z.string().nullable().optional(),
    exercises: z.array(ExerciseSchema),
  })
  .strict();

const WeeklyScheduleSchema = z
  .object({
    week: z.number().optional(),
    focus: z.string().optional(),
    sessions: z.array(SessionSchema),
  })
  .strict();

const PlanInfoSchema = z
  .object({
    plan_id: z.string(),
    user_name: z.string(),
    created_date: z.string().optional(),
    total_weeks: z.number().optional(),
    sessions_per_week: z.number().optional(),
    difficulty: z.string().optional(),
    primary_goal: z.string(),
    safety_notes: z.array(z.string()).optional(),
  })
  .strict();

export const EXERCISE_PLAN_ZOD_SCHEMA = z
  .object({
    exercise_plan: z
      .object({
        plan_info: PlanInfoSchema,
        weekly_schedule: z.array(WeeklyScheduleSchema),
      })
      .strict(),
  })
  .strict();

export type ExercisePlanOutput = z.infer<typeof EXERCISE_PLAN_ZOD_SCHEMA>;

export const EXERCISE_PLAN_JSON_SCHEMA = zodToJsonSchema(
  EXERCISE_PLAN_ZOD_SCHEMA,
  {
    name: "ExercisePlanOutput",
    $refStrategy: "none",
  },
);

type JsonSchemaWithDefinitions = {
  type?: string;
  definitions?: Record<string, { type?: string }>;
};

const schemaWithDefs = EXERCISE_PLAN_JSON_SCHEMA as JsonSchemaWithDefinitions;
export const EXERCISE_PLAN_JSON_SCHEMA_OBJECT =
  schemaWithDefs.type === "object"
    ? EXERCISE_PLAN_JSON_SCHEMA
    : (schemaWithDefs.definitions?.ExercisePlanOutput ??
      EXERCISE_PLAN_JSON_SCHEMA);

// Define the Profile schema
const ProfileSchema = z.object({
  user_id: z.string(),
});

// Define the Progress schema
const ProgressSchema = z.object({
  total_sessions: z.number(),
  completed_sessions: z.number(),
  completion_percent: z.number(),
  current_week: z.number(),
  current_day: z.number(),
  next_session_date: z.string(), // YYYY-MM-DD format
});

// Extended Exercise Plan Output with Profile and Progress
export const EXERCISE_PLAN_WITH_PROGRESS_ZOD_SCHEMA =
  EXERCISE_PLAN_ZOD_SCHEMA.extend({
    profile: ProfileSchema,
    progress: ProgressSchema,
  });

// Export the type
export type ExercisePlanWithProgress = z.infer<
  typeof EXERCISE_PLAN_WITH_PROGRESS_ZOD_SCHEMA
>;

// Export JSON schema if needed for API responses
export const EXERCISE_PLAN_WITH_PROGRESS_JSON_SCHEMA = zodToJsonSchema(
  EXERCISE_PLAN_WITH_PROGRESS_ZOD_SCHEMA,
  {
    name: "ExercisePlanWithProgress",
    $refStrategy: "none",
  },
);

const progressSchemaWithDefs =
  EXERCISE_PLAN_WITH_PROGRESS_JSON_SCHEMA as JsonSchemaWithDefinitions;
export const EXERCISE_PLAN_WITH_PROGRESS_JSON_SCHEMA_OBJECT =
  progressSchemaWithDefs.type === "object"
    ? EXERCISE_PLAN_WITH_PROGRESS_JSON_SCHEMA
    : (progressSchemaWithDefs.definitions?.ExercisePlanWithProgress ??
      EXERCISE_PLAN_WITH_PROGRESS_JSON_SCHEMA);
