import { Router, Request, Response } from "express";
import { authController, userController } from "../di";
import { authMiddleware } from "../middlewares/auth.middleware";


class UserRoutes {
  public router: Router;
  constructor() {
    this.router = Router();
    this.initialRoutes();
  }
  initialRoutes(): void {
    this.router.get("/profile", authMiddleware, (req: Request, res: Response) => {
      userController.getUserProfile(req, res);
    })

    this.router.post("/logout", authMiddleware, (req: Request, res: Response) => {
      authController.logout(req, res);
    });
  }
}

export const userRoutes = new UserRoutes().router;