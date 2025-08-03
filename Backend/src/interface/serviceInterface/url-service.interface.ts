import { IUrl } from "../../entities/url.entity"

export interface IUrlService{
 shortenUrl(originalUrl:string,userId:string):Promise<{shortUrl:string}>
 getOriginalUrl(shortCode: string): Promise<string>
 getShortUrl(userId: string,limit:number,page:number): Promise<{items:IUrl[],totalPages:number}>
 deleteUrl(id:string):Promise<{deletedUrl:IUrl}>
}