
import mongoose from 'mongoose';

export const AnalysisRequest = new mongoose.Schema({
    userId: ObjectId,
    tone: String, // "normal" | "critical" | "brutal"
    timeRange: String,
    summarySnapshot: Object, // frozen ListeningSummary
    createdAt: Date
})