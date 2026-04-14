import type { Request, Response, NextFunction } from "express"
import jwt, { type JwtPayload } from 'jsonwebtoken'


export const middleware=(req:Request,res:Response,next:NextFunction)=>{
    
 const authHeader=req.headers.authorization

 if(!authHeader || !authHeader.startsWith('Bearer ')){
    res.status(400).json({
        msg:"Token not found"
    })
    return;
 }

 const token=authHeader.split(' ')[1]

 try {

    const decoded=jwt.verify(token as string, process.env.JWT_SECRET as string)
    console.log(decoded);
    
    

    if (!decoded || typeof decoded !== "object") {
      return res.status(401).json({
        msg: "Invalid token"
      })
    }

    req.user={
        userId:decoded.userId,
        email:decoded.email
    }
    next()
    
    
 } catch (error) {
    return res.status(401).json({
      msg: "Invalid or expired token"
    })
 }

}