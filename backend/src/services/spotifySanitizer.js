
// convert the row spotify json data to teh schema shape

const MAX_TRACKS = 50;
const MAX_ARTISTS = 50;
const MAX_GENRES = 5;

//profile sanitization 

export function sanitizeSpotifyProfile(profile) {

  if (!profile) return null;

  return {
    spotifyId: profile.id,
    displayName: profile.display_name,
    email: profile.email ?? null,
    country: profile.country ?? null,
    followers: profile.followers?.total ?? 0,
    product: profile.product ?? "unknown",
    profileImage: profile.images?.[0]?.url ?? null,
  };
}


//  Track Sanitizer

export function sanitizeTopTracks(tracksResponse) {
  if (!tracksResponse?.items) return [];

  return tracksResponse.items
    .slice(0, MAX_TRACKS)
    .map((track) => ({
      trackId: track.id,
      name: track.name,
      popularity: track.popularity ?? 0,
      durationMs: track.duration_ms,
      explicit: track.explicit ?? false,

      album: {
        albumId: track.album?.id,
        name: track.album?.name,
        releaseDate: track.album?.release_date,
        image: track.album?.images?.[0]?.url ?? null,
      },

      artists: track.artists.map((artist) => ({
        artistId: artist.id,
        name: artist.name,
      })),
    }));
}


// Artist Sanitizer

export function sanitizeTopArtists(artistsResponse) {
  if (!artistsResponse?.items) return [];

  return artistsResponse.items
    .slice(0, MAX_ARTISTS)
    .map((artist) => ({
      artistId: artist.id,
      name: artist.name,
      popularity: artist.popularity ?? 0,
      followers: artist.followers?.total ?? 0,
      genres: artist.genres?.slice(0, MAX_GENRES) ?? [],
      image: artist.images?.[0]?.url ?? null,
    }));
}


export function mapSummaryToPrompt(summary) {
  return {
    topGenres: summary.metrics?.dominantGenres ?? [],

    moodProfile: {
      dominant: inferMoods(summary.patterns?.emotionalBias),
      variance: summary.patterns?.confidence ?? 0,
      energy: summary.patterns?.emotionalBias ?? 0
    },

    audioProfile: {
      energy: normalize(summary.metrics?.avgPopularity),
      // danceability: 0.5, // placeholder (Spotify audio_features later)
      valence: summary.patterns?.emotionalBias ?? 0,
      tempo: inferTempo(summary.metrics?.avgDurationMs)
    },

    listeningHabits: {
      repetition: summary.patterns?.confidence ?? 0,
      exploration: 1 - (summary.patterns?.mainstreamScore ?? 0),
      timeOfDay: "unknown"
    },

    artistPatterns: {
      mainstream:
        summary.patterns?.mainstreamScore > 0.6
          ? "mainstream"
          : "niche",
      loyalty: summary.patterns?.confidence ?? 0
    }
  };
}

function inferMoods(emotionalBias = 0) {
  if (emotionalBias > 0.4) return ["uplifting", "optimistic"];
  if (emotionalBias < -0.4) return ["melancholic", "introspective"];
  return ["balanced", "neutral"];
}

function inferTempo(durationMs = 0) {
  if (durationMs < 180000) return "fast";
  if (durationMs > 300000) return "slow";
  return "moderate";
}

function normalize(value = 0, max = 100) {
  return Math.min(value / max, 1);
}

