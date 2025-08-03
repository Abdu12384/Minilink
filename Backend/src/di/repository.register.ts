import { container } from "tsyringe";
import { IUserRepository } from "../interface/repositoryInterface/user-repository.interface";
import { UserRepository } from "../repositories/user.repository";
import { IUrlRepository } from "../interface/repositoryInterface/url-repository.interface";
import { UrlRepository } from "../repositories/url.repository";




export class repositoryRegister {
    static registerRepository():void{
        container.register<IUserRepository>("IUserRepository", {
          useClass: UserRepository,
        });

        container.register<IUrlRepository>("IUrlRepository", {
          useClass: UrlRepository,
        });
    }
}
