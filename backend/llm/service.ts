import OpenAI from "openai";
import {
  EXERCISE_PLANNER_SYSTEM_PROMPT,
  createExercisePlanPrompt,
} from "@/ai/prompts";
import {
  EXERCISE_PLAN_JSON_SCHEMA_OBJECT,
  EXERCISE_PLAN_TS_SCHEMA,
  EXERCISE_PLAN_ZOD_SCHEMA,
} from "@/ai/schema";
import { InformationInputData, ExercisePlanData } from "@/types";

const groqClient = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_LLM_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

const openaiClient = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
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
    const reasoningModel = "gpt-5-mini"; // OpenAI model for Responses API
    const standardModel = "openai/gpt-oss-120b"; // Groq-hosted model for Chat Completions API

    const useReasoning = false;
    try {
      if (useReasoning) {
        return await this.generateWithReasoning(data, reasoningModel);
      }
      return await this.generateStandard(data, standardModel);
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
    const response = await openaiClient.responses.create({
      model: model,
      instructions: EXERCISE_PLANNER_SYSTEM_PROMPT,
      input: createExercisePlanPrompt(data),
      text: {
        format: {
          type: "json_schema",
          name: "ExercisePlanOutput",
          strict: true,
          schema: EXERCISE_PLAN_JSON_SCHEMA_OBJECT,
        },
      },
      reasoning: {
        effort:
          data.user_type_and_risk.risk_level === "high" ? "high" : "medium",
      },
      tools: [{ type: "web_search" }],
      store: true,
    });

    const outputText = response.output_text;
    if (!outputText) throw new Error("AI returned an empty response.");

    console.log("OpenAI response content:", outputText);
    return await this.parseAndValidatePlan(outputText, model);
  }

  /**
   * Method 2: Chat Completions API (The "Classic" Standard)
   * Best for: Speed, low cost, and healthy users like Sarah K.
   */
  private async generateStandard(
    data: InformationInputData,
    model: string,
  ): Promise<ExercisePlanData> {
    const completion = await groqClient.chat.completions.create({
      model: model,
      messages: [
        { role: "system", content: EXERCISE_PLANNER_SYSTEM_PROMPT },
        { role: "user", content: createExercisePlanPrompt(data) },
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "ExercisePlanOutput",
          strict: false,
          schema: EXERCISE_PLAN_JSON_SCHEMA_OBJECT,
        },
      },
    });

    const content = completion.choices[0].message.content;
    if (!content) throw new Error("AI returned an empty response.");

    console.log("Groq response content:", content);
    return await this.parseAndValidatePlan(content, model);
  }

  private extractJson(text: string): string {
    const trimmed = text.trim();
    const firstBrace = trimmed.indexOf("{");
    const lastBrace = trimmed.lastIndexOf("}");
    if (firstBrace === -1 || lastBrace === -1 || lastBrace <= firstBrace) {
      return trimmed;
    }
    return trimmed.slice(firstBrace, lastBrace + 1);
  }

  private formatZodIssues(
    issues: {
      path: (string | number)[];
      message: string;
    }[],
  ): string {
    if (issues.length === 0) return "Unknown schema error.";
    return issues
      .map((issue) => {
        const path = issue.path.length ? issue.path.join(".") : "(root)";
        return `- ${path}: ${issue.message}`;
      })
      .join("\n");
  }

  private async parseAndValidatePlan(
    rawText: string,
    model: string,
  ): Promise<ExercisePlanData> {
    const jsonText = this.extractJson(rawText);

    let parsed: unknown;
    try {
      parsed = JSON.parse(jsonText);
    } catch (error) {
      throw new Error("AI returned invalid JSON.");
    }

    const validation = EXERCISE_PLAN_ZOD_SCHEMA.safeParse(parsed);
    if (validation.success) return validation.data as ExercisePlanData;

    const issueText = this.formatZodIssues(validation.error.issues);
    throw new Error(`AI output failed schema validation: ${issueText}`);
  }
}

export const exerciseService = new ExerciseService();
