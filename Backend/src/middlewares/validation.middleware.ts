import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";

export const validateDto = (DtoClass: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const dtoObject = plainToInstance(DtoClass, req.body,{excludeExtraneousValues:true});
    const errors = await validate(dtoObject);

    if (errors.length > 0) {
      return res.status(400).json({
        message: "Validation failed",
        errors: errors.map((err) => ({
          field: err.property,
          errors: Object.values(err.constraints || {}),
        })),
      });
    }

    req.body = dtoObject; // validated and transformed
    next();
  };
};
