// app/informationinput/UserTypeAccordionController.tsx
"use client";

import { useEffect } from "react";

export default function UserTypeAccordionController() {
  useEffect(() => {
    const section = document.querySelector<HTMLElement>(".usr-wrap");
    if (!section) return;

    // Two separate details
    const strokeDetails = section.querySelector<HTMLDetailsElement>(
      'details[data-acc="stroke"]',
    );
    const generalDetails = section.querySelector<HTMLDetailsElement>(
      'details[data-acc="general"]',
    );

    // Radios
    const stroke = section.querySelector<HTMLInputElement>(
      "#stroke_recovery_neurological",
    );
    const general = section.querySelector<HTMLInputElement>("#general_fitness");

    // Labels
    const strokeLabel = section.querySelector<HTMLLabelElement>(
      'label[for="stroke_recovery_neurological"]',
    );
    const generalLabel = section.querySelector<HTMLLabelElement>(
      'label[for="general_fitness"]',
    );

    // Done buttons
    const doneBtns = section.querySelectorAll<HTMLElement>("[data-acc-done]");

    // Enable/disable all fields inside a details element
    const setFieldsDisabled = (root: Element | null, disabled: boolean) => {
      if (!root) return;
      const fields = root.querySelectorAll<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >("input, select, textarea");
      fields.forEach((el) => (el.disabled = disabled));
    };

    // On first load, disable both until a category is chosen
    setFieldsDisabled(strokeDetails, true);
    setFieldsDisabled(generalDetails, true);

    const setAriaExpanded = (
      which: "stroke" | "general",
      expanded: boolean,
    ) => {
      const details = which === "stroke" ? strokeDetails : generalDetails;
      const summary = details?.querySelector<HTMLElement>(".acc-summary");
      if (summary) summary.setAttribute("aria-expanded", String(expanded));
    };

    /**
     * Risk required:
     * Because both accordions use name="risk_level", we make ONLY the active accordion's
     * first radio required (that makes the whole group required).
     */
    const setRiskRequired = (which: "stroke" | "general" | "none") => {
      const all = section.querySelectorAll<HTMLInputElement>(
        'details[data-acc] input[type="radio"][name="risk_level"]',
      );
      all.forEach((r) => (r.required = false));

      if (which === "none") return;

      const scope = which === "stroke" ? strokeDetails : generalDetails;
      const radios =
        scope?.querySelectorAll<HTMLInputElement>(
          'input[type="radio"][name="risk_level"]',
        ) ?? [];

      Array.from(radios).forEach((r, idx) => (r.required = idx === 0));
    };

    const collapseAll = () => {
      section.setAttribute("data-acc-collapsed", "true");
      section.removeAttribute("data-acc-open");
      section.removeAttribute("data-acc-ui");

      if (strokeDetails) strokeDetails.open = false;
      if (generalDetails) generalDetails.open = false;

      setFieldsDisabled(strokeDetails, true);
      setFieldsDisabled(generalDetails, true);

      setAriaExpanded("stroke", false);
      setAriaExpanded("general", false);
      setRiskRequired("none");
    };

    const showUI = () => {
      section.removeAttribute("data-acc-ui");
    };

    const hideUIKeepActive = () => {
      const openKey = section.getAttribute("data-acc-open");
      if (openKey === "stroke") {
        if (strokeDetails) strokeDetails.open = false;
        setFieldsDisabled(strokeDetails, false);
        setFieldsDisabled(generalDetails, true);
        setAriaExpanded("stroke", false);
      } else if (openKey === "general") {
        if (generalDetails) generalDetails.open = false;
        setFieldsDisabled(generalDetails, false);
        setFieldsDisabled(strokeDetails, true);
        setAriaExpanded("general", false);
      }
      section.setAttribute("data-acc-ui", "hidden");
      section.removeAttribute("data-acc-collapsed");
    };

    const openWhich = (which: "stroke" | "general") => {
      section.removeAttribute("data-acc-collapsed");
      section.setAttribute("data-acc-open", which);
      showUI();

      if (which === "stroke") {
        if (strokeDetails && !strokeDetails.open) strokeDetails.open = true;
        if (generalDetails && generalDetails.open) generalDetails.open = false;

        setFieldsDisabled(strokeDetails, false);
        setFieldsDisabled(generalDetails, true);

        setAriaExpanded("stroke", true);
        setAriaExpanded("general", false);
        setRiskRequired("stroke");
      } else {
        if (generalDetails && !generalDetails.open) generalDetails.open = true;
        if (strokeDetails && strokeDetails.open) strokeDetails.open = false;

        setFieldsDisabled(generalDetails, false);
        setFieldsDisabled(strokeDetails, true);

        setAriaExpanded("general", true);
        setAriaExpanded("stroke", false);
        setRiskRequired("general");
      }
    };

    const onCategoryChange = () => {
      if (stroke?.checked) openWhich("stroke");
      else if (general?.checked) openWhich("general");
      else collapseAll();
    };

    const onStrokeLabelClick = (e: MouseEvent) => {
      if (stroke?.checked) {
        e.preventDefault();
        hideUIKeepActive();
      }
    };

    const onGeneralLabelClick = (e: MouseEvent) => {
      if (general?.checked) {
        e.preventDefault();
        hideUIKeepActive();
      }
    };

    const onStrokeInputClick = () => {
      if (!stroke) return;
      if (stroke.checked) {
        hideUIKeepActive();
      } else {
        setTimeout(() => {
          if (stroke.checked) openWhich("stroke");
        }, 0);
      }
    };

    const onGeneralInputClick = () => {
      if (!general) return;
      if (general.checked) {
        hideUIKeepActive();
      } else {
        setTimeout(() => {
          if (general.checked) openWhich("general");
        }, 0);
      }
    };

    // -------------------------------
    // ✅ VALIDATION HELPERS (Stroke)
    // -------------------------------

    const getConditionCheckboxes = (root: Element | null) => {
      if (!root) return [];
      return Array.from(
        root.querySelectorAll<HTMLInputElement>(
          'input[type="checkbox"][name^="medical_condition_"]',
        ),
      );
    };

    const hasPrimaryMedicalConditionChecked = (root: Element | null) => {
      const checks = getConditionCheckboxes(root);
      return checks.some((c) => c.checked);
    };

    const otherTextIsValid = (root: Element | null) => {
      if (!root) return true;

      const otherChecked = root.querySelector<HTMLInputElement>(
        'input[type="checkbox"][name="medical_condition_other"]',
      )?.checked;

      if (!otherChecked) return true;

      const otherText = root.querySelector<HTMLInputElement>(
        'input[name="other_condition_name"]',
      )?.value;

      return Boolean(otherText && otherText.trim().length > 0);
    };

    /**
     * Applies custom validity to:
     * - First condition checkbox if none selected (group-level validation)
     * - Other text input if Other checked but empty
     */
    const applyStrokeCustomValidity = (root: Element | null) => {
      if (!root) return;

      const checks = getConditionCheckboxes(root);
      const firstCheck = checks[0];

      // Clear first
      if (firstCheck) firstCheck.setCustomValidity("");

      const otherInput = root.querySelector<HTMLInputElement>(
        'input[name="other_condition_name"]',
      );
      if (otherInput) otherInput.setCustomValidity("");

      // Apply group-level message
      if (!hasPrimaryMedicalConditionChecked(root) && firstCheck) {
        firstCheck.setCustomValidity(
          "Please select at least 1 Primary Medical Condition.",
        );
      }

      // Apply Other-specific message
      const otherChecked = root.querySelector<HTMLInputElement>(
        'input[type="checkbox"][name="medical_condition_other"]',
      )?.checked;

      if (otherChecked && otherInput && !otherInput.value.trim()) {
        otherInput.setCustomValidity('Please specify the "Other" condition.');
      }
    };

    const clearStrokeCustomValidity = (root: Element | null) => {
      if (!root) return;

      const checks = getConditionCheckboxes(root);
      checks.forEach((c) => c.setCustomValidity(""));

      const otherInput = root.querySelector<HTMLInputElement>(
        'input[name="other_condition_name"]',
      );
      if (otherInput) otherInput.setCustomValidity("");
    };

    const findFirstInvalidField = (root: Element | null) => {
      if (!root) return null;

      // only enabled fields matter; CSS :invalid ignores disabled fields anyway
      return root.querySelector<HTMLElement>(
        "input:invalid, select:invalid, textarea:invalid",
      );
    };

    const validateDetailsGeneric = (details: HTMLDetailsElement | null) => {
      if (!details) return true;

      const invalid = findFirstInvalidField(details);
      if (invalid) {
        showUI();
        details.open = true;

        invalid.scrollIntoView({ behavior: "smooth", block: "center" });
        // @ts-ignore
        invalid.reportValidity?.();
        // @ts-ignore
        invalid.focus?.();

        return false;
      }

      return true;
    };

    /**
     * Validate a details section:
     * - Apply custom validity (group validations)
     * - Find first invalid native field (required, etc.)
     * - Report validity + focus
     */
    const validateDetails = (details: HTMLDetailsElement | null) => {
      if (!details) return true;

      // Ensure custom rules are applied (group-level / Other text)
      applyStrokeCustomValidity(details);

      const invalid = findFirstInvalidField(details);
      if (invalid) {
        // Keep UI visible and section open
        showUI();
        details.open = true;

        invalid.scrollIntoView({ behavior: "smooth", block: "center" });

        // show native tooltip message where possible
        // @ts-ignore
        invalid.reportValidity?.();
        // @ts-ignore
        invalid.focus?.();

        // Clear custom validity after reporting so it doesn't stick
        // (Browser keeps validity state for current interaction anyway)
        clearStrokeCustomValidity(details);
        return false;
      }

      clearStrokeCustomValidity(details);
      return true;
    };

    // -------------------------------
    // ✅ DONE CLICK (block close if invalid)
    // -------------------------------
    const onDoneClick = (e: Event) => {
      const btn = e.currentTarget as HTMLElement | null;
      const details = btn?.closest(
        "details[data-acc]",
      ) as HTMLDetailsElement | null;
      const which = details?.getAttribute("data-acc");

      if (which === "stroke") {
        setFieldsDisabled(strokeDetails, false);
        setFieldsDisabled(generalDetails, true);

        const ok = validateDetails(strokeDetails);
        if (!ok) return;
      }

      if (which === "general") {
        setFieldsDisabled(generalDetails, false);
        setFieldsDisabled(strokeDetails, true);

        const ok = validateDetailsGeneric(generalDetails);
        if (!ok) return;
      }

      hideUIKeepActive();
    };

    // -------------------------------
    // ✅ FORM SUBMIT (final safety net)
    // -------------------------------
    const form = section.closest("form");
    const onFormSubmit = (e: Event) => {
      const openKey = section.getAttribute("data-acc-open");

      if (openKey === "stroke") {
        setFieldsDisabled(strokeDetails, false);
        setFieldsDisabled(generalDetails, true);

        const ok = validateDetails(strokeDetails);
        if (!ok) {
          e.preventDefault();
          return;
        }
      } else if (openKey === "general") {
        setFieldsDisabled(generalDetails, false);
        setFieldsDisabled(strokeDetails, true);

        const ok = validateDetailsGeneric(generalDetails);
        if (!ok) {
          e.preventDefault();
          return;
        }
      }
    };
    form?.addEventListener("submit", onFormSubmit);

    // Wire up
    stroke?.addEventListener("change", onCategoryChange);
    general?.addEventListener("change", onCategoryChange);
    stroke?.addEventListener("click", onStrokeInputClick);
    general?.addEventListener("click", onGeneralInputClick);
    strokeLabel?.addEventListener("click", onStrokeLabelClick);
    generalLabel?.addEventListener("click", onGeneralLabelClick);
    doneBtns.forEach((btn) => btn.addEventListener("click", onDoneClick));

    // Initialize
    onCategoryChange();

    return () => {
      stroke?.removeEventListener("change", onCategoryChange);
      general?.removeEventListener("change", onCategoryChange);
      stroke?.removeEventListener("click", onStrokeInputClick);
      general?.removeEventListener("click", onGeneralInputClick);
      strokeLabel?.removeEventListener("click", onStrokeLabelClick);
      generalLabel?.removeEventListener("click", onGeneralLabelClick);
      doneBtns.forEach((btn) => btn.removeEventListener("click", onDoneClick));
      form?.removeEventListener("submit", onFormSubmit);
    };
  }, []);

  return null;
}
