// ./UserTypeAccordion.tsx
export default function UserTypeAccordion() {
  const usrClass = "usr-wrap"; // keep class name to match your styles

  return (
    <section
      className={usrClass}
      style={{ marginTop: 24 }}
      data-acc-collapsed="true"
    >
      <h2 style={{ color: "#1f3fae" }}>User Type and Risk Level</h2>

      {/* User Category (pills) */}
      <div style={{ marginTop: 8, marginBottom: 6 }}></div>

      <div className="choice-grid">
        {/* Choice 1 (Stroke) */}
        <div style={{ position: "relative", marginBottom: 12 }}>
          <input
            className="vh"
            type="radio"
            id="stroke_recovery_neurological"
            name="user_category"
            value="stroke_recovery_neurological"
          />
          <label className="pill" htmlFor="stroke_recovery_neurological">
            Stroke recovery / neurological condition
          </label>
        </div>

        {/* Choice 2 (General) */}
        <div style={{ position: "relative" }}>
          <input
            className="vh"
            type="radio"
            id="general_fitness"
            name="user_category"
            value="general_fitness_active_lifestyle"
          />
          <label className="pill" htmlFor="general_fitness">
            General fitness &amp; active lifestyle
          </label>
        </div>
      </div>

      {/* ===== Accordion (shown only when Stroke is selected) ===== */}
      <details className="acc" data-acc>
        <summary className="acc-summary">
          <span>Important Information</span>
          <svg
            className="chev"
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M12 15.5 6.5 10l1.4-1.4L12 12.7l4.1-4.1L17.5 10z"></path>
          </svg>
        </summary>

        <div className="acc-panel">
          <p>
            Since you selected{" "}
            <strong>Stroke recovery / neurological condition</strong>, please
            answer the following:
          </p>

          {/* Risk Level */}
          <div style={{ marginTop: 12 }}>
            <label style={{ whiteSpace: "nowrap", fontWeight: 600 }}>
              Risk Level
            </label>
            <div className="choice-row">
              <div style={{ position: "relative" }}>
                <input
                  className="vh"
                  type="radio"
                  id="risk_low"
                  name="risk_level"
                  value="low"
                  required
                />
                <label className="pill" htmlFor="risk_low">
                  Low
                </label>
              </div>
              <div style={{ position: "relative" }}>
                <input
                  className="vh"
                  type="radio"
                  id="risk_medium"
                  name="risk_level"
                  value="medium"
                />
                <label className="pill" htmlFor="risk_medium">
                  Medium
                </label>
              </div>
              <div style={{ position: "relative" }}>
                <input
                  className="vh"
                  type="radio"
                  id="risk_high"
                  name="risk_level"
                  value="high"
                />
                <label className="pill" htmlFor="risk_high">
                  High
                </label>
              </div>
            </div>
          </div>

          {/* Medical Profile */}
          <section className="modal-section">
            <h3 style={{ color: "#1f3fae", marginTop: 12, marginBottom: 6 }}>
              Medical Profile
            </h3>

            {/* PRIMARY CONDITIONS (checkbox grid) */}
            <p>Primary Medical Condition</p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 8,
                marginTop: 8,
              }}
            >
              <label>
                <input
                  type="checkbox"
                  name="medical_condition"
                  value="stroke"
                />{" "}
                Stroke Recovery
              </label>

              <label>
                <input
                  type="checkbox"
                  name="medical_condition"
                  value="neurological_condition"
                />
                Neurological Condition
              </label>

              <label>
                <input
                  type="checkbox"
                  name="medical_condition"
                  value="post_surgery"
                />
                Post-Surgery
              </label>

              <label>
                <input
                  type="checkbox"
                  name="medical_condition"
                  value="arthritis_joint_pain"
                />
                Arthritis / Joint Pain
              </label>

              <label>
                <input
                  type="checkbox"
                  name="medical_condition"
                  value="cardiovascular_condition"
                />
                Cardiovascular Condition
              </label>

              <label style={{ whiteSpace: "nowrap" }}>
                <input type="checkbox" name="medical_condition" value="other" />{" "}
                Other:
                <input
                  type="text"
                  name="medical_condition_other"
                  placeholder="Please specify"
                  style={{ marginLeft: 4 }}
                />
              </label>
            </div>

            {/* SUBTYPE */}
            <p style={{ marginTop: 12 }}>Subtype</p>
            <select
              name="medical_subtype"
              style={{ width: "100%", padding: 6 }}
            >
              <option value="">Select subtype</option>
              <option value="ischemic">Ischemic</option>
              <option value="hemorrhagic">Hemorrhagic</option>
              <option value="degenerative">Degenerative</option>
              <option value="injury_related">Injury-related</option>
              <option value="post_operative">
                Post-operative Complication
              </option>
            </select>

            {/* DATE OF DIAGNOSIS */}
            <p style={{ marginTop: 12 }}>Date of Diagnosis</p>
            <input
              type="date"
              name="date_of_diagnosis"
              style={{ width: "100%", padding: 6 }}
            />

            {/* AFFECTED SIDE */}
            <p style={{ marginTop: 12 }}>Affected Side</p>
            <select name="affected_side" style={{ width: "100%", padding: 6 }}>
              <option value="">Select side</option>
              <option value="left">Left</option>
              <option value="right">Right</option>
              <option value="bilateral">Bilateral</option>
              <option value="none">None</option>
            </select>

            {/* SEVERITY */}
            <p style={{ marginTop: 12 }}>Severity</p>
            <select name="severity" style={{ width: "100%", padding: 6 }}>
              <option value="">Select severity</option>
              <option value="mild">Mild</option>
              <option value="moderate">Moderate</option>
              <option value="severe">Severe</option>
            </select>
          </section>

          <hr style={{ margin: "16px 0" }} />

          {/* Functional Ability */}
          <section className="modal-section">
            <h3 style={{ color: "#1f3fae" }}>Functional Ability</h3>

            {/* Current Mobility Level */}
            <p>Current Mobility Level</p>
            <label>
              <input type="radio" name="mobility_level" value="Seated only" />{" "}
              Seated only
            </label>
            <label style={{ marginLeft: 12 }}>
              <input
                type="radio"
                name="mobility_level"
                value="Assisted standing"
              />{" "}
              Assisted standing
            </label>
            <label style={{ marginLeft: 12 }}>
              <input
                type="radio"
                name="mobility_level"
                value="Independent standing"
              />{" "}
              Independent standing
            </label>

            {/* Walking Ability */}
            <p style={{ marginTop: 16 }}>Walking Ability</p>
            <label>
              <input type="radio" name="walking_ability" value="Cannot walk" />{" "}
              Cannot walk
            </label>
            <label style={{ marginLeft: 12 }}>
              <input
                type="radio"
                name="walking_ability"
                value="With cane / walker"
              />{" "}
              With cane / walker
            </label>
            <label style={{ marginLeft: 12 }}>
              <input type="radio" name="walking_ability" value="Independent" />{" "}
              Independent
            </label>

            {/* Range of Motion */}
            <p style={{ marginTop: 16 }}>Range of Motion</p>
            <label>
              <input type="radio" name="range_of_motion" value="Limited" />{" "}
              Limited
            </label>
            <label style={{ marginLeft: 12 }}>
              <input type="radio" name="range_of_motion" value="Moderate" />{" "}
              Moderate
            </label>
            <label style={{ marginLeft: 12 }}>
              <input
                type="radio"
                name="range_of_motion"
                value="Full (with caution)"
              />{" "}
              Full (with caution)
            </label>

            {/* Assistive Device (dropdown) */}
            <p style={{ marginTop: 16 }}>Assistive Device</p>
            <select name="assistive_device" style={{ padding: 6 }}>
              <option value="">Select</option>
              <option value="none">None</option>
              <option value="cane">Cane</option>
              <option value="walker">Walker</option>
              <option value="crutches">Crutches</option>
              <option value="wheelchair">Wheelchair</option>
            </select>

            {/* Upper Limb Function */}
            <p style={{ marginTop: 16 }}>Upper Limb Function (Left)</p>
            <select name="upper_limb_left" style={{ padding: 6 }}>
              <option value="">Select</option>
              <option value="normal">Normal</option>
              <option value="limited">Limited</option>
              <option value="impaired">Impaired</option>
            </select>

            <p style={{ marginTop: 12 }}>Upper Limb Function (Right)</p>
            <select name="upper_limb_right" style={{ padding: 6 }}>
              <option value="">Select</option>
              <option value="normal">Normal</option>
              <option value="limited">Limited</option>
              <option value="impaired">Impaired</option>
            </select>
          </section>
        </div>

        <div className="acc-footer">
          <button type="button" className="btn btn-primary" data-acc-done>
            Done
          </button>
        </div>
      </details>
    </section>
  );
}
``;
