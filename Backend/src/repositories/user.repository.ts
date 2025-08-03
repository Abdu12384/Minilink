import { injectable } from "tsyringe";
import { IUser, UserDocument } from "../entities/user.entity";
import { IUserRepository } from "../interface/repositoryInterface/user-repository.interface";
import { UserModel } from "../models/user.model";
import { BaseRepository } from "./base.repository";






@injectable()
export class UserRepository extends BaseRepository<UserDocument> implements IUserRepository{
  constructor(){
    super(UserModel)
 }
    findByEmail(email:string):Promise<UserDocument | null>{
      return UserModel.findOne({email})
    }
    findById(id:string):Promise<UserDocument | null>{
      return UserModel.findById(id)
    }
    
}