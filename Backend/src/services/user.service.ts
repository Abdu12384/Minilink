import { IUser } from "../entities/user.entity";
import { IUserService } from "../interface/serviceInterface/user.service.interface";
import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../interface/repositoryInterface/user-repository.interface";
import { CustomError } from "../utils/customError";
import { HTTP_STATUS } from "../constants/statusCode";
import { ERROR_MESSAGES } from "../constants/message";
import { plainToInstance } from "class-transformer";
import { UserResponseDto } from "../utils/dto/user/user.response.dto";







@injectable()
export class UserService implements IUserService{
    constructor(
        @inject("IUserRepository") private _userRepository: IUserRepository
    ){}


    async execute(id:string):Promise<UserResponseDto>{
        const userInfo = await this._userRepository.findById(id);
        if(!userInfo){
            throw new CustomError(ERROR_MESSAGES.USER_NOT_FOUND,HTTP_STATUS.NOT_FOUND);
        }
        const userResponseDto = plainToInstance(UserResponseDto, userInfo, { excludeExtraneousValues: true });
        return userResponseDto;
    }
    
}
  