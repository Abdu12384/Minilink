import { IUrlRepository } from "../interface/repositoryInterface/url-repository.interface";
import { UrlDocument } from "../entities/url.entity";
import { UrlModel } from "../models/url.model";
import { BaseRepository } from "./base.repository";
import { injectable } from "tsyringe";






@injectable()
export class UrlRepository extends BaseRepository<UrlDocument> implements IUrlRepository{
    constructor(){
        super(UrlModel)
    }
}   