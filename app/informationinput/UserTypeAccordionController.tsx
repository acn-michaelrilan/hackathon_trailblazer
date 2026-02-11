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

    // Helper: set aria-expanded per-accordion
    const setAriaExpanded = (
      which: "stroke" | "general",
      expanded: boolean,
    ) => {
      const details = which === "stroke" ? strokeDetails : generalDetails;
      const summary = details?.querySelector<HTMLElement>(".acc-summary");
      if (summary) summary.setAttribute("aria-expanded", String(expanded));
    };

    // Helper: make risk radios required only inside active accordion
    const setRiskRequired = (which: "stroke" | "general" | "none") => {
      // reset both
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
      // Only the first radio in the active group must be required
      Array.from(radios).forEach((r, idx) => (r.required = idx === 0));
    };

    const collapseAll = () => {
      section.setAttribute("data-acc-collapsed", "true");
      section.removeAttribute("data-acc-open"); // <-- clear active key

      if (strokeDetails) strokeDetails.open = false;
      if (generalDetails) generalDetails.open = false;

      setAriaExpanded("stroke", false);
      setAriaExpanded("general", false);
      setRiskRequired("none");
    };

    const openWhich = (which: "stroke" | "general") => {
      // Mark active accordion
      section.removeAttribute("data-acc-collapsed");
      section.setAttribute("data-acc-open", which); // <-- set active key

      if (which === "stroke") {
        if (strokeDetails && !strokeDetails.open) strokeDetails.open = true;
        if (generalDetails && generalDetails.open) generalDetails.open = false;

        setAriaExpanded("stroke", true);
        setAriaExpanded("general", false);
        setRiskRequired("stroke");
      } else {
        if (generalDetails && !generalDetails.open) generalDetails.open = true;
        if (strokeDetails && strokeDetails.open) strokeDetails.open = false;

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

    // Toggle collapse when clicking the label of already-selected pill
    const onStrokeLabelClick = (e: MouseEvent) => {
      if (stroke?.checked) {
        e.preventDefault();
        // Toggle state
        if (section.getAttribute("data-acc-collapsed") === "true")
          openWhich("stroke");
        else collapseAll();
      }
    };
    const onGeneralLabelClick = (e: MouseEvent) => {
      if (general?.checked) {
        e.preventDefault();
        if (section.getAttribute("data-acc-collapsed") === "true")
          openWhich("general");
        else collapseAll();
      }
    };

    // Clicking radio itself when already selected toggles collapse
    const onStrokeInputClick = () => {
      if (!stroke) return;
      if (stroke.checked) {
        if (section.getAttribute("data-acc-collapsed") === "true")
          openWhich("stroke");
        else collapseAll();
      } else {
        setTimeout(() => {
          if (stroke.checked) openWhich("stroke");
        }, 0);
      }
    };
    const onGeneralInputClick = () => {
      if (!general) return;
      if (general.checked) {
        if (section.getAttribute("data-acc-collapsed") === "true")
          openWhich("general");
        else collapseAll();
      } else {
        setTimeout(() => {
          if (general.checked) openWhich("general");
        }, 0);
      }
    };

    // Done buttons close everything (you could also close only the active)
    const onDoneClick = () => collapseAll();

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
    };
  }, []);

  return null;
}
