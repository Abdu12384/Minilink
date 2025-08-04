import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";
import { Expose } from "class-transformer";

export class RegisterUserDto {
  
  @Expose()
  @IsNotEmpty()
  @IsString()
  name!: string;

  @Expose()
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  phone!: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password!: string;
}
