import { Request,Response } from "express";
import { inject, injectable } from "tsyringe";
import { IAuthService } from "../interface/serviceInterface/auth.service.interface";







@injectable()
export class AuthController{

 constructor(
  @inject("IAuthService") private _authService:IAuthService
 ){}
    
 async register(req:Request,res:Response){
    try {
      const {data} = req.body;
      const user = await this._authService.register(data);
      res.status(201).json(user);
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  }
}