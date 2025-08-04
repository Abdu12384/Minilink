import { Router, Request, Response } from "express";
import {  urlController } from "../di";
import { authMiddleware } from "../middlewares/auth.middleware";
import { validateDto } from "../middlewares/validation.middleware";
import { ShortenUrlDto } from "../utils/dto/url/url-input.dto";

class UrlRoutes {
  public router: Router;
  constructor() {
    this.router = Router();
    this.initialRoutes();
  }
  initialRoutes(): void {
    this.router.post("/shorten", validateDto(ShortenUrlDto), authMiddleware, (req: Request, res: Response) => {
      urlController.shortenUrl(req, res);
    });

    this.router.get("/urls", authMiddleware, (req: Request, res: Response) => {
      urlController.getAllUrls(req, res);
    })
    
   this.router.get("/:shortCode", (req: Request, res: Response) => {
      urlController.redirectToOriginalUrl(req, res);
    });

    this.router.patch("/url/:id", authMiddleware, (req: Request, res: Response) => {
      urlController.deleteUrl(req, res);
    });
     
  }
}

export const urlRoutes = new UrlRoutes().router;
