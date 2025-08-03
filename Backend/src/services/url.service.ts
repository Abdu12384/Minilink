import { inject, injectable } from "tsyringe";
import { IUrlRepository } from "../interface/repositoryInterface/url-repository.interface";
import { IUrlService } from "../interface/serviceInterface/url-service.interface";
import { generateShortCode, isValidUrl } from "../utils/helpers/url.helpers";
import { config } from "../config/config";
import { CustomError } from "../utils/customError";
import { ERROR_MESSAGES } from "../constants/message";
import { HTTP_STATUS } from "../constants/statusCode";
import { IUrl } from "../entities/url.entity";





@injectable()
export class UrlService implements IUrlService{
    constructor(
        @inject("IUrlRepository") private urlRepository:IUrlRepository
    ){
      
    }
    async shortenUrl(originalUrl:string,userId:string):Promise<{shortUrl:string}>{

      if (!isValidUrl(originalUrl)) {
        throw new CustomError(
          ERROR_MESSAGES.INVALID_URL,
          HTTP_STATUS.BAD_REQUEST
        );
      }

      if (originalUrl.startsWith(config.baseUrl)) {
        const shortCode = originalUrl.replace(`${config.baseUrl}/`, "");
        const existingShort = await this.urlRepository.findOne({ shortCode });
    
        if (existingShort) {
          throw new CustomError(
            "This URL is already shortened by our service.",
            HTTP_STATUS.BAD_REQUEST
          );
        }
      }

      const {items} = await this.urlRepository.findAll({originalUrl});

       for (const item of items) {
         if (item.isActive) {
           throw new CustomError(
             ERROR_MESSAGES.URL_ALREADY_EXISTS,
             HTTP_STATUS.CONFLICT
           );   
         }
       }
      

      const shortCode = generateShortCode();
      const baseUrl = config.baseUrl;
      
      const shortUrl = `${baseUrl}/${shortCode}`;
      const savedUrl = await this.urlRepository.save({
        originalUrl,
        shortCode,
        shortUrl,
        userId
      })

        return {shortUrl}
    }


    async getOriginalUrl(shortCode: string): Promise<string> {
      const url = await this.urlRepository.findOne({shortCode});

      if (!url) {
        throw new CustomError(
          ERROR_MESSAGES.URL_NOT_FOUND,
          HTTP_STATUS.NOT_FOUND
        );
      }

      if (!url.isActive) {
        throw new CustomError(
          ERROR_MESSAGES.URL_NOT_FOUND,
          HTTP_STATUS.NOT_FOUND
        );
      }
      return url.originalUrl;
    }

    async getShortUrl(userId: string,limit:number,page:number): Promise<{items:IUrl[],totalPages:number}> {

      const validPageNumber = Math.max(1,page||1);
      const validPageSize = Math.max(1,limit||5);
       const skip = (validPageNumber - 1) * validPageSize;

      const {items,total} = await this.urlRepository.findAll({userId,isActive:true},skip,validPageSize,{createdAt:-1});

      if (!items) {
        throw new CustomError(
          ERROR_MESSAGES.URL_NOT_FOUND,
          HTTP_STATUS.NOT_FOUND
        );
      }
      const totalPages = Math.ceil(total / validPageSize);
      return {items, totalPages};
    }

    async deleteUrl(id:string):Promise<{deletedUrl:IUrl}>{
      const deletedUrl = await this.urlRepository.update({_id:id},{isActive:false});
      if (!deletedUrl) {
        throw new CustomError(
          ERROR_MESSAGES.URL_NOT_FOUND,
          HTTP_STATUS.NOT_FOUND
        );
      }
      return {deletedUrl};
    }
}