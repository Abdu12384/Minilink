// src/dto/url.dto.ts
import { Expose } from "class-transformer";
import { IsUrl, IsNotEmpty } from "class-validator";

export class ShortenUrlDto {
  @Expose()
  @IsUrl({}, { message: "originalUrl must be a valid URL" })
  @IsNotEmpty({ message: "originalUrl is required" })
  originalUrl!: string;
}
