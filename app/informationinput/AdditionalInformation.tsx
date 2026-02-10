// app/informationinput/AdditionalInformation.tsx
"use client";

import React, { useEffect, useState } from "react";

type Med = { id: string; value: string };

function makeId(): string {
  // Safe UUID with fallback for older environments
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `med_${Math.random().toString(36).slice(2)}_${Date.now()}`;
}

export default function AdditionalInformation() {
  // ✅ Explicit generic types to avoid never[]
  const [meds, setMeds] = useState<Med[]>([]);
  const [hasPT, setHasPT] = useState<"" | "yes" | "no">("");
  const [hasClearance, setHasClearance] = useState<"" | "yes" | "no">("");
  const [timestamp, setTimestamp] = useState<string>("");

  // Set timestamp right before submit
  useEffect(() => {
    const form = document.querySelector<HTMLFormElement>("form");
    if (!form) return;

    const onSubmit = () => setTimestamp(new Date().toISOString());
    form.addEventListener("submit", onSubmit);
    return () => form.removeEventListener("submit", onSubmit);
  }, []);

  const addMed = () =>
    setMeds((prev: Med[]) => [...prev, { id: makeId(), value: "" }]);

  const removeMed = (id: string) =>
    setMeds((prev: Med[]) => prev.filter((m) => m.id !== id));

  const updateMed = (id: string, value: string) =>
    setMeds((prev: Med[]) =>
      prev.map((m) => (m.id === id ? { ...m, value } : m)),
    );

  return (
    <section className="modal-section addl-wrap">
      <h3 style={{ color: "#1f3fae" }}>Additional Information</h3>

      {/* Medications */}
      <div className="row" style={{ marginTop: 12 }}>
        <p>Medications</p>
        <p className="hint" style={{ color: "#6b7280", fontSize: 12 }}>
          Add one per line. Click “+ Add medication” for more entries.
        </p>

        <div style={{ display: "grid", gap: 8, marginTop: 6 }}>
          {meds.map((m, idx) => (
            <div
              key={m.id}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr auto",
                gap: 8,
              }}
            >
              <input
                type="text"
                name="medications"
                placeholder={`Medication ${idx + 1}`}
                value={m.value}
                onChange={(e) => updateMed(m.id, e.target.value)}
                style={{ padding: 6 }}
              />
              <button
                type="button"
                onClick={() => removeMed(m.id)}
                style={{
                  border: "1px solid #e5e7eb",
                  background: "#fff",
                  padding: "6px 10px",
                  borderRadius: 8,
                  cursor: "pointer",
                }}
                aria-label={`Remove medication ${idx + 1}`}
                title="Remove"
              >
                Remove
              </button>
            </div>
          ))}

          <div>
            <button
              type="button"
              onClick={addMed}
              style={{
                border: "1px solid #e5e7eb",
                background: "#fff",
                padding: "6px 10px",
                borderRadius: 8,
                cursor: "pointer",
              }}
            >
              + Add medication
            </button>
          </div>
        </div>
      </div>

      {/* Physical therapy history */}
      <div className="row" style={{ marginTop: 12 }}>
        <p>Physical therapy history</p>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <label>
            <input
              type="radio"
              name="physical_therapy_history"
              value="yes"
              checked={hasPT === "yes"}
              onChange={() => setHasPT("yes")}
            />{" "}
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="physical_therapy_history"
              value="no"
              checked={hasPT === "no"}
              onChange={() => setHasPT("no")}
            />{" "}
            No
          </label>
        </div>

        {hasPT === "yes" ? (
          <div style={{ display: "grid", gap: 8, marginTop: 8 }}>
            <div>
              <p>PT sessions completed</p>
              <input
                type="number"
                name="pt_sessions_completed"
                min={0}
                placeholder="e.g., 24"
                style={{ width: "100%", padding: 6 }}
              />
            </div>
            <div>
              <p>Last PT end date</p>
              <input
                type="date"
                name="pt_end_date"
                style={{ width: "100%", padding: 6 }}
              />
            </div>
          </div>
        ) : (
          <>
            {/* prevent stale values when switching back to "No" */}
            <input type="hidden" name="pt_sessions_completed" value="" />
            <input type="hidden" name="pt_end_date" value="" />
          </>
        )}
      </div>

      {/* Clearance for exercise */}
      <div className="row" style={{ marginTop: 12 }}>
        <p>Physician clearance for exercise</p>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <label>
            <input
              type="radio"
              name="clearance_for_exercise"
              value="yes"
              checked={hasClearance === "yes"}
              onChange={() => setHasClearance("yes")}
            />{" "}
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="clearance_for_exercise"
              value="no"
              checked={hasClearance === "no"}
              onChange={() => setHasClearance("no")}
            />{" "}
            No
          </label>
        </div>

        {hasClearance === "yes" ? (
          <div style={{ marginTop: 8 }}>
            <p>Physician notes</p>
            <textarea
              name="physician_notes"
              rows={2}
              placeholder="Enter physician notes…"
              style={{ width: "100%", padding: 6 }}
            />
          </div>
        ) : (
          <input type="hidden" name="physician_notes" value="" />
        )}
      </div>

      {/* Timestamp (auto-set on submit) */}
      <input type="hidden" name="timestamp" value={timestamp} />
    </section>
  );
}
