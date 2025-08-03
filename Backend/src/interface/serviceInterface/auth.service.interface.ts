import { IUser } from "../../entities/user.entity";

export interface IAuthService{
    register(data:IUser):Promise<IUser>
    login(email:string,password:string):Promise<{user:IUser,access_token:string,refresh_token:string}|null>
    refreshTokenVerify(refresh:string,access:string):Promise<{newAccessToken:string}>
}