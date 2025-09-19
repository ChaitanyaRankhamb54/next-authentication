// controllers/authController.js
import * as authService from "../../services/authService/authRegister";
import { NextApiRequest, NextApiResponse } from "next";

export async function register(req: NextApiRequest, res: NextApiResponse) {
  const { username, email, password } = req.body;

  try {
    const user = await authService.registerUser(username, email, password);
    res.status(201).json({ user });
  } catch (err: any) {
    res.status(401).json({ message: err.message });
  }
}
