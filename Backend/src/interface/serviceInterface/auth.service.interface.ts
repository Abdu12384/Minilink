import { IUser } from "../../entities/user.entity";

export interface IAuthService{
    register(user:IUser):Promise<void>
}