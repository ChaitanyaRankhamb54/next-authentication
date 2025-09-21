import z, { int, number } from "zod";
import mongoose, { Schema, Document } from "mongoose";

interface ContactResponseDocument extends Document {
  fullname: string;
  number: string;
  email: string;
  message: string;
}

export const contactResponseValidation = z.object({
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

const contactResponseSchema = new Schema<ContactResponseDocument>({
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

const contactResponse =
  (mongoose.models?.contactResponse as mongoose.Model<ContactResponseDocument>) ||
  mongoose.model<ContactResponseDocument>("contactResponse", contactResponseSchema);

export default contactResponse;

