
import mongoose from 'mongoose';

const ListeningSummarySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
    },
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

export default mongoose.model("ListeningSummary", ListeningSummarySchema);