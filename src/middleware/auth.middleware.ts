
import { NextFunction } from "express";
import { common } from "../helper/common";


class Authentication {
  private readonly common = common;

     authenticationByJWT =async (req: Request, res: Response, next: NextFunction): Promise<void> =>{
        try {
            
            next();
        } catch (err) {
            next(err)
        }
        
    }
 
}

export default Authentication;
