/**
 * This file contains the complete JSON schema specification for the exercise plan output.
 * This schema is included in the AI prompt to ensure consistent, structured responses.
 */

export const EXERCISE_PLAN_OUTPUT_SCHEMA = `{
  "exercise_plan": {
    "plan_info": {
      "plan_id": "string (format: EP-YYYY-XXXX-NNN, e.g., EP-2026-JM68-001)",
      "user_name": "string",
      "created_date": "string (format: YYYY-MM-DD)",
      "total_weeks": "integer (1-52)",
      "sessions_per_week": "integer (1-7)",
      "difficulty": "string (enum: beginner|intermediate|advanced)",
      "primary_goal": "string",
      "safety_notes": [
        "string (critical safety information, medical precautions, supervision requirements)"
      ]
    },
    
    "weekly_schedule": [
      {
        "week": "integer (1-based week number)",
        "focus": "string (theme or focus for this week)",
        "sessions": [
          {
            "day": "integer (1-7, representing day of week or session number)",
            "title": "string (descriptive session title)",
            "duration_min": "integer (expected session duration in minutes)",
            "exercises": [
              {
                "id": "string (format: W[week]D[day]-EX[number], e.g., W1D1-EX001)",
                "name": "string (exercise name)",
                "description": "string (detailed description of exercise purpose and benefits)",
                "equipment": [
                  "string (required equipment, or 'None' if bodyweight)"
                ],
                "steps": [
                  "string (detailed step-by-step instructions, numbered sequentially)"
                ],
                "sets": "integer (number of sets to perform)",
                "reps": "integer or null (repetitions per set, null for time-based holds)",
                "hold_sec": "integer or null (seconds to hold position, null for rep-based)",
                "rest_sec": "integer (rest time between sets in seconds)",
                "tips": [
                  "string (form cues, technique tips, common mistakes to avoid)"
                ],
                "easier": "string (modification to make exercise easier)",
                "harder": "string (progression to make exercise more challenging)",
                "warnings": [
                  "string (safety warnings, contraindications, stop conditions)"
                ],
                "video_url": "string (URL to demonstration video)",
                "status": "string (default: 'not_started', enum: not_started|in_progress|completed)",
                "completed_sets": "integer (default: 0, tracks user progress)",
                "notes": "string (default: '', user notes field)"
              }
            ],
            "session_status": "string (default: 'not_started', enum: not_started|in_progress|completed)",
            "completed_date": "string or null (format: YYYY-MM-DD, null if not completed)"
          }
        ]
      }
    ],
    
    "progress": {
      "total_sessions": "integer (total number of sessions across all weeks)",
      "completed_sessions": "integer (default: 0)",
      "completion_percent": "number (default: 0, range: 0-100)",
      "current_week": "integer (default: 1)",
      "current_day": "integer (default: 1)",
      "next_session_date": "string (format: YYYY-MM-DD, suggested next workout date)"
    }
  }
}`;

export const SCHEMA_NOTES = `
SCHEMA REQUIREMENTS AND NOTES:

1. EXERCISE IDS: Must follow format W[week]D[day]-EX[number]
   - Example: W1D1-EX001 (Week 1, Day 1, Exercise 1)
   - Ensures unique identification across entire plan

2. REPS vs HOLD_SEC: 
   - Use "reps" for count-based exercises (e.g., 10 push-ups)
   - Use "hold_sec" for time-based holds (e.g., 30-second plank)
   - Set the unused field to null

3. SAFETY NOTES: 
   - Include medical precautions for high-risk users
   - Specify when supervision is required
   - Note contraindications and stop conditions

4. MODIFICATIONS:
   - "easier": Always provide a regression option
   - "harder": Always provide a progression option
   - These enable personalization as user improves

5. VIDEO URLS:
   - Use placeholder format: https://youtube.com/watch?v=[exercise-name]
   - In production, replace with actual demonstration videos

6. PROGRESSION ACROSS WEEKS:
   - Week 1: Foundation and baseline
   - Week 2: Increased volume or intensity
   - Week 3: New challenges and complexity
   - Week 4: Consolidation and testing

7. MEDICAL CONDITIONS:
   - Stroke/neurological: Include asymmetric progressions, focus on affected side
   - Cardiac: Monitor intensity, include frequent rest, emphasize breathing
   - Balance issues: Always require support person, wall/chair support
   - Mobility limitations: Provide seated alternatives
`;
