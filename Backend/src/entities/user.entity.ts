import { Document } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  phone: string;
  password?: string;
  createdAt?: Date;
  refreshToken?: string;
}
export interface UserDocument extends Document, IUser {}