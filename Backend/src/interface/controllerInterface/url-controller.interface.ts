import { Request, Response } from "express";

export interface IUrlController{
    shortenUrl(req:Request,res:Response):Promise<void>
    redirectToOriginalUrl(req:Request,res:Response):Promise<void>
    getAllUrls(req:Request,res:Response):Promise<void>
    deleteUrl(req:Request,res:Response):Promise<void>
}
