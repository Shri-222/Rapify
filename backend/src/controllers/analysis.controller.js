
import { buildAnalysisPrompt } from "../services/analysisPrompt.builder.js";
import ListeningSummary from "../model/ListeningSummary.js";
import openai from "../config/openai.js";
import { mapSummaryToPrompt } from "../services/spotifySanitizer.js";
import { runLLM } from "../utility/runLLM.js";

export const analyzeListening = async (req, res) => {
  try {
    const userId = req.session.sessionData.userMongoId; // from verifySession middleware
    const { type } = req.body;

    // 1. Validate input
    if (!type || !["normal", "critical"].includes(type)) {
      return res.status(400).json({
        error: "Invalid analysis type",
      });
    }

    // 2. Fetch latest listening summary
    const summary = await ListeningSummary.findOne({ userId })
      .sort({ createdAt: -1 })
      .lean();

    // console.log("Sommory that we got from Analize Listening : ", summary)

    if (!summary) {
      return res.status(404).json({
        error: "Listening summary not found",
      });
    }

    const promptSummary = mapSummaryToPrompt(summary);
    // console.log(" we gate the prompt summary :", promptSummary)

    // 3. Build prompt
    const { system, user } = buildAnalysisPrompt({
      listeningSummary: promptSummary,
      analysisType: type,
    });

    // 4. Call OpenAI
    const analysisText = await runLLM({ system, user, type });

    console.log("analysis Text : ", analysisText)

    if (!analysisText) {
      throw new Error("Empty AI response");
    }

    // 5. Respond
    return res.status(200).json({
      type,
      analysis: analysisText,
      generatedAt: new Date(),
    });

  } catch (error) {
    console.error("Analysis error:", error);

    return res.status(500).json({
      error: "Failed to generate analysis",
    });
  }
};
