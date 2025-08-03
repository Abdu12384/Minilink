import { Response } from "express";
import { config } from "../../config/config";

export const setCookies = (
  res: Response,
  accessToken: string,
  refreshToken: string
): void => {


  res.cookie("x-access-token", accessToken, {
    httpOnly: true,
    secure: config.isProduction,
    sameSite: "lax",
  });

  res.cookie("x-refresh-token", refreshToken, {
    httpOnly: true,
    secure: config.isProduction,
    sameSite: "lax",
  });
};


export const clearAuthCookies = (res: Response): void => {
  res.clearCookie("x-access-token");
  res.clearCookie("x-refresh-token");
};



export const updateCookieWithAccessToken = (
  res: Response,
  accessToken: string,
) => {
   res.cookie("x-access-token", accessToken,{
      httpOnly: true,
      secure: config.isProduction,
      sameSite: "lax"
   })
}