export interface Exercise {
  id: string;
  name: string;
  description: string;
  steps: string[];
  sets: number;
  reps: number;
  video_url: string;
  status: string;
  equipment?: string[];
  hold_sec?: number | null;
  rest_sec?: number;
  tips?: string[];
  easier?: string;
  harder?: string;
  warnings?: string[];
  completed_sets?: number;
  notes?: string;
}

export interface Session {
  day: number;
  title: string;
  exercises: Exercise[];
  session_status: string;
  duration_min?: number;
  completed_date?: string | null;
}

export interface ExercisePlanData {
  exercise_plan: {
    plan_info: {
      plan_id?: string;
      user_name: string;
      primary_goal: string;
      created_date?: string;
      total_weeks?: number;
      sessions_per_week?: number;
      difficulty?: string;
      safety_notes?: string[];
    };
    weekly_schedule: {
      week?: number;
      focus?: string;
      sessions: Session[];
    }[];
    progress: {
      total_sessions?: number;
      completed_sessions?: number;
      completion_percent: number;
      current_week: number;
      current_day: number;
      next_session_date?: string;
    };
  };
}

// types for Information Input page
export type BasicProfile = {
  basic_profile: {
    name: string;
    age: number;
    sex: string;
    height_cm: number;
    weight_kg: number;
    dominant_side: string;
  };
};

export type UserTypeAndRisk = {
  user_type_and_risk: {
    category: string;
    risk_level: string;
  };
};

export type MedicalProfile = {
  medical_profile: {
    conditions: {
      type: string;
      subtype: string;
      date_of_diagnosis: string;
      affected_side: string;
      severity: string;
    }[];
    notes: string;
  };
};

export type FunctionalAbility = {
  functional_ability: {
    mobility_level: string;
    walking_ability: string;
    assistive_device: string;
    upper_limb_function: {
      left_arm: string;
      right_arm: string;
    };
    range_of_motion: string;
  };
};

export type MedicalSafetyAndRiskFlags = {
  medical_safety_and_risk_flags: {
    vitals: {
      blood_pressure: string;
      resting_heart_rate: number;
    };
    heart_condition: boolean;
    heart_condition_details: string;
    pacemaker_or_implant: boolean;
    history_of_falls_last_6_months: boolean;
    number_of_falls: number;
    dizziness_or_fainting_episodes: boolean;
    dizziness_details: string;
    pain_scale: number;
    pain_location: string;
  };
};

export type CurrentActivityLevel = {
  current_activity_level: string;
  activity_details: string;
  goals: {
    primary_goal: string;
    secondary_goals: string[];
  };
  specific_targets: string[];
};

export type ExercisePreferencesAndTolerance = {
  exercise_preferences_and_tolerance: {
    preferred_session_length: string;
    preferred_intensity: string;
    rest_tolerance: string;
    rest_frequency: string;
    time_of_day_preference: string;
    fatigue_concerns: string;
  };
};

export type ExerciseEnvironment = {
  exercise_environment: {
    location: string;
    equipment_available: string[];
    support_person_available: boolean;
    support_person_details: string;
  };
};

export type AdditionalInformation = {
  additional_information: {
    medications: string[];
    physical_therapy_history: boolean;
    pt_sessions_completed: number;
    pt_end_date: string;
    clearance_for_exercise: boolean;
    physician_notes: string;
    timestamp: string;
  };
};
