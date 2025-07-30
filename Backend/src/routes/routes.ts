import { Router, Request, Response } from "express";
import { authController } from "../di";


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
  }
}

export const authRoutes = new AuthRoutes().router;
