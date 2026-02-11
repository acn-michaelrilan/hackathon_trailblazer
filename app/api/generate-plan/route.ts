import { exerciseService } from "@/backend/llm/service";
import { INPUT_MOCK_DATA } from "@/lib/mockData";

async function handleGenerate() {
  // This will automatically choose the right API based on the mock data
  const plan = await exerciseService.generatePlan(INPUT_MOCK_DATA);
  console.log("New Plan ID:", plan.exercise_plan.plan_info.plan_id);
}
