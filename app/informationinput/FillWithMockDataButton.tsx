// app/informationinput/FillWithMockDataButton.tsx
"use client";

import { INPUT_MOCK_DATA_2 } from "@/lib/mockData";

type AnyField = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

const nextFrame = () =>
  new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));

const dispatchValueEvents = (el: AnyField) => {
  el.dispatchEvent(new Event("input", { bubbles: true }));
  el.dispatchEvent(new Event("change", { bubbles: true }));
};

const setFieldValue = (root: Element, name: string, value: string) => {
  const el = root.querySelector<AnyField>(`[name="${CSS.escape(name)}"]`);
  if (!el) return;
  el.value = value;
  dispatchValueEvents(el);
};

const setRadioValue = (root: Element, name: string, value: string) => {
  const el = root.querySelector<HTMLInputElement>(
    `input[type="radio"][name="${CSS.escape(name)}"][value="${CSS.escape(value)}"]`,
  );
  if (el && !el.checked) el.click();
};

const setRadioById = (root: Element, id: string) => {
  const el = root.querySelector<HTMLInputElement>(`#${CSS.escape(id)}`);
  if (el && !el.checked) el.click();
};

const setCheckboxByName = (root: Element, name: string, checked: boolean) => {
  const el = root.querySelector<HTMLInputElement>(
    `input[type="checkbox"][name="${CSS.escape(name)}"]`,
  );
  if (!el) return;
  if (el.checked !== checked) el.click();
};

const setCheckboxValues = (root: Element, name: string, values: string[]) => {
  const boxes = root.querySelectorAll<HTMLInputElement>(
    `input[type="checkbox"][name="${CSS.escape(name)}"]`,
  );
  boxes.forEach((box) => {
    const shouldCheck = values.includes(box.value);
    if (box.checked !== shouldCheck) box.click();
  });
};

export default function FillWithMockDataButton() {
  const onFill = async () => {
    const form = document.querySelector("form");
    if (!form) return;

    const data = INPUT_MOCK_DATA_2;

    // Ensure stroke accordion is active (rehab-style fields)
    setRadioById(form, "stroke_recovery_neurological");
    await nextFrame();

    // Basic profile
    setFieldValue(form, "name", data.basic_profile.name);
    setFieldValue(form, "age", String(data.basic_profile.age));
    setRadioValue(form, "sex", data.basic_profile.sex);
    setFieldValue(form, "height", String(data.basic_profile.height_cm));
    setFieldValue(form, "weight", String(data.basic_profile.weight_kg));
    setRadioValue(form, "dominant_side", data.basic_profile.dominant_side);

    // User type & risk
    setRadioById(form, "risk_medium_stroke");

    // Medical profile (best-effort mapping)
    setCheckboxByName(form, "medical_condition_cardiovascular_condition", true);
    await nextFrame();
    setFieldValue(form, "cardiovascular_condition_subtype", "hypertension");
    setFieldValue(form, "cardiovascular_condition_date", "2019-03-10");
    setFieldValue(form, "cardiovascular_condition_side", "none");
    setFieldValue(form, "cardiovascular_condition_severity", "mild");

    setCheckboxByName(form, "medical_condition_other", true);
    await nextFrame();
    setFieldValue(
      form,
      "other_condition_name",
      "type_2_diabetes; chronic_lower_back_pain; shoulder_strain",
    );
    setFieldValue(form, "other_subtype", "injury_related");
    setFieldValue(form, "other_date", "2024-06-01");
    setFieldValue(form, "other_side", "bilateral");
    setFieldValue(form, "other_severity", "moderate");

    // Functional ability
    setFieldValue(form, "mobility_level", "independent_standing");
    setFieldValue(form, "walking_ability", "independent");
    setFieldValue(form, "range_of_motion", "limited");
    setFieldValue(form, "upper_limb_left", "normal");
    setFieldValue(form, "upper_limb_right", "limited");
    setFieldValue(form, "assistive_device", "none");

    // Medical safety & risk flags
    setFieldValue(form, "bp_sys", "138");
    setFieldValue(form, "bp_dia", "88");
    setFieldValue(form, "resting_heart_rate", "72");
    setRadioValue(form, "heart_condition", "no");
    setRadioValue(form, "pacemaker_or_implant", "no");

    setRadioValue(form, "history_of_falls_last_6_months", "yes");
    await nextFrame();
    setFieldValue(form, "number_of_falls", "2");

    setRadioValue(form, "dizziness_or_fainting_episodes", "yes");
    await nextFrame();
    setFieldValue(
      form,
      "dizziness_details",
      "occasional dizziness when standing quickly, likely postural hypotension",
    );

    const painScale = form.querySelector<HTMLInputElement>(
      'input[name="pain_scale"]',
    );
    if (painScale) {
      painScale.value = "4";
      dispatchValueEvents(painScale);
    }
    setFieldValue(
      form,
      "pain_location",
      "lower back, occasional right shoulder",
    );

    // Current activity level
    setFieldValue(form, "current_activity_level", "sedentary_activity");
    setFieldValue(form, "activity_details", data.activity_details);
    setFieldValue(form, "primary_goal", "reduce_pain");
    setCheckboxByName(form, "goal_improve_balance", true);
    setCheckboxByName(form, "target_walk_longer", true);
    setCheckboxByName(form, "target_regain_balance_turning", true);

    // Exercise preferences & tolerance
    setFieldValue(form, "preferred_session_length", "20_30_min");
    setFieldValue(form, "preferred_intensity", "light");
    setFieldValue(form, "rest_tolerance", "frequent_breaks_needed");

    const restSelect = form.querySelector<HTMLSelectElement>(
      ".ept-wrap select:not([name])",
    );
    if (restSelect) {
      restSelect.value = "every 5-7 minutes";
      dispatchValueEvents(restSelect);
    }
    setFieldValue(form, "time_of_day_preference", "morning");
    setFieldValue(
      form,
      "fatigue_concerns",
      "tires_quickly_due_to_deconditioning",
    );

    // Exercise environment
    setFieldValue(form, "location", "home");
    setCheckboxValues(form, "equipment_available", [
      "resistance_band",
      "chair",
      "balance_aids_wall",
    ]);
    setRadioValue(form, "support_person_available", "yes");
    await nextFrame();
    setFieldValue(
      form,
      "support_person_details",
      "spouse available on weekends",
    );

    // Additional information
    const removeButtons = Array.from(
      form.querySelectorAll<HTMLButtonElement>(
        'button[aria-label^="Remove medication"]',
      ),
    );
    removeButtons.forEach((btn) => btn.click());

    const addMedButton = Array.from(
      form.querySelectorAll<HTMLButtonElement>('button[type="button"]'),
    ).find((btn) => btn.textContent?.includes("Add medication"));

    if (addMedButton) {
      data.additional_information.medications.forEach(() => {
        addMedButton.click();
      });
      await nextFrame();
      const medInputs = Array.from(
        form.querySelectorAll<HTMLInputElement>('input[name="medications"]'),
      );
      medInputs.forEach((input, idx) => {
        const value = data.additional_information.medications[idx];
        if (!value) return;
        input.value = value;
        dispatchValueEvents(input);
      });
    }

    setRadioValue(form, "physical_therapy_history", "yes");
    await nextFrame();
    setFieldValue(
      form,
      "pt_sessions_completed",
      String(data.additional_information.pt_sessions_completed),
    );
    setFieldValue(form, "pt_end_date", data.additional_information.pt_end_date);

    setRadioValue(form, "clearance_for_exercise", "yes");
    await nextFrame();
    setFieldValue(
      form,
      "physician_notes",
      data.additional_information.physician_notes,
    );
  };

  return (
    <button
      type="button"
      onClick={() => void onFill()}
      style={{
        border: "1px solid #d1d5db",
        background: "#ffffff",
        padding: "10px 16px",
        borderRadius: 10,
        cursor: "pointer",
        fontWeight: 600,
      }}
    >
      Fill With Mock Data 2
    </button>
  );
}
