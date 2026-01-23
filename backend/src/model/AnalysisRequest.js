
import mongoose from 'mongoose';

const AnalysisRequestSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
    },
    tone: String, // "normal" | "critical" | "brutal"
    timeRange: String,
    summarySnapshot: Object, // frozen ListeningSummary
    createdAt: Date
})

export default mongoose.model("AnalysisRequest", AnalysisRequestSchema);