
import mongoose from 'mongoose';

const ListeningSummarySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },

  user: {
    spotifyId: String,
    displayName: String,
    country: String,
    product: String,
  },

  metrics: {
    avgPopularity: Number,
    avgDurationMs: Number,
    explicitRatio: Number,
    dominantArtists: [String],
    dominantGenres: [String],
  },

  patterns: {
    mainstreamScore: Number,
    explicitBias: Number,
    emotionalBias: Number,
    confidence: Number,
  },

  personalityTraits: [String],

  meta: {
    mode: String,
    confidenceScore: Number,
  },

  generatedAt: {
    type: Date,
    default: Date.now,
  }
});


export default mongoose.model("ListeningSummary", ListeningSummarySchema);