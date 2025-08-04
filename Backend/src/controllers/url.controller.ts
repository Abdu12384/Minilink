import { Request, Response } from "express";
import { IUrlController } from "../interface/controllerInterface/url-controller.interface";
import { handleErrorResponse } from "../utils/error.handler";
import { CustomRequest } from "../utils/jwt";
import { inject, injectable } from "tsyringe";
import { IUrlService } from "../interface/serviceInterface/url-service.interface";
import { SUCCESS_MESSAGES } from "../constants/message";

@injectable()
export class UrlController implements IUrlController {
  constructor(@inject("IUrlService") private urlService: IUrlService) {}

  async shortenUrl(req: Request, res: Response): Promise<void> {
    try {
      const { originalUrl } = req.body;
      console.log("req.body",req.body)

      const userId = (req as unknown as CustomRequest).user.id;

      if (!userId) {
        res.status(401).json({ error: "Unauthorized" });
        return;
      }

      const { shortUrl } = await this.urlService.shortenUrl(
        originalUrl,
        userId
      );

      res.status(200).json({
        success: true,
        shortUrl,
      });
    } catch (error) {
      handleErrorResponse(res, error);
    }
  }


  async redirectToOriginalUrl(req: Request, res: Response): Promise<void> {
    try {
      const { shortCode } = req.params;
      const originalUrl = await this.urlService.getOriginalUrl(shortCode);
      res.redirect(originalUrl);
    } catch (error) {
      handleErrorResponse(res, error);
    }
  }


  

  async getAllUrls(req:Request,res:Response):Promise<void>{
    try {
       const userId = (req as unknown as CustomRequest).user.id;
       const {limit,page} = req.query;
       const PageSize = Number(limit)
       const pageNumber = Number(page)

      const  urls = await this.urlService.getShortUrl(
        userId,
        PageSize,
        pageNumber
      );
       res.status(200).json({
        success:true,
        urls
       })
    } catch (error) {
      handleErrorResponse(res,error);
    }
  }

  async deleteUrl(req:Request,res:Response):Promise<void>{
    try {
      const {id} = req.params;
      const deletedUrl = await this.urlService.deleteUrl(id);
      res.status(200).json({
        success:true,
        message:SUCCESS_MESSAGES.URL_DELETED,
        deletedUrl
      })
    } catch (error) {
      handleErrorResponse(res,error);
    }
  }
}
