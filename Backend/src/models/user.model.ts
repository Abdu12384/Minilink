import { Schema, model } from "mongoose";
import { UserDocument } from "../entities/user.entity";

const userSchema = new Schema<UserDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    password: String,
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const UserModel = model<UserDocument>("User", userSchema);