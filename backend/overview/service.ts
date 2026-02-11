import { createClient } from "@/backend/server";
import {
  ExercisePlanData,
  SessionData,
  PlanWeek,
  ExercisePlan,
  SessionExercise,
} from "../../types";

export async function getExercisePlanData(
  planId: string,
): Promise<ExercisePlanData | null> {
  const supabase = await createClient();
  // Fetch plan with nested sessions and exercises
  const { data: plan, error } = (await supabase
    .from("exercise_plans")
    .select(
      `
      *,
      plan_safety_notes (note),
      plan_progress (*),
      plan_weeks (
        week_num,
        focus,
        plan_sessions (
          session_id,
          day,
          title,
          duration_min,
          session_status,
          completed_date,
          session_exercises (
            session_exercise_id, position, sets, reps, hold_sec, rest_sec, status, completed_sets, notes,
            exercise_definitions (
              exercise_id, name, description, easier, harder, video_url,
              exercise_equipment (equipment),
              exercise_steps (step_text),
              exercise_tips (tip_text),
              exercise_warnings (warning_text)
            )
          )
        )
      )
    `,
    )
    .eq("plan_id", planId)
    .single()) as { data: ExercisePlan | null; error: unknown };

  if (error || !plan) {
    console.error(
      "Supabase Fetch Error:",
      error instanceof Error ? error.message : String(error),
    );
    return null;
  }

  // Transform to match ExercisePlanData interface
  const result: ExercisePlanData = {
    exercise_plan: {
      plan_info: {
        plan_id: plan.plan_id,
        user_name: plan.user_name,
        created_date: plan.created_date,
        total_weeks: plan.total_weeks,
        sessions_per_week: plan.sessions_per_week,
        difficulty: plan.difficulty,
        primary_goal: plan.primary_goal,
        safety_notes: plan.plan_safety_notes.map((sn) => sn.note),
      },
      weekly_schedule: plan.plan_weeks.map((week: PlanWeek) => ({
        week: week.week_num,
        focus: week.focus,
        sessions: week.plan_sessions
          .sort((a: SessionData, b: SessionData) => a.day - b.day)
          .map((sess: SessionData) => {
            console.log(
              `📅 SESSION - Week ${week.week_num}, Day ${sess.day}: "${sess.title}" (${sess.duration_min}min), Status: ${sess.session_status}`,
            );

            const session = {
              day: sess.day,
              title: sess.title,
              duration_min: sess.duration_min,
              session_status: sess.session_status.trim(),
              completed_date: sess.completed_date,
              exercises: sess.session_exercises
                .sort(
                  (a: SessionExercise, b: SessionExercise) =>
                    a.position - b.position,
                )
                .map((se: SessionExercise) => {
                  const exercise = {
                    id: se.exercise_definitions.exercise_id,
                    sessionExerciseId: se.session_exercise_id,
                    name: se.exercise_definitions.name,
                    description: se.exercise_definitions.description,
                    steps: se.exercise_definitions.exercise_steps.map(
                      (s) => s.step_text,
                    ),
                    sets: se.sets,
                    reps: se.reps,
                    video_url: se.exercise_definitions.video_url,
                    status: se.status.trim(),
                    equipment: se.exercise_definitions.exercise_equipment.map(
                      (e) => e.equipment,
                    ),
                    hold_sec: se.hold_sec,
                    rest_sec: se.rest_sec,
                    tips: se.exercise_definitions.exercise_tips.map(
                      (t) => t.tip_text,
                    ),
                    easier: se.exercise_definitions.easier,
                    harder: se.exercise_definitions.harder,
                    warnings: se.exercise_definitions.exercise_warnings.map(
                      (w) => w.warning_text,
                    ),
                    completed_sets: se.completed_sets,
                    notes: se.notes,
                  };
                  // Log each exercise being processed
                  // console.log(`  💪 Exercise - Day ${sess.day}:`, exercise);
                  return exercise;
                }),
            };

            // console.log(
            //   `  Total exercises for Day ${sess.day}: ${session.exercises.length}`,
            // );
            return session;
          }),
      })),
      progress: {
        total_sessions: plan.plan_progress?.total_sessions || 0,
        completed_sessions: plan.plan_progress?.completed_sessions || 0,
        completion_percent: plan.plan_progress?.completion_percent || 0,
        current_week: plan.plan_progress?.current_week || 0,
        current_day: plan.plan_progress?.current_day || 0,
        next_session_date: plan.plan_progress?.next_session_date,
      },
    },
  };

  // Log final transformed data
  // console.log("✅ FINAL TRANSFORMED DATA READY:", result);
  return result;
}
