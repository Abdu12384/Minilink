import { Request,Response } from "express";
import { inject, injectable } from "tsyringe";
import { IAuthService } from "../interface/serviceInterface/auth.service.interface";
import { HTTP_STATUS } from "../constants/statusCode";
import { handleErrorResponse } from "../utils/error.handler";
import { CustomError } from "../utils/customError";
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "../constants/message";
import { verifyAccessToken } from "../utils/jwt";
import { clearAuthCookies, setCookies, updateCookieWithAccessToken } from "../utils/helpers/cookie.herlper";
import { IAuthController } from "../interface/controllerInterface/auth-controller.interface";
import { error } from "console";
import { RegisterUserDto } from "../utils/dto/auth/register-input.dto";



@injectable()
export class AuthController implements IAuthController{

 constructor(
  @inject("IAuthService") private _authService:IAuthService
 ){}
    

 // register
 //===================================================================
 async register(req:Request,res:Response){
    try {
      console.log('register data',req.body)
      const data:RegisterUserDto = req.body;
      console.log(data);
      const user = await this._authService.register(data);
      res.status(201).json({
        success:true,
        message:SUCCESS_MESSAGES.USER_REGISTERED,
      });
    } catch (error) {
      handleErrorResponse(res,error);
    }
  }
  

  // login
  //===================================================================

  async login(req:Request,res:Response):Promise<void>{
    try {
      const {email, password} = req.body;
      console.log(email,password);
      const loginResult = await this._authService.login(email, password);

          if (!loginResult) {
             res.status(HTTP_STATUS.UNAUTHORIZED).json({
              success: false,
              message: ERROR_MESSAGES.INVALID_CREDENTIALS,
            });
            return;
          }
      const {user,access_token,refresh_token} = loginResult;

      setCookies(res, access_token, refresh_token);

      res.status(HTTP_STATUS.OK).json({
        success:true,
        message:SUCCESS_MESSAGES.LOGIN_SUCCESS,
        user
      });

    } catch (error) {
      handleErrorResponse(res,error);
    }
  }


  // refresh token
  //===================================================================

  async getRefreshToken(req: Request, res: Response){
    
    const accessToken = req.cookies["x-access-token"];
    const refreshToken = req.cookies["x-refresh-token"];
    console.log("refreshToken",refreshToken)
    console.log("accessToken",accessToken)

    if (!refreshToken) {
        throw new CustomError(ERROR_MESSAGES.TOKEN_MISSING, HTTP_STATUS.UNAUTHORIZED);
    }
    let shouldRefresh = false;
    try {
        verifyAccessToken(accessToken);
        res.status(HTTP_STATUS.OK).json({
        success: true,
        message: SUCCESS_MESSAGES.TOKEN_VALID,
        });
        return;
    } catch (err: any) {
        if (err.name === "TokenExpiredError") {
        shouldRefresh = true;
        } else {
        throw new CustomError(
            ERROR_MESSAGES.TOKEN_INVALID,
            HTTP_STATUS.UNAUTHORIZED
        );
        }
    }
    if(shouldRefresh){
        try{
            const {newAccessToken} = await this._authService.refreshTokenVerify(refreshToken,accessToken)
            updateCookieWithAccessToken(res, newAccessToken);
            res.status(HTTP_STATUS.OK).json({
                success: true,
                message: SUCCESS_MESSAGES.SESSION_RENEWED,
            })
        }catch(error){
            handleErrorResponse(res,error);
        }
    }
}



  async logout(req: Request, res: Response): Promise<void> {
     try{
      clearAuthCookies(res);
			res.status(HTTP_STATUS.OK).json({
				success: true,
				message: SUCCESS_MESSAGES.LOGOUT_SUCCESS,
			});

     }catch{
      handleErrorResponse(res,error)
     }
  }
 
}