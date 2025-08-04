// utils/dto/url-response.dto.ts
import { Expose, Transform } from 'class-transformer';

export class UrlResponseDto {
  @Expose()
  @Transform(({ obj }) => obj._id.toString())
  _id!: string;

  @Expose()
  originalUrl!: string;

  @Expose()
  shortCode!: string;

  @Expose()
  shortUrl!: string;

  @Expose()
  createdAt!: Date;
}
