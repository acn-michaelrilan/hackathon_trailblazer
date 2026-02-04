
import { NextResponse } from "next/server";
import { getHello } from "@/backend/hello/service";

// GET /api/hello
export async function GET() {
  // Could be async later; kept simple for now.
  const message = getHello();
  return NextResponse.json({ message }); 
}
