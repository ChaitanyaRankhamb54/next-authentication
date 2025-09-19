// controllers/authController.ts
import * as authService from "../../services/authService/authRegister";
import { NextApiRequest, NextApiResponse } from "next";
import { AppError } from "../../lib/error";

export async function HandleUserRegistrationController(req: NextApiRequest, res: NextApiResponse) {
  const { username, email, password } = req.body;

  try {
    const user =
      await authService.HandleUserRegistrationService(username, email, password);

    return res.status(201).json({ user, message: "User registered successfully" });

  } catch (err: any) {
    if (err instanceof AppError) {
      return res.status(err.statusCode).json({ message: err.message });
    }

    // Unexpected error
    console.error("Unexpected error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
}
