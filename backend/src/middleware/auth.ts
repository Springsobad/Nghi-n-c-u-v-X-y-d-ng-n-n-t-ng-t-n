import { JwtPayload } from './../../node_modules/@types/jsonwebtoken/index.d';
import { NextFunction,Request,Response } from "express";
import { auth } from "express-oauth2-jwt-bearer";
import jwt from "jsonwebtoken"
import User from '../model/user';

declare global {
  namespace Express {
    interface Request {
        userId: string;
        auth0Id: string
    }
  }
}
export const jwtCheck = auth({
    audience: process.env.AUTH0_AUDIENCE,
    issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
    tokenSigningAlg: 'RS256'
  });
  
  // export const jwtParse = async (req:Request, res: Response, next:NextFunction) => {

  //  const { authorization } = req.headers;
  //  if(!authorization || !authorization.startsWith("Bearer")) {
  //     return res.sendStatus(401);
  //  }
  //  const token = authorization.split(" ")[1];

  //  try {
  //   const decoded = jwt.decode(token) as jwt.JwtPayload;
  //   const auth0Id = decoded.sub;

  //   const user= await User.findOne({auth0Id});
  //   if(!user) {
  //     return res.sendStatus(401);
  //   }
  //   req.auth0Id = auth0Id as string;
  //   req.userId = user._id.toString();
  //   next();
  //  } catch (error) {
  //   return res.sendStatus(401);
  //  }
  // } 
  export const jwtParse = async (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith("Bearer ")) {
        res.sendStatus(401);
        return;  // Đảm bảo trả về kiểu void
    }
    
    const token = authorization.split(" ")[1];
    
    try {
        const decoded = jwt.decode(token) as jwt.JwtPayload;
        const auth0Id = decoded.sub;

        const user = await User.findOne({ auth0Id });
        if (!user) {
            res.sendStatus(401);
            return;  // Đảm bảo trả về kiểu void
        }

        req.auth0Id = auth0Id as string;
        req.userId = user._id.toString();
        next();  // Express chuyển sang middleware tiếp theo; không cần return ở đây
    } catch (error) {
        res.sendStatus(401);  // Đảm bảo trả về kiểu void
    }
};
