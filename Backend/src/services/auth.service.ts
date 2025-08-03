import { inject, injectable } from "tsyringe";
import { IAuthService } from "../interface/serviceInterface/auth.service.interface";
import { IUser } from "../entities/user.entity";
import { IUserRepository } from "../interface/repositoryInterface/user-repository.interface";
import { CustomError } from "../utils/customError";
import { HTTP_STATUS } from "../constants/statusCode";
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "../constants/message";
import { comparePassword, hashPassword } from "../utils/bycript";
import {
  createAccessToken,
  createRefreshToken,
  CustomJwtPayload,
  verifyRefreshToken,
} from "../utils/jwt";

@injectable()
export class AuthService implements IAuthService {
  constructor(
    @inject("IUserRepository") private _userRepository: IUserRepository
  ) {}

  async register(data: IUser): Promise<IUser> {
    const user = await this._userRepository.findByEmail(data.email);
    if (user) {
      throw new CustomError(
        SUCCESS_MESSAGES.USER_ALREADY_EXISTS,
        HTTP_STATUS.CONFLICT
      );
    }

    const hashedPassword = await hashPassword(data.password!);
    data.password = hashedPassword;

    const savedUser = await this._userRepository.save(data);
    return savedUser;
  }



  async login(
    email: string,
    password: string
  ): Promise<{
    user: IUser;
    access_token: string;
    refresh_token: string;
  } | null> {
    const user = await this._userRepository.findByEmail(email);
    console.log(user);
     if(!user){
      throw new CustomError(
        ERROR_MESSAGES.USER_NOT_FOUND,
        HTTP_STATUS.NOT_FOUND
      );
     }
     if(!(await comparePassword(password,user.password!))){
      throw new CustomError(
        ERROR_MESSAGES.INVALID_CREDENTIALS,
        HTTP_STATUS.UNAUTHORIZED
      );
     }
    const payload: CustomJwtPayload = {
      id: user.id,
      email: user.email,
    };
    const access_token = createAccessToken(payload);
    const refresh_token = createRefreshToken(payload);
    console.log(access_token,refresh_token)
    await this._userRepository.update({_id:user.id}, { refreshToken: refresh_token });
    return { user, access_token, refresh_token };
  }





  
  async refreshTokenVerify(
    refresh: string,
    access: string
  ): Promise<{ newAccessToken: string; }> {
    const decoded: any = verifyRefreshToken(refresh);
    const user = await this._userRepository.findById(decoded.id);
    if (!user) {
      throw new CustomError(ERROR_MESSAGES.TOKEN_INVALID_REUSED,HTTP_STATUS.UNAUTHORIZED);
    }

    const payload: CustomJwtPayload = {
      id: user.id,
      email: user.email,
    };

    const newAccessToken = createAccessToken(payload);


    // user.refreshToken = newRefreshToken;
    // await this._userRepository.update(user._id, {
    //   refreshToken: newRefreshToken,
    // })

    return { newAccessToken };
  }
}
