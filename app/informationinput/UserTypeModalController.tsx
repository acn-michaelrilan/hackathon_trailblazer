"use client";
import { useEffect } from "react";

export default function UserTypeModalController() {
  useEffect(() => {
    const section = document.querySelector<HTMLElement>(".usr-wrap");
    if (!section) return;

    const stroke = section.querySelector<HTMLInputElement>(
      "#stroke_recovery_neurological",
    );
    const general = section.querySelector<HTMLInputElement>("#general_fitness");
    const strokeLabel = section.querySelector<HTMLLabelElement>(
      'label[for="stroke_recovery_neurological"]',
    );
    const backdrop = section.querySelector<HTMLDivElement>(".modal-backdrop");
    const modal = section.querySelector<HTMLDivElement>(".modal");
    const closeables =
      section.querySelectorAll<HTMLElement>("[data-close-modal]");

    const open = () => section.setAttribute("data-open", "true");
    const close = () => section.removeAttribute("data-open");

    const modalInputs = () =>
      modal?.querySelectorAll<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >("input, textarea, select") ?? [];

    const clearModalInputs = () => {
      modalInputs().forEach((el) => {
        if (el instanceof HTMLInputElement) {
          if (el.type === "radio" || el.type === "checkbox") el.checked = false;
          else el.value = "";
        } else {
          el.value = "";
        }
      });
    };

    const setRiskRequired = (required: boolean) => {
      const risks =
        modal?.querySelectorAll<HTMLInputElement>('input[name="risk_level"]') ??
        [];
      risks.forEach((r) =>
        required
          ? r.setAttribute("required", "true")
          : r.removeAttribute("required"),
      );
    };

    // Open/close on category change
    const onCategoryChange = () => {
      if (stroke?.checked) {
        open();
        setRiskRequired(true);
      } else if (general?.checked) {
        setRiskRequired(false);
        clearModalInputs(); // clear modal inputs when switching to General
        close();
      }
    };

    stroke?.addEventListener("change", onCategoryChange);
    general?.addEventListener("change", onCategoryChange);

    // Also open when user clicks the Stroke label even if already selected.
    const onStrokeLabelClick = () => {
      if (stroke?.checked) {
        open();
      } else {
        // In case the browser applies checked state after click
        setTimeout(() => {
          if (stroke?.checked) open();
        }, 0);
      }
    };
    strokeLabel?.addEventListener("click", onStrokeLabelClick);

    // Keyboard support: Space/Enter on the label should re-open if Stroke remains selected.
    const onStrokeLabelKeyDown = (e: KeyboardEvent) => {
      if (e.key === " " || e.key === "Enter") {
        setTimeout(() => {
          if (stroke?.checked) open();
        }, 0);
      }
    };
    strokeLabel?.addEventListener("keydown", onStrokeLabelKeyDown as any);

    // Close via footer/header buttons
    const onCloseButtonClick = (btn: Element) => () => {
      const action = btn.getAttribute("data-close-modal")?.toLowerCase();

      if (action === "discard") {
        // Clear modal inputs (Risk Level + Medical Profile + Functional Ability)
        clearModalInputs();
        // Uncheck BOTH category radios so group returns to "no selection" (user_category = null)
        if (stroke) stroke.checked = false;
        if (general) general.checked = false;
        // Since no category is selected, Risk Level is not required
        setRiskRequired(false);
      }
      // If action === "keep": keep selections and inputs as-is

      // Close the modal UI
      close();
    };

    closeables.forEach((btn) =>
      btn.addEventListener("click", onCloseButtonClick(btn)),
    );

    // Click outside (backdrop) closes but keeps data
    const onBackdropClick = (e: MouseEvent) => {
      if (e.target === backdrop) close();
    };
    backdrop?.addEventListener("click", onBackdropClick);

    // ESC closes but keeps data
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onEsc);

    // Initialize once on mount
    onCategoryChange();

    return () => {
      stroke?.removeEventListener("change", onCategoryChange);
      general?.removeEventListener("change", onCategoryChange);
      strokeLabel?.removeEventListener("click", onStrokeLabelClick);
      strokeLabel?.removeEventListener("keydown", onStrokeLabelKeyDown as any);
      closeables.forEach((btn) =>
        btn.removeEventListener("click", onCloseButtonClick(btn)),
      );
      backdrop?.removeEventListener("click", onBackdropClick);
      window.removeEventListener("keydown", onEsc);
    };
  }, []);

  return null;
}
