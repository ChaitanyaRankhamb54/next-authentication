import { UserAlreadyExistsError, EmailAlreadyExistsError } from "../../lib/error";
import hashPassword from "../../lib/bcrypt";
import getDB from "../../lib/connection";
import { ErrorInUserCreation } from "@/src/lib/error";

export async function HandleUserRegistrationService(username: string, email: string, password: string) {
  const db = await getDB();
  const usersCollection = db.collection("users");

  // Check username
  const existingUserByUsername = await usersCollection.findOne({ username });
  if (existingUserByUsername) {
    throw new UserAlreadyExistsError();
  }

  // Check email
  const existingUserByEmail = await usersCollection.findOne({ email });
  if (existingUserByEmail) {
    throw new EmailAlreadyExistsError();
  }

  // Hash password
  const hashedPassword = await hashPassword(password);

  const newUser = {
    username,
    email,
    password: hashedPassword,
  };

  try {
    await usersCollection.insertOne(newUser);
  } catch (error) {
    throw new ErrorInUserCreation();
  }

  return newUser;
}
