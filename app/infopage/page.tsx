import UserTypeModalController from "./UserTypeModalController";
export default function infopage() {
  async function save(formData: FormData) {
    "use server";

    const basic_profile = {
      name: (formData.get("name") ?? "").toString().trim(),
      age: formData.get("age") ? Number(formData.get("age")) : null,
      sex: formData.get("sex")?.toString() || null,
      height_cm: formData.get("height") ? Number(formData.get("height")) : null,
      weight_kg: formData.get("weight") ? Number(formData.get("weight")) : null,
      dominant_side: formData.get("dominant_side")?.toString() || null,
    };

    const medical_profile = {
      conditions: formData.getAll("medical_condition").map((v) => v.toString()),
    };

    const functional_ability = {
      mobility: formData.get("mobility")?.toString() || null,
      walking: formData.get("walking")?.toString() || null,
      rom: formData.get("rom")?.toString() || null,
    };

    const user_type_and_risk = {
      category: formData.get("user_category")?.toString() || null,
      risk_level: formData.get("risk_level")?.toString() || null, // optional (not shown yet)
    };

    // ✅ Server-side log (Node/server only)
    console.log({
      basic_profile,
      user_type_and_risk,
      medical_profile,
      functional_ability,
    });
  }

  // ====== Component-scoped styles (no global CSS) ======
  const DESKTOP_BP = 1280; // breakpoint for single-row layout
  const SPACER_PX = 24; // fixed spacer between Sex and Height
  const MIN_ITEM_WIDTH = 180; // min field width when wrapping on small screens
  const GAP_PX = 16; // grid gap

  const rootClass = "pi-wrap"; // Personal Information scope
  const usrClass = "usr-wrap"; // User Type & Risk Level scope

  const styles = `
  /* ========== Personal Information (unchanged behavior) ========== */
  .${rootClass} .personal-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(${MIN_ITEM_WIDTH}px, 1fr));
    gap: ${GAP_PX}px;
    align-items: start;
    margin-top: ${GAP_PX}px;
  }
  @media (min-width: ${DESKTOP_BP}px) {
    .${rootClass} .personal-grid {
      grid-template-columns:
        1fr 1fr 1fr   /* Name, Age, Sex */
        ${SPACER_PX}px/* spacer column */
        1fr 1fr 1fr;  /* Height, Weight, Dominant Side */
      gap: ${GAP_PX}px;
    }
  }
  .${rootClass} .spacer { display: none; }
  @media (min-width: ${DESKTOP_BP}px) { .${rootClass} .spacer { display: block; } }

  .${rootClass} .field { display: flex; flex-direction: column; gap: 6px; min-width: 0; }
  .${rootClass} .inline-options { display: flex; gap: 12px; align-items: center; flex-wrap: nowrap; }
  .${rootClass} .inline-radio { display: inline-flex; gap: 6px; align-items: center; white-space: nowrap; }

  /* ========== User Type & Risk Level (existing) ========== */

  /* Layout for choice groups: mobile-first (1 column), then 2-up */
  .${usrClass} .choice-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 12px;
    margin-top: 12px;
  }
  @media (min-width: 560px) {
    .${usrClass} .choice-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  /* Visually-hidden radios (accessible) */
  .${usrClass} .vh {
    position: absolute;
    opacity: 0;
    pointer-events: none;
    width: 0;
    height: 0;
  }

  /* Pill-style button (label) */
  .${usrClass} .pill {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 1px 1px;
    border-radius: 9999px;
    border: 1px solid #d0d5dd;
    background: #ffffff;
    color: #1f3fae;               /* matches your heading color */
    font-weight: 600;
    cursor: pointer;
    transition: background .15s ease, color .15s ease, border-color .15s ease, box-shadow .15s ease;
    user-select: none;
    text-align: center;
    width: 100%;
  }
  .${usrClass} .pill:hover {
    border-color: #b8c0cc;
    background: #f7f9ff;
  }
  .${usrClass} .pill:active {
    transform: translateY(0.5px);
  }

  /* Selected state: input:checked + label */
  .${usrClass} .vh:checked + .pill {
    background: #1f3fae;
    color: #ffffff;
    border-color: #1f3fae;
    box-shadow: 0 0 0 3px rgba(31, 63, 174, 0.18);
  }

  /* Keyboard focus */
  .${usrClass} .vh:focus-visible + .pill,
  .${usrClass} .pill:focus-visible {
    outline: 3px solid rgba(31, 63, 174, 0.4);
    outline-offset: 2px;
  }

  /* Optional small helper text style if needed later */
  .muted { color: #6b7280; font-size: 13px; }

  /* ========== ADDITIVE: allow the SAME pill/choice styles in Personal Information ========== */
  /* These rules mirror usr-wrap, scoped to pi-wrap.
     They won't affect anything until you use .vh/.pill/.choice-grid inside the PI section. */

  /* Choice grid reused in Personal Information */
  .${rootClass} .choice-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 12px;
    margin-top: 12px;
  }
  @media (min-width: 560px) {
    .${rootClass} .choice-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  /* Hidden radio in Personal Information */
  .${rootClass} .vh {
    position: absolute;
    opacity: 0;
    pointer-events: none;
    width: 0;
    height: 0;
  }

  /* Pill in Personal Information */
  .${rootClass} .pill {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 1px 1px;
    border-radius: 9999px;
    border: 1px solid #d0d5dd;
    background: #ffffff;
    color: #1f3fae;
    font-weight: 600;
    cursor: pointer;
    transition: background .15s ease, color .15s ease, border-color .15s ease, box-shadow .15s ease;
    user-select: none;
    text-align: center;
    width: 100%;
  }
  .${rootClass} .pill:hover {
    border-color: #b8c0cc;
    background: #f7f9ff;
  }
  .${rootClass} .pill:active {
    transform: translateY(0.5px);
  }
  .${rootClass} .vh:checked + .pill {
    background: #1f3fae;
    color: #ffffff;
    border-color: #1f3fae;
    box-shadow: 0 0 0 3px rgba(31, 63, 174, 0.18);
  }
  .${rootClass} .vh:focus-visible + .pill,
  .${rootClass} .pill:focus-visible {
    outline: 3px solid rgba(31, 63, 174, 0.4);
    outline-offset: 2px;
  }
    /* ===== Modal (theme-aligned) ===== */
.${usrClass} .modal-backdrop {
  display: none;                 /* hidden by default */
  position: fixed;
  inset: 0;
  background: rgba(17, 24, 39, 0.45); /* semi-dark overlay */
  z-index: 50;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

/* Hidden by default */
.usr-wrap .modal-backdrop {
  display: none;
  opacity: 0;
  pointer-events: none;
  transition: opacity .18s ease;
}

/* Show when JS toggles data-open */
.usr-wrap[data-open="true"] .modal-backdrop {
  display: flex;
  opacity: 1;
  pointer-events: auto;
}

/* Lift animation */
.usr-wrap .modal {
  transform: translateY(8px);
  transition: transform .18s ease;
}

.usr-wrap[data-open="true"] .modal {
  transform: translateY(0);
}
.${usrClass} .modal {
  background: #ffffff;
  color: #111827;
  width: 100%;
  max-width: 560px;
  border-radius: 12px;
  box-shadow: 0 20px 48px rgba(0,0,0,0.25);
  border: 1px solid #e5e7eb;
  overflow: hidden;
}

.${usrClass} .modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 16px 20px;
  border-bottom: 1px solid #eef2f7;
  background: #f8faff;           /* subtle tint to match your blue theme */
}

.${usrClass} .modal-title {
  font-weight: 700;
  color: #1f3fae;                /* your theme color */
  font-size: 18px;
  margin: 0;
}

.${usrClass} .modal-body {
  padding: 16px 20px;
  line-height: 1.5;
}

.${usrClass} .modal-footer {
  padding: 14px 20px;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  border-top: 1px solid #eef2f7;
  background: #fafbff;
}

/* Buttons (theme-aligned) */
.${usrClass} .btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 16px;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  user-select: none;
  transition: transform .05s ease, background .15s ease, color .15s ease, border-color .15s ease, box-shadow .15s ease;
  text-decoration: none;
  border: 1px solid transparent;
}

.${usrClass} .btn:active { transform: translateY(0.5px); }

.${usrClass} .btn-primary {
  background: #1f3fae;
  color: #ffffff;
  border-color: #1f3fae;
}
.${usrClass} .btn-primary:hover {
  background: #2448c7;
  border-color: #2448c7;
  box-shadow: 0 0 0 3px rgba(31,63,174,0.18);
}

.${usrClass} .btn-ghost {
  background: #ffffff;
  color: #1f2937;
  border-color: #e5e7eb;
}
.${usrClass} .btn-ghost:hover {
  background: #f8fafc;
  border-color: #d1d5db;
}

/* Close “X” button */
.${usrClass} .icon-btn {
  background: transparent;
  border: none;
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;
  color: #1f3fae;
}
.${usrClass} .icon-btn:hover {
  background: #eef2ff;
}

/* Grid with 3 fixed columns in one row inside the modal */
.usr-wrap .modal .choice-grid--row {
  display: grid;
  grid-template-columns: repeat(3, auto);  /* three columns sized to content */
  gap: 8px;
  margin-top: 8px;
  align-items: center;
}

/* Pills hug content */
.usr-wrap .modal .choice-grid--row .pill {
  width: auto;
  white-space: nowrap;
  padding: 8px 12px;
  font-size: 14px;
}

/* One tight row for Risk Level pills inside the modal */
.usr-wrap .modal .choice-row {
  display: flex;
  flex-wrap: nowrap;     /* keep all three on one line */
  align-items: center;
  gap: 6px;              /* 👈 reduce space between pills (try 4–8px) */
  margin-top: 8px;
}

/* Compact pill look just for the modal Risk Level row */
.usr-wrap .modal .choice-row .pill {
  width: auto;           /* 👈 don't stretch; hug text */
  padding: 6px 10px;     /* 👈 compact size; try 6x10 or 8x12 */
  font-size: 14px;       /* keep readable */
  white-space: nowrap;   /* keep each label on one line */
}

/* Optional: make the wrapper <div> around each pill inline-sized too */
.usr-wrap .modal .choice-row > div {
  display: inline-block;
}
`;

  return (
    <div className="min-h-screen bg-white p-6 md:p-12 font-sans text-slate-900">
      <main
        style={{
          maxWidth: 900,
          margin: "0 auto",
          padding: 32,
        }}
      >
        {/* Component-scoped styles (no global CSS) */}
        <style>{styles}</style>
        <UserTypeModalController />

        {/* Header */}
        <h1 style={{ textAlign: "center", fontSize: 36, color: "#1f3fae" }}>
          <strong>LOG YOUR DATA</strong>
        </h1>
        <p style={{ textAlign: "center", marginBottom: 40 }}>
          Track and record your information
        </p>

        <form action={save}>
          {/* ================= Personal Information ================= */}
          <section className={rootClass}>
            <h2 style={{ color: "#1f3fae" }}>Personal Information</h2>

            <div className="personal-grid">
              {/* Name */}
              <div className="field">
                <label>Name</label>
                <input
                  name="name"
                  type="text"
                  placeholder="enter name"
                  required
                  style={{ width: "100%" }}
                />
              </div>

              {/* Age */}
              <div className="field">
                <label>Age</label>
                <input
                  name="age"
                  type="number"
                  placeholder="enter age"
                  required
                  style={{ width: "100%" }}
                />
              </div>

              {/* Sex */}
              <div className="field">
                <label style={{ whiteSpace: "nowrap" }}>Sex</label>
                <div className="inline-options">
                  <label className="inline-radio">
                    <input type="radio" name="sex" value="male" required />
                    Male
                  </label>
                  <label className="inline-radio">
                    <input type="radio" name="sex" value="female" />
                    Female
                  </label>
                </div>
              </div>

              {/* 👇 Spacer track (desktop only) */}
              <div className="spacer" aria-hidden="true" />

              {/* Height */}
              <div className="field">
                <label>Height</label>
                <input
                  name="height"
                  type="number"
                  placeholder="enter height"
                  style={{ width: "100%" }}
                />
              </div>

              {/* Weight */}
              <div className="field">
                <label>Weight</label>
                <input
                  name="weight"
                  type="number"
                  placeholder="enter weight"
                  style={{ width: "100%" }}
                />
              </div>

              {/* Dominant Side (pill format, same as User Category) */}
              <div>
                <label style={{ whiteSpace: "nowrap" }}>Dominant Side</label>

                <div className="choice-grid" style={{ marginTop: 1 }}>
                  {/* Left */}
                  <div style={{ position: "relative" }}>
                    <input
                      className="vh"
                      type="radio"
                      id="dominant_left"
                      name="dominant_side"
                      value="Left"
                      required
                    />
                    <label className="pill" htmlFor="dominant_left">
                      Left
                    </label>
                  </div>

                  {/* Right */}
                  <div style={{ position: "relative" }}>
                    <input
                      className="vh"
                      type="radio"
                      id="dominant_right"
                      name="dominant_side"
                      value="Right"
                    />
                    <label className="pill" htmlFor="dominant_right">
                      Right
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ================= User Type & Risk Level (with modal) ================= */}
          <section className={usrClass} style={{ marginTop: 24 }}>
            <h2 style={{ color: "#1f3fae" }}>User Type and Risk Level</h2>
            {/* Hidden “none” radio so we can close the modal by selecting it
          <input
            className="vh"
            type="radio"
            id="user_category_none"
            name="user_category"
            value="Stroke recovery / neurological condition"
            required
          /> */}

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
                  value="Stroke recovery / neurological condition"
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
                  value="General fitness & active lifestyle"
                />
                <label className="pill" htmlFor="general_fitness">
                  General fitness &amp; active lifestyle
                </label>
              </div>
            </div>

            {/* ===== Modal (shown only when Stroke is selected) ===== */}
            <div className="modal-backdrop" aria-hidden="true">
              <div
                className="modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
              >
                <div className="modal-header">
                  <h3 id="modal-title" className="modal-title">
                    Important Information
                  </h3>
                  <button
                    type="button"
                    className="icon-btn"
                    data-close-modal="true"
                    aria-label="Close dialog"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M6.225 4.811 4.811 6.225 10.586 12l-5.775 5.775 1.414 1.414L12 13.414l5.775 5.775 1.414-1.414L13.414 12l5.775-5.775-1.414-1.414L12 10.586z" />
                    </svg>
                  </button>
                </div>

                <div className="modal-body">
                  <p>
                    Since you selected{" "}
                    <strong>Stroke recovery / neurological condition</strong>,
                    please answer the following:
                  </p>

                  <div style={{ marginTop: 12 }}>
                    <label style={{ whiteSpace: "nowrap", fontWeight: 600 }}>
                      Risk Level
                    </label>

                    <div className="choice-row">
                      {/* Low */}
                      <div style={{ position: "relative" }}>
                        <input
                          className="vh"
                          type="radio"
                          id="risk_low"
                          name="risk_level"
                          value="Low"
                          required
                        />
                        <label className="pill" htmlFor="risk_low">
                          Low
                        </label>
                      </div>

                      {/* Medium */}
                      <div style={{ position: "relative" }}>
                        <input
                          className="vh"
                          type="radio"
                          id="risk_medium"
                          name="risk_level"
                          value="Medium"
                        />
                        <label className="pill" htmlFor="risk_medium">
                          Medium
                        </label>
                      </div>

                      {/* High */}
                      <div style={{ position: "relative" }}>
                        <input
                          className="vh"
                          type="radio"
                          id="risk_high"
                          name="risk_level"
                          value="High"
                        />
                        <label className="pill" htmlFor="risk_high">
                          High
                        </label>
                      </div>
                    </div>

                    {/* ========== Medical Profile (inside modal) ========== */}
                    <section className="modal-section">
                      <h3
                        style={{
                          color: "#1f3fae",
                          marginTop: 12,
                          marginBottom: 6,
                        }}
                      >
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
                          <input
                            type="checkbox"
                            name="medical_condition"
                            value="Other"
                          />{" "}
                          Other
                        </label>
                      </div>
                    </section>

                    <hr style={{ margin: "16px 0" }} />

                    {/* ========== Functional Ability (inside modal) ========== */}
                    <section className="modal-section">
                      <h3 style={{ color: "#1f3fae" }}>Functional Ability</h3>

                      <p>Current Mobility Level</p>
                      <label>
                        <input
                          type="radio"
                          name="mobility"
                          value="Seated only"
                        />{" "}
                        Seated only
                      </label>
                      <label style={{ marginLeft: 12 }}>
                        <input
                          type="radio"
                          name="mobility"
                          value="Assisted standing"
                        />{" "}
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
                        <input
                          type="radio"
                          name="walking"
                          value="Cannot walk"
                        />{" "}
                        Cannot walk
                      </label>
                      <label style={{ marginLeft: 12 }}>
                        <input
                          type="radio"
                          name="walking"
                          value="With cane / walker"
                        />{" "}
                        With cane / walker
                      </label>
                      <label style={{ marginLeft: 12 }}>
                        <input
                          type="radio"
                          name="walking"
                          value="Independent"
                        />{" "}
                        Independent
                      </label>

                      <p style={{ marginTop: 16 }}>Range of Motion</p>
                      <label>
                        <input type="radio" name="rom" value="Limited" />{" "}
                        Limited
                      </label>
                      <label style={{ marginLeft: 12 }}>
                        <input type="radio" name="rom" value="Moderate" />{" "}
                        Moderate
                      </label>
                      <label style={{ marginLeft: 12 }}>
                        <input
                          type="radio"
                          name="rom"
                          value="Full (with caution)"
                        />{" "}
                        Full (with caution)
                      </label>
                    </section>
                  </div>
                </div>

                <div className="modal-footer">
                  {/* Primary CTA could navigate or just close */}
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-close-modal="keep"
                  >
                    I Understand
                  </button>

                  <button
                    type="button"
                    className="btn btn-ghost"
                    data-close-modal="discard"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </section>

          <hr />

          {/* ================= Save ================= */}
          <div style={{ textAlign: "center", marginTop: 32 }}>
            <button
              type="submit"
              style={{
                background: "#6cab2f",
                color: "white",
                padding: "12px 40px",
                borderRadius: 8,
                border: "none",
                fontSize: 16,
              }}
            >
              Save
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
