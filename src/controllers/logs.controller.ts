import { Logs } from "../models/log.model";
import { Response,Request } from "express";

export class LogsController{
    static async logscontroller(req:Request,res:Response):Promise<void>{
        try {
            const data = await Logs.find({}).sort();
            if(!data){
                res.status(404).json({message:"No Logs Present"})
            }
            res.status(200).json({data:data})
        } catch (error) {
            res.json(500).json({message:"Internal server error"})
        }
    }
}