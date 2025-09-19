import { HandleUserLoginService } from "@/src/services/authService/authLogin";
import { NextRequest } from "next/server";

// Controller
export async function HandleUserLoginController(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return {
        status: 400,
        body: { message: "Credentials are required!" },
      };
    }

    return await HandleUserLoginService(email, password);
  } catch (error: any) {
    console.error("Login error:", error);
    return {
      status: 500,
      body: { message: error.message || "Internal server error" },
    };
  }
}
