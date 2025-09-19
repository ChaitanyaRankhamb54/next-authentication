import getDB from "@/src/lib/connection";
import { ErrorInSecretKey } from "@/src/lib/error";
import generateToken from "@/src/lib/jwt";
import bcrypt from "bcryptjs";

export async function HandleUserLoginService(email: string, password: string) {
  try {
    const db = await getDB();
    const usersCollection = db.collection("users");
    const user = await usersCollection.findOne({ email });

    if (!user) {
      return {
        status: 401,
        body: { message: "User not found with this credentials." },
      };
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return {
        status: 401,
        body: { message: "Invalid Credentials!" },
      };
    }

    const secret = process.env.AUTH_SECRET;
    if (!secret) {
      throw new ErrorInSecretKey();
    }

    const token = generateToken(
      { id: user._id, email: user.email, username: user.username },
      secret,
      { expiresIn: "1h" }
    );

    return {
      status: 200,
      body: { token, message: "Login successful" },
    };
  } catch (error: any) {
    console.error("Service error:", error);
    return {
      status: 500,
      body: { message: "Something went wrong while logging in." },
    };
  }
}
