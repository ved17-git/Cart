import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const authMiddleware=(req,res,next)=>{
    
    //check karo autorization hai kya
   const authorization=req.headers.authorization
   if(!authorization){
    return res.status(400).json({
        Error:"Token not found"
    })
   }
    
   //fir token check karo
    const token=req.headers.authorization.split(' ')[1];
    if(!token){
        return res.status(400).json({
            Error:"Unauthorized"
        })
    }

    try {
        const decoded=jwt.verify(token, process.env.JWT_SECRET)
        req.jwtPayload=decoded
        next()
        
    } catch (error) {
        console.log("Token Verify Error");
        console.log(error); 
        return res.status(400).json({
            error:"Wrong Token"
        })
       
    }

}

export const checkAdmin=async(req,res,next)=>{
    try {    
    const data=req.jwtPayload
    const user=await prisma.user.findUnique({
        where:{
            id:data.id
        }
    })

        if(user.role==="admin"){
            next()
        }else{
            return res.status(400).json({
                error:"Not Authorized"
            })
        }      
    } catch (error) {
        console.log("Role Error" ,error);
        return res.status(400).json({
            error:"Not Authorized"
        })
    }
}

