
export const musicPersonalitySchema = {
  user_profile: {
    age_range: String,
    region: String,
    platform: String
  },

  listening_behavior: {
    top_genres: [
      {
        name: String,
        percentage: Number
      }
    ],
    artist_repetition_score: Number,
    track_repetition_score: Number,
    diversity_score: Number,
    mainstream_ratio: Number
  },

  emotional_signature: {
    dominant_mood: String,
    mood_distribution: {
      sad: Number,
      calm: Number,
      energetic: Number,
      angry: Number
    },
    avg_energy: Number,
    avg_valence: Number
  },

  taste_patterns: {
    lyrical_focus: String,
    tempo_preference: String,
    language_diversity: Number,
    era_bias: String,
    aesthetic_consistency: String
  },

  temporal_patterns: {
    time_range: String,
    late_night_listening_ratio: Number,
    session_length_avg_minutes: Number,
    repeat_sessions: String
  },

  risk_flags: {
    emotional_looping: Boolean,
    avoidance_pattern: [Boolean, String],
    over_identification_with_music: Boolean
  },

  analysis_constraints: {
    allowed_inference_level: String,
    forbidden_topics: [String],
    tone: String
  }
}
