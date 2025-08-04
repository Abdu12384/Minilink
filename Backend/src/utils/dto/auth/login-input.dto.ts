import { Expose } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class LoginUserDto {
  @Expose()
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  password!: string;
}
