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

    const setRiskEnabled = (enabled: boolean) => {
      riskRadios.forEach((r, idx) => {
        r.disabled = !enabled;
        r.required = enabled && idx === 0;
      });
    };

    const open = () => {
      if (details && !details.open) details.open = true;
      section.removeAttribute("data-acc-collapsed");
      setRiskEnabled(true);
    };

    const close = () => {
      if (details && details.open) details.open = false;
      section.setAttribute("data-acc-collapsed", "true");
      setRiskEnabled(false);
    };

    const onCategoryChange = () => {
      if (stroke?.checked) open();
      if (general?.checked) close();
    };

    stroke?.addEventListener("change", onCategoryChange);
    general?.addEventListener("change", onCategoryChange);

    // 👇 Prevent the label click from re-triggering the radio change;
    // just toggle collapse when already on Stroke
    const onStrokeLabelClick = (e: MouseEvent) => {
      if (stroke?.checked) {
        e.preventDefault(); // keeps radio checked
        if (section.getAttribute("data-acc-collapsed") === "true") open();
        else close();
      }
    };

    const onStrokeInputClick = () => {
      if (!stroke) return;
      if (stroke.checked) {
        // toggle collapsed when already selected
        if (section.getAttribute("data-acc-collapsed") === "true") open();
        else close();
      } else {
        setTimeout(() => {
          if (stroke.checked) open();
        }, 0);
      }
    };

    strokeLabel?.addEventListener("click", onStrokeLabelClick);
    stroke?.addEventListener("click", onStrokeInputClick);

    const onDoneClick = () => close();
    doneBtns.forEach((btn) => btn.addEventListener("click", onDoneClick));

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
