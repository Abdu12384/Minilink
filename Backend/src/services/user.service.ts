import { IUser } from "../entities/user.entity";
import { IUserService } from "../interface/serviceInterface/user.service.interface";
import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../interface/repositoryInterface/user-repository.interface";
import { CustomError } from "../utils/customError";
import { HTTP_STATUS } from "../constants/statusCode";
import { ERROR_MESSAGES } from "../constants/message";







@injectable()
export class UserService implements IUserService{
    constructor(
        @inject("IUserRepository") private _userRepository: IUserRepository
    ){}


    async execute(id:string):Promise<IUser>{
        const user = await this._userRepository.findById(id);
        if(!user){
            throw new CustomError(ERROR_MESSAGES.USER_NOT_FOUND,HTTP_STATUS.NOT_FOUND);
        }
        return user;
    }
    
}
  