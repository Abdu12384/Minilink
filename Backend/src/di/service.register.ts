import { container } from "tsyringe";
import { IAuthService } from "../interface/serviceInterface/auth.service.interface";
import { AuthService } from "../services/auth.service";
import { IUserService } from "../interface/serviceInterface/user.service.interface";
import { UserService } from "../services/user.service";
import { IUrlService } from "../interface/serviceInterface/url-service.interface";
import { UrlService } from "../services/url.service";

export class serviceRegister {
  static registerService(): void {
    container.register<IAuthService>("IAuthService", {
      useClass: AuthService,
    });

    container.register<IUserService>("IUserService", {
      useClass: UserService,
    });

    container.register<IUrlService>("IUrlService", {
      useClass: UrlService,
    });
  }
}
