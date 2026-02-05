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

          {/* Medical Profile (checkbox grid) */}
          <section className="modal-section">
            <h3 style={{ color: "#1f3fae", marginTop: 12, marginBottom: 6 }}>
              Medical Profile
            </h3>
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
                  value="Stroke Recovery"
                />{" "}
                Stroke Recovery
              </label>
              <label>
                <input
                  type="checkbox"
                  name="medical_condition"
                  value="Post-Surgery Rehabilitation"
                />{" "}
                Post-Surgery
              </label>
              <label>
                <input
                  type="checkbox"
                  name="medical_condition"
                  value="Arthritis / Joint Pain"
                />{" "}
                Arthritis / Joint Pain
              </label>
              <label>
                <input
                  type="checkbox"
                  name="medical_condition"
                  value="Neurological Condition"
                />{" "}
                Neurological
              </label>
              <label>
                <input
                  type="checkbox"
                  name="medical_condition"
                  value="General Wellness"
                />{" "}
                General Wellness
              </label>
              <label>
                <input type="checkbox" name="medical_condition" value="Other" />{" "}
                Other
              </label>
            </div>
          </section>

          <hr style={{ margin: "16px 0" }} />

          {/* Functional Ability */}
          <section className="modal-section">
            <h3 style={{ color: "#1f3fae" }}>Functional Ability</h3>

            <p>Current Mobility Level</p>
            <label>
              <input type="radio" name="mobility" value="Seated only" /> Seated
              only
            </label>
            <label style={{ marginLeft: 12 }}>
              <input type="radio" name="mobility" value="Assisted standing" />{" "}
              Assisted standing
            </label>
            <label style={{ marginLeft: 12 }}>
              <input
                type="radio"
                name="mobility"
                value="Independent standing"
              />{" "}
              Independent standing
            </label>

            <p style={{ marginTop: 16 }}>Walking Ability</p>
            <label>
              <input type="radio" name="walking" value="Cannot walk" /> Cannot
              walk
            </label>
            <label style={{ marginLeft: 12 }}>
              <input type="radio" name="walking" value="With cane / walker" />{" "}
              With cane / walker
            </label>
            <label style={{ marginLeft: 12 }}>
              <input type="radio" name="walking" value="Independent" />{" "}
              Independent
            </label>

            <p style={{ marginTop: 16 }}>Range of Motion</p>
            <label>
              <input type="radio" name="rom" value="Limited" /> Limited
            </label>
            <label style={{ marginLeft: 12 }}>
              <input type="radio" name="rom" value="Moderate" /> Moderate
            </label>
            <label style={{ marginLeft: 12 }}>
              <input type="radio" name="rom" value="Full (with caution)" /> Full
              (with caution)
            </label>
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
