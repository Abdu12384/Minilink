import { Document } from "mongoose";

export interface IUrl{
    originalUrl:string,
    shortCode:string,
    shortUrl:string,
    isActive:boolean,
    userId:string,
    createdAt:Date,
}
export interface UrlDocument extends Document, IUrl {}