// app/informationinput/ExercisePreferencesTolerance.tsx
"use client";

import { useState, useMemo } from "react";

export default function ExercisePreferencesTolerance() {
  const sectionClass = "ept-wrap";

  const [restPreset, setRestPreset] = useState("");
  const [customRest, setCustomRest] = useState("");

  const restFrequency = useMemo(() => {
    return restPreset === "custom" ? customRest.trim() : restPreset;
  }, [restPreset, customRest]);

  return (
    <section className={`modal-section ${sectionClass}`}>
      <h3 style={{ color: "#1f3fae" }}>Exercise Preferences & Tolerance</h3>

      {/* Preferred session length */}
      <div className="row two-col">
        <div>
          <p>Preferred session length</p>
          <select name="preferred_session_length">
            <option value="">Select</option>
            <option value="5_10_min">5–10 min</option>
            <option value="10_15_min">10–15 min</option>
            <option value="15_20_min">15–20 min</option>
            <option value="20_30_min">20–30 min</option>
          </select>
        </div>

        {/* Intensity */}
        <div>
          <p>Preferred intensity</p>
          <select name="preferred_intensity">
            <option value="">Select</option>
            <option value="very_light">Very light</option>
            <option value="light">Light</option>
            <option value="moderate">Moderate</option>
            <option value="vigorous">Vigorous</option>
          </select>
        </div>
      </div>

      {/* Rest tolerance + frequency */}
      <div className="row two-col">
        <div>
          <p>Rest tolerance</p>
          <select name="rest_tolerance">
            <option value="">Select</option>
            <option value="frequent_breaks_needed">
              Frequent breaks needed
            </option>
            <option value="normal_breaks">Normal breaks</option>
            <option value="minimal_breaks">Minimal breaks</option>
          </select>
        </div>

        <div>
          <p>Rest frequency</p>
          <select
            value={restPreset}
            onChange={(e) => setRestPreset(e.target.value)}
          >
            <option value="">Select</option>
            <option value="every 30 seconds">Every 30 seconds</option>
            <option value="every 1 min">Every 1 minute</option>
            <option value="every 5-7 minutes">Every 5–7 minutes</option>
            <option value="after each set">After each set</option>
            <option value="custom">Custom…</option>
          </select>

          {restPreset === "custom" && (
            <input
              type="text"
              placeholder=' e.g., "30 secs rest per set"'
              value={customRest}
              onChange={(e) => setCustomRest(e.target.value)}
              style={{ marginTop: 6 }}
            />
          )}
          <input type="hidden" name="rest_frequency" value={restFrequency} />
        </div>
      </div>

      {/* Time of day */}
      <div className="row">
        <p>Time of day preference</p>
        <select name="time_of_day_preference">
          <option value="">Select</option>
          <option value="morning">Morning</option>
          <option value="afternoon">Afternoon</option>
          <option value="evening">Evening</option>
        </select>
      </div>

      {/* Fatigue */}
      <div className="row">
        <p>Fatigue concerns</p>
        <textarea
          name="fatigue_concerns"
          rows={2}
          placeholder="describe if any..."
        />
      </div>
    </section>
  );
}
