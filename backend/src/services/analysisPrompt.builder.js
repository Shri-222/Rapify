
export function buildAnalysisPrompt({ listeningSummary, analysisType }) {
  if (!listeningSummary) {
    throw new Error("listeningSummary is required");
  }

  if (!["normal", "critical"].includes(analysisType)) {
    throw new Error("Invalid analysis type");
  }

  const system = buildSystemPrompt(analysisType);
  const user = buildUserPrompt(listeningSummary);

  return { system, user };
}


function buildSystemPrompt(type) {
  const baseRules = `
You are a psychological music analyst.
You analyze listening behavior to infer personality traits.

Rules:
- Do NOT mention Spotify, APIs, datasets, or metadata
- Do NOT guess personal facts like age, gender, location
- Base conclusions ONLY on provided listening patterns
- Be concise, structured, and insightful
- Avoid clichés and generic advice
`;

  if (type === "normal") {
    return `
${baseRules}

Tone:
- Supportive
- Insightful
- Balanced
- Encouraging

Goal:
Help the user understand what their music taste reveals about their mindset and emotional patterns.
`;
  }

  // critical
  return `
${baseRules}

Tone:
- Direct
- Unfiltered
- Honest
- Slightly confrontational but not insulting

Goal:
Challenge the user's self-perception using their listening habits.
Expose contradictions, emotional avoidance, and repetitive patterns.
Do NOT soften conclusions.
`;
}


function buildUserPrompt(summary) {
  const {
    topGenres,
    moodProfile,
    audioProfile,
    listeningHabits,
    artistPatterns,
  } = summary;

  return `
Here is a summary of a person's music listening behavior:

Top Genres:
${topGenres.join(", ")}

Mood Profile:
- Dominant moods: ${moodProfile?.dominant.join(", ")}
- Emotional variance: ${moodProfile.variance}
- Energy trend: ${moodProfile.energy}

Audio Preferences:
- Energy: ${audioProfile.energy}
- Danceability: ${audioProfile.danceability}
- Valence (positivity): ${audioProfile.valence}
- Tempo preference: ${audioProfile.tempo}

Listening Habits:
- Repeat tendency: ${listeningHabits.repetition}
- Exploration level: ${listeningHabits.exploration}
- Time-of-day preference: ${listeningHabits.timeOfDay}

Artist Patterns:
- Mainstream vs niche: ${artistPatterns.mainstream}
- Artist loyalty: ${artistPatterns.loyalty}

Analyze this listening behavior and explain what it reveals about the person's personality, emotional state, and behavioral tendencies.
`;
}
