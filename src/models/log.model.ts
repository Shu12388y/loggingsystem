import mongoose from "mongoose";

interface Logs{
    ipAddress:string;
    timestamps:string;
    reason:string
}


const logsSchema = new mongoose.Schema<Logs>({

    ipAddress:{
        type:String,
    },
    timestamps:{
        type:String
    },
    reason:{
        type:String
    }
},{timestamps:true})


export const Logs = mongoose.models.Logs || mongoose.model('Logs',logsSchema);