
const CRITICAL_THRESHOLD = 0.7;

export function buildListeningSummary({
  sanitized,
  mode = "normal",
}) {

  const { profile, tracks, artists } = sanitized;

  if (!tracks.length || !artists.length) {
    return null;
  }

  const metrics = extractMetrics(tracks, artists);
  const patterns = detectPatterns(metrics);
  const traits = inferTraits(patterns, mode);

  return {
    user: {
      spotifyId: profile.spotifyId,
      displayName: profile.displayName,
      country: profile.country,
      product: profile.product,
    },

    metrics,
    patterns,
    personalityTraits: traits,

    meta: {
      mode,
      generatedAt: new Date().toISOString(),
      confidenceScore: patterns.confidence,
    },
  };
}


function extractMetrics(tracks, artists) {
  const totalTracks = tracks.length;

  const explicitCount = tracks.filter((t) => t.explicit).length;
  const avgPopularity =
    tracks.reduce((sum, t) => sum + t.popularity, 0) / totalTracks;

  const avgDuration =
    tracks.reduce((sum, t) => sum + t.durationMs, 0) / totalTracks;

  const artistFrequency = {};
  tracks.forEach((track) => {
    track.artists.forEach((a) => {
      artistFrequency[a.name] = (artistFrequency[a.name] || 0) + 1;
    });
  });

  const dominantArtists = Object.entries(artistFrequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name]) => name);

  const genreFrequency = {};
  artists.forEach((artist) => {
    artist.genres.forEach((g) => {
      genreFrequency[g] = (genreFrequency[g] || 0) + 1;
    });
  });

  const dominantGenres = Object.entries(genreFrequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([genre]) => genre);

  return {
    avgPopularity: Math.round(avgPopularity),
    avgDurationMs: Math.round(avgDuration),
    explicitRatio: explicitCount / totalTracks,
    dominantArtists,
    dominantGenres,
  };
}


function detectPatterns(metrics) {
  const {
    avgPopularity,
    explicitRatio,
    dominantGenres,
  } = metrics;

  const mainstreamScore = avgPopularity / 100;

  const emotionalGenres = [
    "indian indie",
    "sad",
    "acoustic",
    "melancholic",
    "romantic",
  ];

  const emotionalBias =
    dominantGenres.filter((g) =>
      emotionalGenres.some((e) => g.includes(e))
    ).length / dominantGenres.length;

  return {
    mainstreamScore,
    explicitBias: explicitRatio,
    emotionalBias,
    confidence:
      (mainstreamScore + (1 - explicitRatio) + emotionalBias) / 3,
  };
}


function inferTraits(patterns, mode) {
  const traits = [];

  const intensity = mode === "critical" ? 1.2 : 1;

  if (patterns.emotionalBias > 0.5) {
    traits.push({
      trait: "Emotionally Driven Listener",
      strength: patterns.emotionalBias * intensity,
      note:
        mode === "critical"
          ? "You often use music to process emotions instead of dealing with them directly."
          : "You tend to connect deeply with emotional narratives in music.",
    });
  }

  if (patterns.mainstreamScore < 0.4) {
    traits.push({
      trait: "Non-Mainstream Preference",
      strength: (1 - patterns.mainstreamScore) * intensity,
      note:
        mode === "critical"
          ? "You avoid popular choices to preserve a sense of individuality."
          : "You enjoy exploring music beyond the mainstream.",
    });
  }

  if (patterns.explicitBias > CRITICAL_THRESHOLD) {
    traits.push({
      trait: "High Stimulation Seeking",
      strength: patterns.explicitBias * intensity,
      note:
        mode === "critical"
          ? "You may rely on intensity and shock to stay mentally engaged."
          : "You prefer energetic and bold musical expressions.",
    });
  }

  return traits;
}
