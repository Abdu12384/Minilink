import { IUrl } from "../../entities/url.entity"
import { UrlResponseDto } from "../../utils/dto/url/url-response.dto"


export interface IUrlService{
 shortenUrl(originalUrl:string,userId:string):Promise<{shortUrl:string}>
 getOriginalUrl(shortCode: string): Promise<string>
 getShortUrl(userId: string,limit:number,page:number): Promise<{items:UrlResponseDto[],totalPages:number}>
 deleteUrl(id:string):Promise<{deletedUrl:IUrl}>
}