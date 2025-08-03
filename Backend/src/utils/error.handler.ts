import { Response } from "express";
import { CustomError } from "../utils/customError";
import { HTTP_STATUS } from "../constants/statusCode";
import { ERROR_MESSAGES } from "../constants/message";


export const handleErrorResponse = (res: Response, error: unknown): Response => {
  if (error instanceof CustomError) {
    console.log("Custom Error:", error.message);

    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
    });
  }

  if (error instanceof Error) {
    console.log("System Error:", error.message);

    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: ERROR_MESSAGES.SERVER_ERROR,
    });
  }

  console.log("Unknown Error:", error);

  return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: ERROR_MESSAGES.SERVER_ERROR,
  });
};
