import { exerciseService } from "@/backend/llm/service";
import { INPUT_MOCK_DATA } from "@/lib/mockData";

export async function POST(request: Request) {
  try {

     const { data } = await request.json();
    // Use mock data as the default input for generating the exercise plan
    //INPUT_MOCK_DATA
    const plan = await exerciseService.generatePlan(data);
    console.log("New Plan ID:", plan.exercise_plan.plan_info.plan_id);
    console.log("Generated Plan:", plan);

    return Response.json(plan, { status: 200 });
  } catch (error) {
    console.error("Error generating plan:", error);
    return Response.json(
      { error: "Failed to generate exercise plan" },
      { status: 500 },
    );
  }
}
