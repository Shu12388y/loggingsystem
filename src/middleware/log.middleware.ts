
import { Request, Response, NextFunction } from "express";
import { logModule } from "../module/log.module";

export const logChecker = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers["authheader"];
    const userIp = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    if (authHeader !== process.env.ACCESS_TOKEN) {
      // @ts-ignore
      req.result = false; 
      logModule(userIp as string);
      res.status(401).json({message:"Invalid access token"})
    } 
    else{

      // @ts-ignore
      req.result = true; 
      next(); 
      
    }
  } catch (error) {
    console.error("Error in logChecker:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
