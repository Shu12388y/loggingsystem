import { Request, Response } from "express";

export class UserSubmitController {
  static async userSubmitController(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      
      // @ts-ignore
      const isTokenValid = await req.result;
      if(isTokenValid){
        res.status(200).json({message:"Valide access token"})
      }


    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
}
