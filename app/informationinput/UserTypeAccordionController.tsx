"use client";
import { useEffect } from "react";

export default function UserTypeAccordionController() {
  useEffect(() => {
    const section = document.querySelector<HTMLElement>(".usr-wrap");
    if (!section) return;

    const details =
      section.querySelector<HTMLDetailsElement>("details[data-acc]");
    const stroke = section.querySelector<HTMLInputElement>(
      "#stroke_recovery_neurological",
    );
    const general = section.querySelector<HTMLInputElement>("#general_fitness");
    const strokeLabel = section.querySelector<HTMLLabelElement>(
      'label[for="stroke_recovery_neurological"]',
    );
    const doneBtns = section.querySelectorAll<HTMLElement>("[data-acc-done]");
    const riskRadios = section.querySelectorAll<HTMLInputElement>(
      'input[name="risk_level"]',
    );

    const setAriaExpanded = (expanded: boolean) => {
      // reflect state on summary for a11y
      const summary = section.querySelector<HTMLElement>(".acc-summary");
      if (summary) summary.setAttribute("aria-expanded", String(expanded));
    };

    const setRiskRequired = (required: boolean) => {
      riskRadios.forEach((r, idx) => {
        // only make the first radio required for the group when needed
        r.required = required && idx === 0;
      });
    };

    const open = () => {
      if (details && !details.open) details.open = true;
      section.removeAttribute("data-acc-collapsed");
      setRiskRequired(true); // ✅ only require, don't disable
      setAriaExpanded(true);
    };

    const close = () => {
      if (details && details.open) details.open = false;
      section.setAttribute("data-acc-collapsed", "true");
      setRiskRequired(false); // ✅ keep enabled so the selected value submits
      setAriaExpanded(false);
    };

    const onCategoryChange = () => {
      if (stroke?.checked) open();
      if (general?.checked) close();
    };

    stroke?.addEventListener("change", onCategoryChange);
    general?.addEventListener("change", onCategoryChange);

    // Toggle collapse when Stroke label is clicked and Stroke is already selected
    const onStrokeLabelClick = (e: MouseEvent) => {
      if (stroke?.checked) {
        e.preventDefault(); // keeps radio checked; we just toggle collapse
        if (section.getAttribute("data-acc-collapsed") === "true") open();
        else close();
      }
    };

    // Clicking the radio itself should also toggle if it's already selected
    const onStrokeInputClick = () => {
      if (!stroke) return;
      if (stroke.checked) {
        // Toggle collapsed when already selected
        if (section.getAttribute("data-acc-collapsed") === "true") open();
        else close();
      } else {
        // If it becomes checked *after* this event tick
        setTimeout(() => {
          if (stroke.checked) open();
        }, 0);
      }
    };

    strokeLabel?.addEventListener("click", onStrokeLabelClick);
    stroke?.addEventListener("click", onStrokeInputClick);

    const onDoneClick = () => close();
    doneBtns.forEach((btn) => btn.addEventListener("click", onDoneClick));

    // Initialize based on current selection (and initial collapsed attribute)
    onCategoryChange();

    return () => {
      stroke?.removeEventListener("change", onCategoryChange);
      general?.removeEventListener("change", onCategoryChange);
      strokeLabel?.removeEventListener("click", onStrokeLabelClick);
      stroke?.removeEventListener("click", onStrokeInputClick);
      doneBtns.forEach((btn) => btn.removeEventListener("click", onDoneClick));
    };
  }, []);

  return null;
}
