import type { InformationInputData } from "@/types";
import { EXERCISE_EXAMPLES } from "./examples";
import { EXERCISE_PLAN_TS_SCHEMA } from "./schema";

// Helper function to estimate tokens (rough approximation: ~4 chars per token)
function estimateTokens(text: string): number {
  return Math.ceil(text.length / 4);
}

export const EXERCISE_PLANNER_SYSTEM_PROMPT = `Act as an expert clinical exercise physiologist. Create a JSON workout plan based on the user's input, strictly adhering to the interface defined below.
DOMAIN RULES:
1. **Medical Safety**: Analyze input for conditions (Stroke, Cardiac, etc.). Add specific safety notes, asymmetry adjustments (for stroke), and supervision requirements.
2. **Progression**: Week 1 (Base) -> Week 2 (Volume) -> Week 3 (Complexity) -> Week 4 (Test).
3. **Completeness**: Every exercise must have 'easier' (regression) and 'harder' (progression) modifications.
4. **Format**: Output valid JSON only. No markdown. No pre-text.

INTERFACE DEFINITION:
${EXERCISE_PLAN_TS_SCHEMA}

`;

export function createExercisePlanPrompt(input: InformationInputData): string {
  const userPrompt = `INPUT:
${JSON.stringify(input, null, 2)}

OUTPUT (valid JSON only, no markdown):`;

  const systemTokens = estimateTokens(EXERCISE_PLANNER_SYSTEM_PROMPT);
  const userTokens = estimateTokens(userPrompt);
  const totalTokens = systemTokens + userTokens;

  console.log(`📊 Token Usage:`);
  console.log(`  System Prompt: ${systemTokens} tokens`);
  console.log(`  User Prompt: ${userTokens} tokens`);
  console.log(`  Total: ${totalTokens} tokens`);

  return userPrompt;
}
