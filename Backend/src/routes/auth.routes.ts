import { Router, Request, Response } from "express";
import { authController } from "../di";
import { authMiddleware } from "../middlewares/auth.middleware";


class AuthRoutes {
  public router: Router;
  constructor() {
    this.router = Router();
    this.initialRoutes();
  }
  initialRoutes(): void {
    this.router.post("/register", (req: Request, res: Response) => {
      authController.register(req, res);
    });

    this.router.post("/login", (req: Request, res: Response) => {
      authController.login(req, res);
    });

    this.router.post("/refresh-token",  (req: Request, res: Response) => {
      authController.getRefreshToken(req, res);
    });
  }
}

export const authRoutes = new AuthRoutes().router;
