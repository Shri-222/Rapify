
import mongoose from "mongoose";

const AnalysisResultSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    type: {
      type: String,
      enum: ["normal", "critical"],
      required: true,
      index: true,
    },

    sourceSummaryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ListeningSummary",
      required: true,
    },

    analysis: {
      type: String,
      required: true,
    },

    model: {
      type: String,
      default: "gpt-4o-mini",
    },

    temperature: {
      type: Number,
      required: true,
    },

    tokenUsage: {
      promptTokens: Number,
      completionTokens: Number,
      totalTokens: Number,
    },

    expiresAt: {
      type: Date,
      default: () => new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 days
      index: { expireAfterSeconds: 0 },
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("AnalysisResult", AnalysisResultSchema);
