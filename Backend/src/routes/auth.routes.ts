import { Router, Request, Response } from "express";
import { authController } from "../di";
import { validateDto } from "../middlewares/validation.middleware";
import { RegisterUserDto } from "../utils/dto/auth/register-input.dto";
import { LoginUserDto } from "../utils/dto/auth/login-input.dto";

class AuthRoutes {
  public router: Router;
  constructor() {
    this.router = Router();
    this.initialRoutes();
  }
  initialRoutes(): void {
    this.router.post("/register", validateDto(RegisterUserDto), (req: Request, res: Response) => {
      authController.register(req, res);
    });

    this.router.post("/login", validateDto(LoginUserDto), (req: Request, res: Response) => {
      authController.login(req, res);
    });

    this.router.post("/refresh-token",  (req: Request, res: Response) => {
      authController.getRefreshToken(req, res);
    });
  }
}

export const authRoutes = new AuthRoutes().router;
