"use server";

import { createClient } from "@/backend/server";
import { InformationInputData } from "@/types";

/**
 * Static UUID mappings for common slug values.
 * These UUIDs are deterministic and will be consistent across inserts.
 */
const MOBILITY_LEVEL_UUIDS: Record<string, string> = {
  independent_standing: "a1b2c3d4-1111-4111-8111-111111111111",
  needs_assistance: "a1b2c3d4-1111-4111-8111-111111111112",
  wheelchair_bound: "a1b2c3d4-1111-4111-8111-111111111113",
  bedbound: "a1b2c3d4-1111-4111-8111-111111111114",
};

const WALKING_ABILITY_UUIDS: Record<string, string> = {
  independent_normal_pace: "b2c3d4e5-2222-4222-8222-222222222221",
  slow_pace: "b2c3d4e5-2222-4222-8222-222222222222",
  short_distances: "b2c3d4e5-2222-4222-8222-222222222223",
  needs_assistance: "b2c3d4e5-2222-4222-8222-222222222224",
  cannot_walk: "b2c3d4e5-2222-4222-8222-222222222225",
};

const ASSISTIVE_DEVICE_UUIDS: Record<string, string> = {
  none: "c3d4e5f6-3333-4333-8333-333333333331",
  cane: "c3d4e5f6-3333-4333-8333-333333333332",
  walker: "c3d4e5f6-3333-4333-8333-333333333333",
  wheelchair: "c3d4e5f6-3333-4333-8333-333333333334",
  crutches: "c3d4e5f6-3333-4333-8333-333333333335",
};

const MEDICAL_CONDITION_UUIDS: Record<string, string> = {
  stroke: "d4e5f6a1-4444-4444-8444-444444444441",
  parkinsons: "d4e5f6a1-4444-4444-8444-444444444442",
  multiple_sclerosis: "d4e5f6a1-4444-4444-8444-444444444443",
  arthritis: "d4e5f6a1-4444-4444-8444-444444444444",
  cardiac_rehab: "d4e5f6a1-4444-4444-8444-444444444445",
  copd: "d4e5f6a1-4444-4444-8444-444444444446",
  diabetes: "d4e5f6a1-4444-4444-8444-444444444447",
  general_fitness: "d4e5f6a1-4444-4444-8444-444444444448",
};

/**
 * Maps a slug to a UUID using the predefined mappings.
 * Returns null for "none", empty values, or unmapped slugs.
 */
const mapSlugToUuid = (
  slug: string | undefined | null,
  mappingTable: Record<string, string>,
  tableName: string,
): string | null => {
  if (!slug) return null;
  const normalized = slug.toLowerCase().trim();

  // "none" can map to the "none" UUID if it exists, or null
  if (normalized === "none" || normalized === "") {
    return mappingTable.none || null;
  }

  // Check if it's already a valid UUID format
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  if (uuidRegex.test(slug)) {
    return slug;
  }

  // Look up UUID from mapping
  const uuid = mappingTable[normalized];
  if (!uuid) {
    console.warn(
      `⚠️ No UUID mapping found for slug "${slug}" in ${tableName}. Returning null.`,
      `Available options: ${Object.keys(mappingTable).join(", ")}`,
    );
    return null;
  }

  return uuid;
};

export async function insertInformationInput(
  userData: InformationInputData,
  userId: string,
) {
  try {
    const supabase = await createClient();

    // ============================================================================
    // PHASE 1: Create independent tables (no FK dependencies on user_profile)
    // ============================================================================

    // 1. Medical Safety and Risk Flags
    const { data: safetyData, error: safetyErr } = await supabase
      .from("medical_safety_and_risk_flags")
      .insert({
        blood_pressure:
          userData.medical_safety_and_risk_flags.vitals.blood_pressure,
        resting_heart_rate:
          userData.medical_safety_and_risk_flags.vitals.resting_heart_rate.toString(),
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

    if (safetyErr) throw new Error(`Safety Flags Error: ${safetyErr.message}`);

    // 2. Exercise Preferences
    const { data: prefsData, error: prefsErr } = await supabase
      .from("exercise_preferences")
      .insert({
        preferred_session_length:
          userData.exercise_preferences_and_tolerance.preferred_session_length,
        preffered_intensity:
          userData.exercise_preferences_and_tolerance.preferred_intensity,
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

    if (prefsErr) throw new Error(`Preferences Error: ${prefsErr.message}`);

    // 3. Exercise Environment
    const { data: envData, error: envErr } = await supabase
      .from("exercise_environment")
      .insert({
        location: userData.exercise_environment.location,
        support_person_available:
          userData.exercise_environment.support_person_available,
        support_person_details:
          userData.exercise_environment.support_person_details,
      })
      .select("id")
      .single();

    if (envErr) throw new Error(`Environment Error: ${envErr.message}`);

    // 4. Medical Profile (Map condition slug to UUID)
    const primaryCondition = userData.medical_profile.conditions?.[0];
    const conditionId = primaryCondition?.type
      ? mapSlugToUuid(
          primaryCondition.type,
          MEDICAL_CONDITION_UUIDS,
          "medical_conditions",
        )
      : null;

    const { data: medProfileData, error: medProfileErr } = await supabase
      .from("medical_profile")
      .insert({
        condition_id: conditionId,
        medical_detail: userData.medical_profile.notes,
        date_of_diagnosis: primaryCondition?.date_of_diagnosis || null,
      })
      .select("id")
      .single();

    if (medProfileErr)
      throw new Error(`Medical Profile Error: ${medProfileErr.message}`);

    // 5. PT Info
    const { data: ptInfoData, error: ptInfoErr } = await supabase
      .from("user_pt_info")
      .insert({
        pt_history: userData.additional_information.physical_therapy_history
          ? "yes"
          : "no",
        pt_sessions_completed:
          userData.additional_information.pt_sessions_completed,
        pt_end_date: userData.additional_information.pt_end_date || null,
        clearance_for_exercise:
          userData.additional_information.clearance_for_exercise,
        physician_notes: userData.additional_information.physician_notes,
      })
      .select("id")
      .single();

    if (ptInfoErr) throw new Error(`PT Info Error: ${ptInfoErr.message}`);

    // ============================================================================
    // PHASE 2: Create/Update user_profile (central table)
    // ============================================================================

    const { error: profileErr } = await supabase.from("user_profile").upsert({
      id: userId, // Must match accounts.id (auth.users.id)
      dominant_side: userData.basic_profile.dominant_side,
      sex: userData.basic_profile.sex,
      height_cm: userData.basic_profile.height_cm,
      weight_kg: userData.basic_profile.weight_kg,
      primary_goal: userData.goals.primary_goal,
      medical_safety_and_risk_flags_id: safetyData.id,
      exercise_preferences_id: prefsData.id,
      exercise_environment_id: envData.id,
      medical_profile_id: medProfileData.id,
      pt_info_id: ptInfoData.id,
      // Note: upper_limb_function_id not set here because there's no FK constraint
      // in the schema, and we need to create user_profile before upper_limb_function
    });

    if (profileErr)
      throw new Error(`Profile Upsert Error: ${profileErr.message}`);

    // ============================================================================
    // PHASE 3: Create dependent tables (with FK to user_profile)
    // ============================================================================

    // 6. Upper Limb Function (FK: user_id → user_profile.id)
    const { error: upperLimbErr } = await supabase
      .from("upper_limb_function")
      .upsert({
        user_id: userId,
        left_arm: userData.functional_ability.upper_limb_function.left_arm,
        right_arm: userData.functional_ability.upper_limb_function.right_arm,
      });

    if (upperLimbErr)
      throw new Error(`Upper Limb Function Error: ${upperLimbErr.message}`);

    // 7. User Type and Risk (FK: user_id → user_profile.id)
    const { error: userTypeErr } = await supabase
      .from("user_type_and_risk")
      .upsert({
        user_id: userId,
        category: userData.user_type_and_risk.category,
        risk_level: userData.user_type_and_risk.risk_level,
      });

    if (userTypeErr)
      throw new Error(`User Type and Risk Error: ${userTypeErr.message}`);

    // 8. Functional Ability (FK: user_id → user_profile.id, Map slugs to UUIDs)
    const mobilityLevelId = mapSlugToUuid(
      userData.functional_ability.mobility_level,
      MOBILITY_LEVEL_UUIDS,
      "mobility_levels",
    );
    const walkingAbilityId = mapSlugToUuid(
      userData.functional_ability.walking_ability,
      WALKING_ABILITY_UUIDS,
      "walking_abilities",
    );
    const assistiveDeviceId = mapSlugToUuid(
      userData.functional_ability.assistive_device,
      ASSISTIVE_DEVICE_UUIDS,
      "assistive_devices",
    );

    const { error: funcErr } = await supabase
      .from("functional_ability")
      .upsert({
        user_id: userId,
        mobility_level_id: mobilityLevelId,
        walking_ability_id: walkingAbilityId,
        assistive_device_id: assistiveDeviceId,
        range_of_motion: userData.functional_ability.range_of_motion,
      });

    if (funcErr)
      throw new Error(`Functional Ability Error: ${funcErr.message}`);

    // 9. Stroke Vitals (if condition is stroke)
    if (primaryCondition?.type === "stroke") {
      const { error: strokeErr } = await supabase.from("stroke_vitals").upsert({
        user_id: userId,
        severity: primaryCondition.severity || null,
        affected_side: primaryCondition.affected_side || null,
        date_of_diagnosis: primaryCondition.date_of_diagnosis || null,
        sub_type: primaryCondition.subtype || null,
      });

      if (strokeErr)
        throw new Error(`Stroke Vitals Error: ${strokeErr.message}`);
    }

    // ============================================================================
    // PHASE 4: Create array/junction tables
    // Delete existing records first to prevent duplicates, then insert new ones
    // ============================================================================

    // 10. Secondary Goals
    // Delete existing goals first
    await supabase.from("user_secondary_goals").delete().eq("user_id", userId);

    // Insert new goals
    if (userData.goals.secondary_goals?.length > 0) {
      const { error: goalsErr } = await supabase
        .from("user_secondary_goals")
        .insert(
          userData.goals.secondary_goals.map((g) => ({
            user_id: userId,
            secondary_goal: g,
          })),
        );

      if (goalsErr)
        throw new Error(`Secondary Goals Error: ${goalsErr.message}`);
    }

    // 11. Specific Targets
    // Delete existing targets first
    await supabase.from("user_specific_targets").delete().eq("user_id", userId);

    // Insert new targets
    if (userData.specific_targets?.length > 0) {
      const { error: targetsErr } = await supabase
        .from("user_specific_targets")
        .insert(
          userData.specific_targets.map((t) => ({
            user_id: userId,
            specific_target: t,
          })),
        );

      if (targetsErr)
        throw new Error(`Specific Targets Error: ${targetsErr.message}`);
    }

    // 12. Equipment Available
    // Delete existing equipment first
    await supabase
      .from("user_equipment_available")
      .delete()
      .eq("user_id", userId);

    // Insert new equipment
    if (userData.exercise_environment.equipment_available?.length > 0) {
      const { error: equipErr } = await supabase
        .from("user_equipment_available")
        .insert(
          userData.exercise_environment.equipment_available.map((e) => ({
            user_id: userId,
            equipment: e,
          })),
        );

      if (equipErr)
        throw new Error(`Equipment Available Error: ${equipErr.message}`);
    }

    // 13. Medications
    // Delete existing medications first
    await supabase.from("user_medications").delete().eq("user_id", userId);

    // Insert new medications
    if (userData.additional_information.medications?.length > 0) {
      const { error: medsErr } = await supabase.from("user_medications").insert(
        userData.additional_information.medications.map((m) => ({
          user_id: userId,
          medication: m,
        })),
      );

      if (medsErr) throw new Error(`Medications Error: ${medsErr.message}`);
    }

    return { success: true };
  } catch (err) {
    console.error("❌ Insertion Failed:", err);
    return {
      success: false,
      error: err instanceof Error ? err.message : "Server error",
    };
  }
}
