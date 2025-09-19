// pages/api/auth/login.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { register } from "../../../../controllers/authController/authRegister";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    return register(req, res);
  }
  return res.status(405).json({ message: "Method Not Allowed" });
}
