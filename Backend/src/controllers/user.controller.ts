import { inject, injectable } from "tsyringe";
import { IUserService } from "../interface/serviceInterface/user.service.interface";
import { IUserController } from "../interface/controllerInterface/user-controller.interface";
import { HTTP_STATUS } from "../constants/statusCode";
import { handleErrorResponse } from "../utils/error.handler";
import { Response ,Request} from "express";
import { CustomRequest } from "../utils/jwt";






@injectable()
export class UserController implements IUserController{
    constructor(
        @inject("IUserService") private _userService:IUserService
    ){}

    async getUserProfile(req:Request,res:Response):Promise<void>{

      const {id} = (req as unknown as CustomRequest).user;
        try {
            const user = await this._userService.execute(id);
            res.status(HTTP_STATUS.OK).json({
                success:true,
                user
            })
        } catch (error) {
            handleErrorResponse(res,error)
        }
    }
}
