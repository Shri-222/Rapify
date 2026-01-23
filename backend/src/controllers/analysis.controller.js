
import { buildAnalysisPrompt } from "../services/analysisPrompt.builder.js";
import ListeningSummary from "../model/ListeningSummary.js";
import openai from "../config/openai.js";


export const analyzeListening = async (req, res) => {
  try {
    const userId = req.user.id; // from verifySession middleware
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

    if (!summary) {
      return res.status(404).json({
        error: "Listening summary not found",
      });
    }

    // 3. Build prompt
    const { system, user } = buildAnalysisPrompt({
      listeningSummary: summary.data,
      analysisType: type,
    });

    // 4. Call OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: type === "critical" ? 0.85 : 0.6,
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
    });

    const analysisText = completion.choices[0]?.message?.content;

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
