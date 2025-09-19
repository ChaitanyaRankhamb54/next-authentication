// services/authService.js
import User from "../../models/user";
import bcrypt from "bcryptjs";
import { generateToken } from "@/lib/jwt";

export async function registerUser(username: string, email: string, password: string) {
  const user = await User.findOne({ where: { email } });
  if (!user) throw new Error("User not found");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  // create JWT
  return generateToken({ id: user.id, email: user.email });
}
export async function loginUser(email: string, password: string) {
  const user = await User.findOne({ where: { email } });
  if (!user) throw new Error("User not found");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  // create JWT
  return generateToken({ id: user.id, email: user.email });
}