import { HandleUserResponseService } from "@/src/services/userResponseService/userResponse";
import { NextRequest } from "next/server";

export async function HandleUserResponseController(req: NextRequest) {
  try {
    const { fullname, number, email, message } = await req.json();

    if (!fullname || !number || !email || !message) {
      return {
        status: 400,
        body: { message: "All fields are required!" },
      };
    }

    const contactResponse = await HandleUserResponseService({
      fullname,
      number,
      email,
      message
    });

    return {
      status: 201,
      body: { contactResponse, message: "User response saved successfully" },
    };
  } catch (error: any) {
    console.error("User response error:", error);
    return {
      status: 500,
      body: { message: error.message || "Internal server error" },
    };
  }
}