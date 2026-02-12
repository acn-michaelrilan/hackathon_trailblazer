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

    // On first load, disable both until a category is chosen (optional safety)
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
      section.removeAttribute("data-acc-ui"); // clear hidden state

      if (strokeDetails) strokeDetails.open = false;
      if (generalDetails) generalDetails.open = false;

      // Disable both when collapsed
      setFieldsDisabled(strokeDetails, true);
      setFieldsDisabled(generalDetails, true);

      setAriaExpanded("stroke", false);
      setAriaExpanded("general", false);
      setRiskRequired("none");
    };

    // NEW: show UI again (remove hidden switch)
    const showUI = () => {
      section.removeAttribute("data-acc-ui");
    };

    // NEW: hide the accordion UI, but keep active inputs enabled
    const hideUIKeepActive = () => {
      const openKey = section.getAttribute("data-acc-open");
      if (openKey === "stroke") {
        // close details visually
        if (strokeDetails) strokeDetails.open = false;
        // keep active enabled; inactive disabled
        setFieldsDisabled(strokeDetails, false);
        setFieldsDisabled(generalDetails, true);
        setAriaExpanded("stroke", false);
      } else if (openKey === "general") {
        if (generalDetails) generalDetails.open = false;
        setFieldsDisabled(generalDetails, false);
        setFieldsDisabled(strokeDetails, true);
        setAriaExpanded("general", false);
      }
      // mark the UI as hidden (CSS hides both accordions)
      section.setAttribute("data-acc-ui", "hidden");
      // keep data-acc-open so we know which set is active and which fields must stay enabled
      section.removeAttribute("data-acc-collapsed");
    };

    const openWhich = (which: "stroke" | "general") => {
      section.removeAttribute("data-acc-collapsed");
      section.setAttribute("data-acc-open", which);
      showUI(); // make sure UI is visible when opening

      if (which === "stroke") {
        if (strokeDetails && !strokeDetails.open) strokeDetails.open = true;
        if (generalDetails && generalDetails.open) generalDetails.open = false;

        // Enable stroke, disable general
        setFieldsDisabled(strokeDetails, false);
        setFieldsDisabled(generalDetails, true);

        setAriaExpanded("stroke", true);
        setAriaExpanded("general", false);
        setRiskRequired("stroke");
      } else {
        if (generalDetails && !generalDetails.open) generalDetails.open = true;
        if (strokeDetails && strokeDetails.open) strokeDetails.open = false;

        // Enable general, disable stroke
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

    // When already selected category label is clicked -> hide UI but keep active enabled
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

    // Clicking the radio when already selected -> hide UI but keep active enabled
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

    // Done buttons -> hide UI but DO NOT disable active fields
    const onDoneClick = () => hideUIKeepActive();

    // Safety: ensure active fields are enabled right before submit
    const form = section.closest("form");
    const onFormSubmit = () => {
      const openKey = section.getAttribute("data-acc-open");
      if (openKey === "general") {
        setFieldsDisabled(generalDetails, false);
        setFieldsDisabled(strokeDetails, true);
      } else if (openKey === "stroke") {
        setFieldsDisabled(strokeDetails, false);
        setFieldsDisabled(generalDetails, true);
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
