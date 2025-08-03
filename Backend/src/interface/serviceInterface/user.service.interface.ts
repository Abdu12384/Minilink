import { IUser } from "../../entities/user.entity";

export interface IUserService{
    execute(id:string):Promise<IUser>
  }
