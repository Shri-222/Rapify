
import mongoose from 'mongoose';

export const ListeningSummary = new mongoose.Schema({
    userId: ObjectId,
    timeRange: String, // short_term / medium_term / long_term

    totals: {
        tracksAnalyzed: Number,
        avgEnergy: Number,
        avgValence: Number,
        avgTempo: Number
    },

    moodDistribution: {
        happy: Number,
        sad: Number,
        aggressive: Number,
        calm: Number,
        dark: Number
    },

    genreDistribution: {
        genre: String,
        percentage: Number
    },

    explicitPreference: Number, // %
    popularityBias: String, // mainstream / balanced / underground

    generatedAt: Date
})