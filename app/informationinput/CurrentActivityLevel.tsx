// app/informationinput/CurrentActivityLevel.tsx
export default function CurrentActivityLevel() {
  const sectionClass = "msr-section";
  const groupClass = "msr-group";

  const styles = `
    .${sectionClass} .hint { color: #6b7280; font-size: 12px; margin-top: 4px; }
    .${groupClass} label + label { margin-left: 12px; }
  `;

  return (
    <section className={`modal-section ${sectionClass}`}>
      <style>{styles}</style>

      <h3 style={{ color: "#1f3fae" }}>Current Activity Level</h3>

      {/* activity level profiling */}
      <p style={{ marginTop: 16 }}>How active are you on a typical day?</p>
      <select name="current_activity_level" style={{ padding: 6 }}>
        <option value="">Select</option>
        <option value="sedentary_activity">
          Sedentary — Mostly sitting; very little movement or exercise.
        </option>
        <option value="light_activity">
          Light Activity — Light daily movement (short walks, light chores).
        </option>
        <option value="moderate_activity">
          Moderate Activity — Regular activity or exercise 3–5× per week.
        </option>
        <option value="heavy_activity">
          Heavy Activity — Intense exercise or very active job most days.
        </option>
      </select>

      {/* activity details */}
      <p style={{ marginTop: 16 }}>
        Tell us a bit about your daily activity (optional)
      </p>
      <textarea
        name="activity_details"
        rows={2}
        style={{ width: "100%", padding: 6 }}
      />

      {/* goals (checkboxes) */}
      <p style={{ marginTop: 16, marginBottom: 8 }}>
        What are your health and movement goals?
      </p>

      {/* NEW: Primary goal (radio) */}
      <p className="hint" style={{ marginTop: 8 }}>
        Choose your primary goal:
      </p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 8,
          marginTop: 4,
        }}
      >
        <label>
          <input type="radio" name="primary_goal" value="reduce_pain" /> Reduce
          pain
        </label>

        <label>
          <input type="radio" name="primary_goal" value="restore_strength" />{" "}
          Restore strength
        </label>

        <label>
          <input
            type="radio"
            name="primary_goal"
            value="recover_after_surgery"
          />{" "}
          Recover after surgery/injury
        </label>

        <label>
          <input type="radio" name="primary_goal" value="prevent_decline" />{" "}
          Prevent future injury
        </label>
      </div>

      <p className="hint" style={{ marginTop: 8 }}>
        Choose your secondary goal:
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 8,
          marginTop: 4,
        }}
      >
        <label>
          <input
            type="checkbox"
            name="goal_improve_mobility"
            value="improve_mobility"
          />{" "}
          Improve mobility &amp; ROM
        </label>

        <label>
          <input
            type="checkbox"
            name="goal_improve_balance"
            value="improve_balance"
          />{" "}
          Improve balance &amp; prevent falls
        </label>

        <label>
          <input
            type="checkbox"
            name="goal_increase_endurance"
            value="increase_endurance"
          />{" "}
          Increase endurance
        </label>

        <label>
          <input
            type="checkbox"
            name="goal_move_independently"
            value="move_independently"
          />{" "}
          Move independently
        </label>
      </div>

      {/* specific targets */}
      <p style={{ marginTop: 20, marginBottom: 16 }}>
        What specific targets would you like to work toward?
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 8,
          marginTop: 4,
        }}
      >
        <label>
          <input
            type="checkbox"
            name="target_climb_stairs"
            value="climb_stairs"
          />{" "}
          Climb stairs without assistance
        </label>

        <label>
          <input
            type="checkbox"
            name="target_get_in_out_bed"
            value="get_in_out_bed"
          />{" "}
          Get in and out of bed independently
        </label>

        <label>
          <input
            type="checkbox"
            name="target_stand_without_hands"
            value="stand_without_hands"
          />{" "}
          Stand up from a chair without using hands
        </label>

        <label>
          <input
            type="checkbox"
            name="target_use_hand_daily_tasks"
            value="use_hand_daily_tasks"
          />{" "}
          Use my affected hand to eat and dress
        </label>

        <label>
          <input
            type="checkbox"
            name="target_walk_longer"
            value="walk_longer"
          />{" "}
          Walk longer distances without getting tired
        </label>

        <label>
          <input
            type="checkbox"
            name="target_regain_balance_turning"
            value="regain_balance_turning"
          />{" "}
          Regain balance while turning or changing direction
        </label>

        <label>
          <input
            type="checkbox"
            name="target_return_to_driving"
            value="return_to_driving"
          />{" "}
          Return to driving safely
        </label>

        <label>
          <input
            type="checkbox"
            name="target_return_to_work_or_school"
            value="return_to_work_or_school"
          />{" "}
          Go back to work or school
        </label>

        <label>
          <input
            type="checkbox"
            name="target_carry_groceries"
            value="carry_groceries"
          />{" "}
          Carry groceries without losing balance
        </label>

        <label>
          <input
            type="checkbox"
            name="target_improve_coordination"
            value="improve_coordination"
          />{" "}
          Improve coordination of my affected side
        </label>

        <label>
          <input
            type="checkbox"
            name="target_walk_uneven_surfaces"
            value="walk_uneven_surfaces"
          />{" "}
          Walk on uneven surfaces safely
        </label>

        <label>
          <input
            type="checkbox"
            name="target_reduce_spasticity"
            value="reduce_spasticity"
          />{" "}
          Reduce spasticity or stiffness in affected limbs
        </label>

        <label>
          <input
            type="checkbox"
            name="target_improve_grip"
            value="improve_grip"
          />{" "}
          Improve hand grip and fine motor control
        </label>

        <label>
          <input
            type="checkbox"
            name="target_bathe_independently"
            value="bathe_independently"
          />{" "}
          Bathe and toilet independently
        </label>

        <label>
          <input
            type="checkbox"
            name="target_return_to_sports"
            value="return_to_sports"
          />{" "}
          Return to recreational activities or sports
        </label>
      </div>
    </section>
  );
}
