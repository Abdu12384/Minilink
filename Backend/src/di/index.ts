import { container } from "tsyringe";
import { repositoryRegister } from "./repository.register";
import { serviceRegister } from "./service.register";
import { AuthController } from "../controllers/auth.controller";


export class DependencyInjection{
  static registerAll():void{
    repositoryRegister.registerRepository();
    serviceRegister.registerService();
  }
}

 DependencyInjection.registerAll();
 
export const authController = container.resolve(AuthController);    