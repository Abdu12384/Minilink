import { container } from "tsyringe";
import { repositoryRegister } from "./repository.register";
import { serviceRegister } from "./service.register";
import { AuthController } from "../controllers/auth.controller";
import { IAuthController } from "../interface/controllerInterface/auth-controller.interface";
import { IUserController } from "../interface/controllerInterface/user-controller.interface";
import { UserController } from "../controllers/user.controller";
import { IUrlController } from "../interface/controllerInterface/url-controller.interface";
import { UrlController } from "../controllers/url.controller";


export class DependencyInjection{
  static registerAll():void{
    repositoryRegister.registerRepository();
    serviceRegister.registerService();
  }
}

 DependencyInjection.registerAll();
 
export const authController = container.resolve<IAuthController>(AuthController);   
export const userController = container.resolve<IUserController>(UserController); 
export const urlController = container.resolve<IUrlController>(UrlController); 
