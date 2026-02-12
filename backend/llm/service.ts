import OpenAI from "openai";
import {
  EXERCISE_PLANNER_SYSTEM_PROMPT,
  createExercisePlanPrompt,
} from "@/ai/prompts";
import { InformationInputData, ExercisePlanData } from "@/types";

const client = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_LLM_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

/**
 * ExerciseService handles the orchestration between different LLM endpoints
 * based on user risk and required intelligence.
 */
export class ExerciseService {
  /**
   * Generates a plan. Routes to either stateless Completions or stateful Responses.
   */
  async generatePlan(data: InformationInputData): Promise<ExercisePlanData> {
    const isHighRisk = data.user_type_and_risk.risk_level === "high";
    const reasoningModel = "openai/gpt-oss-120b"; // Hypothetical reasoning-capable model
    const standardModel = "openai/gpt-oss-120b"; // Hypothetical faster, cheaper model
    const model = isHighRisk ? reasoningModel : standardModel;

    const useReasoning = false;
    try {
      if (useReasoning) {
        return await this.generateWithReasoning(data, model);
      }
      return await this.generateStandard(data, model);
    } catch (error) {
      console.error("Failed to generate exercise plan:", error);
      throw new Error("Exercise generation service is currently unavailable.");
    }
  }

  /**
   * Method 1: Responses API (The 2026 "Agentic" Standard)
   * Best for: Medical reasoning, web-searching for real video links, and stateful tracking.
   */
  private async generateWithReasoning(
    data: InformationInputData,
    model: string,
  ): Promise<ExercisePlanData> {
    const response = await client.responses.create({
      model: model,
      instructions: EXERCISE_PLANNER_SYSTEM_PROMPT,
      input: createExercisePlanPrompt(data),
      reasoning: {
        effort:
          data.user_type_and_risk.risk_level === "high" ? "high" : "medium",
      },
      tools: [{ type: "web_search" }],
      store: true,
    });

    return JSON.parse(response.output_text) as ExercisePlanData;
  }

  /**
   * Method 2: Chat Completions API (The "Classic" Standard)
   * Best for: Speed, low cost, and healthy users like Sarah K.
   */
  private async generateStandard(
    data: InformationInputData,
    model: string,
  ): Promise<ExercisePlanData> {
    const completion = await client.chat.completions.create({
      model: model,
      messages: [
        { role: "system", content: EXERCISE_PLANNER_SYSTEM_PROMPT },
        { role: "user", content: createExercisePlanPrompt(data) },
      ],
      response_format: { type: "json_object" },
    });

    const content = completion.choices[0].message.content;
    if (!content) throw new Error("AI returned an empty response.");

    return JSON.parse(content) as ExercisePlanData;
  }
}

export const exerciseService = new ExerciseService();
