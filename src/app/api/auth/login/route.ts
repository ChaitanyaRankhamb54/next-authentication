import { HandleUserLoginController } from "@/src/controllers/authController/authLogin";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { status, body } = await HandleUserLoginController(req);
  return NextResponse.json(body, { status });
}
