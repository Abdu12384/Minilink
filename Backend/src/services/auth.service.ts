import { injectable } from "tsyringe";
import { IAuthService } from "../interface/serviceInterface/auth.service.interface";
import { IUser } from "../entities/user.entity";

@injectable()
export class AuthService implements IAuthService {
  constructor() {}
  async register(user:IUser): Promise<void> {
    
  }
}
