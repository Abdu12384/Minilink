import { Document } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  phone: string;
  photoUrl?: string;
  photoPublicId?: string;
  googleId?: string;
  isVerified?: boolean;
  password?: string;
  createdAt?: Date;
  refreshToken?: string;
}
export interface UserDocument extends Document, IUser {}