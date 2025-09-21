import { HandleUserResponseController } from "@/src/controllers/userResponseController/userResponse";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const {status, body} = await HandleUserResponseController(req);
  return NextResponse.json(body, { status });
}

