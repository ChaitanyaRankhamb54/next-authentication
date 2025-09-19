import { NextRequest, NextResponse } from "next/server";
import { HandleUserRegistrationController } from "../../../../controllers/authController/authRegister";

export async function POST(req: NextRequest) {
  const { status, body } = await HandleUserRegistrationController(req);
  return NextResponse.json(body, { status });
}
