"use server";

import { createClient } from "@/backend/server";
import { InformationInputData } from "@/types";

/**
 * Inserts the full mock data object into the normalized Supabase schema.
 * @param userData - The InformationInputData object containing all profile details.
 * @param userId - The UUID of the user (from supabase.auth.getUser()).
 */
export async function insertFunctionalAbility(
  userData: InformationInputData,
  userId: string,
) {
  try {
    const supabase = await createClient();

    console.log(
      "📤 Starting sequential insert for user:",
      userData.basic_profile.name,
    );

    // 1. Insert into Medical Safety (Table has no user_id, linked via profile)
    const { data: safetyData, error: safetyErr } = await supabase
      .from("medical_safety_and_risk_flags")
      .insert({
        blood_pressure:
          userData.medical_safety_and_risk_flags.vitals.blood_pressure,
        resting_heart_rate:
          userData.medical_safety_and_risk_flags.vitals.resting_heart_rate,
        heart_condition: userData.medical_safety_and_risk_flags.heart_condition,
        heart_condition_detail:
          userData.medical_safety_and_risk_flags.heart_condition_details,
        pace_maker:
          userData.medical_safety_and_risk_flags.pacemaker_or_implants,
        history_of_falls:
          userData.medical_safety_and_risk_flags.history_of_falls_last_6_months,
        number_of_falls: userData.medical_safety_and_risk_flags.number_of_falls,
        dizziness:
          userData.medical_safety_and_risk_flags.dizziness_or_fainting_episodes,
        dizziness_details:
          userData.medical_safety_and_risk_flags.dizziness_details,
        pain_scale: userData.medical_safety_and_risk_flags.pain_scale,
        pain_location: userData.medical_safety_and_risk_flags.pain_location,
        current_activity_level: userData.current_activity_level,
        activity_details: userData.activity_details,
      })
      .select("id")
      .single();

    if (safetyErr)
      throw new Error(`Safety Flags Insert Failed: ${safetyErr.message}`);

    // 2. Insert into Exercise Preferences (Table has no user_id, linked via profile)
    const { data: prefsData, error: prefsErr } = await supabase
      .from("exercise_preferences")
      .insert({
        preferred_session_length:
          userData.exercise_preferences_and_tolerance.preferred_session_length,
        preffered_intensity:
          userData.exercise_preferences_and_tolerance.preferred_intensity, // Typo in DB matched
        rest_tolerance:
          userData.exercise_preferences_and_tolerance.rest_tolerance,
        rest_frequency:
          userData.exercise_preferences_and_tolerance.rest_frequency,
        time_of_day_preference:
          userData.exercise_preferences_and_tolerance.time_of_day_preference,
        fatigue_concerns:
          userData.exercise_preferences_and_tolerance.fatigue_concerns,
      })
      .select("id")
      .single();

    if (prefsErr)
      throw new Error(`Preferences Insert Failed: ${prefsErr.message}`);

    // 3. Insert into User PT Info (Table has no user_id, linked via profile)
    const { data: ptData, error: ptErr } = await supabase
      .from("user_pt_info")
      .insert({
        pt_history: userData.additional_information.physical_therapy_history,
        pt_sessions_completed:
          userData.additional_information.pt_sessions_completed,
        pt_end_date: userData.additional_information.pt_end_date || null,
        clearance_for_exercise:
          userData.additional_information.clearance_for_exercise, // Corrected name
        physician_notes: userData.additional_information.physician_notes,
      })
      .select("id")
      .single();

    if (ptErr) throw new Error(`PT Info Insert Failed: ${ptErr.message}`);

    // 4. Map and Upsert 'user_profile' (linking the above IDs)
    const { error: profileErr } = await supabase.from("user_profile").upsert({
      id: userId,
      dominant_side: userData.basic_profile.dominant_side,
      sex: userData.basic_profile.sex,
      height_cm: userData.basic_profile.height_cm,
      weight_kg: userData.basic_profile.weight_kg,
      primary_goal: userData.goals.primary_goal,
      medical_safety_and_risk_flags_id: safetyData.id,
      exercise_preferences_id: prefsData.id,
      pt_info_id: ptData.id,
      // category is omitted here because DB expects UUID but input is string slug
    });

    if (profileErr)
      throw new Error(`Profile Upsert Failed: ${profileErr.message}`);

    // 5. Remaining Tables that DO contain user_id
    const secondaryInserts = await Promise.all([
      // Functional Ability (using corrected _id column names)
      supabase.from("functional_ability").upsert({
        user_id: userId,
        mobility_level_id: userData.functional_ability.mobility_level,
        walking_ability_id: userData.functional_ability.walking_ability,
        assistive_device_id: userData.functional_ability.assistive_device,
        range_of_motion: userData.functional_ability.range_of_motion,
      }),
      // User Type and Risk (where category is a string)
      supabase.from("user_type_and_risk").upsert({
        user_id: userId,
        category: userData.user_type_and_risk.category,
        risk_level: userData.user_type_and_risk.risk_level,
      }),
    ]);

    const secondaryErrors = secondaryInserts
      .filter((res) => res.error)
      .map((res) => res.error?.message);

    if (secondaryErrors.length > 0) {
      console.error("❌ Secondary Data Insertion Failed:", secondaryErrors);
      return { success: false, errors: secondaryErrors };
    }

    // 6. Handle array-based tables
    if (userData.goals.secondary_goals.length > 0) {
      const goalsPayload = userData.goals.secondary_goals.map((goal) => ({
        user_id: userId,
        secondary_goal: goal,
      }));
      await supabase.from("user_secondary_goals").insert(goalsPayload);
    }

    if (userData.specific_targets.length > 0) {
      const targetsPayload = userData.specific_targets.map((target) => ({
        user_id: userId,
        specific_target: target,
      }));
      await supabase.from("user_specific_targets").insert(targetsPayload);
    }

    console.log(
      "✅ All data successfully inserted for:",
      userData.basic_profile.name,
    );
    return { success: true };
  } catch (err) {
    console.error(
      "❌ Error during insertion:",
      err instanceof Error ? err.message : err,
    );
    return {
      success: false,
      error: err instanceof Error ? err.message : "Unexpected server error",
    };
  }
}
