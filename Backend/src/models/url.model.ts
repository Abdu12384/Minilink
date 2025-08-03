import { model, Schema } from "mongoose";
import { UrlDocument } from "../entities/url.entity";


const urlSchema = new Schema<UrlDocument>(
  {
    originalUrl: { type: String, required: true },
    shortCode: { type: String, required: true },
    shortUrl: { type: String, required: true, unique: true },
    userId: { type: String, required: true },
    isActive:{type:Boolean,default:true},
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const UrlModel = model<UrlDocument>("Url", urlSchema);