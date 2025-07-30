import { container } from "tsyringe";
import { IAuthService } from "../interface/serviceInterface/auth.service.interface";
import { AuthService } from "../services/auth.service";

export class serviceRegister {
  static registerService(): void {
    container.register<IAuthService>("IAuthService", {
      useClass: AuthService,
    });
  }
}
