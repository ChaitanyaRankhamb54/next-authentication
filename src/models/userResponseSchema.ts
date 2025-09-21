import z from "zod";
import { Schema, Document, model, models } from "mongoose";

interface UserResponseDocument extends Document {
  fullname: string;
  number: string;
  email: string;
  message: string;
}

export const userResponseValidation = z.object({
  fullname: z.string()
    .min(3, "Full name must be at least 3 characters")
    .max(50, "Full name must be less than 50 characters"),
  number: z.string()
    .regex(/^\d{10}$/, "Number must be exactly 10 digits"),
  email: z.string()
    .email("Invalid email address"),
  message: z.string()
    .min(50, "Message must be at least 50 characters"),
});

const userResponseSchema = new Schema<UserResponseDocument>({
  fullname: {
    type: String,
    required: true,
  }, 
  number: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  message: {
    type: String,
    required: true,
  },
});

const UserResponse = models.UserResponse 
  || model<UserResponseDocument>("UserResponse", userResponseSchema);

export default UserResponse;
