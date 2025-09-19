// controllers/authController/authRegister.ts
import * as authService from "../../services/authService/authRegister";
import { NextRequest, NextResponse } from "next/server";
import { AppError } from "../../lib/error";

export async function HandleUserRegistrationController(req: NextRequest) {
  try {
    const { username, email, password } = await req.json();

    if (!username || !email || !password) {
      return NextResponse.json(
        { message: "All fields are required!" },
        { status: 400 }
      );
    }

    const user = await authService.HandleUserRegistrationService(
      username,
      email,
      password
    );

    return NextResponse.json(
      { user, message: "User registered successfully" },
      { status: 201 }
    );

  } catch (err: any) {
    if (err instanceof AppError) {
      return NextResponse.json({ message: err.message }, { status: err.statusCode });
    }

    console.error("Unexpected error:", err);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
