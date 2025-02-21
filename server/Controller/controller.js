import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'



export const signUp = async(req,res)=>{
    try {
        const {FirstName, LastName, email,password,role}=req.body
        if(!FirstName || !LastName || !email || !password){
            return res.status(400).json({
                Message:"Enter All Details"
            })
        }

        const existingUser=await prisma.user.findUnique({
            where:{
                  email:email
            }
        })
      
        if(existingUser){
             return res.status(400).json({
                Message:"User Already Exists"
             })
        }

        const hashedPassword= await bcrypt.hash(password, 10) 

        const user=await prisma.user.create({
            data:{
                FirstName:FirstName,
                LastName:LastName,
                email:email,
                password:hashedPassword,
                role:role
            },
        })

        if(user){
            const token = jwt.sign({ id:user.id, name:user.name, email:user.email }, process.env.JWT_SECRET, {expiresIn:"1hr"});
            res.cookie('token',token)

            return res.status(200).json({
                Message:"User Created Succesfully",
                data:user,
                token:token,
                
            })
        }


    } catch (e) {
        console.log("Sign-Up Error");
        console.log(e);
    }

}


export const login=async(req,res)=>{
 
    try {

        const {email,password}=req.body
        if(!email || !password){
            return res.status(400).json({
                Message:"Enter All Details"
            })
        }

        const user=await prisma.user.findUnique({
            where:{
                email:email
            }
        })

        if(user){
                
           const check= await bcrypt.compare(password, user.password);
           const token = jwt.sign({ id:user.id, name:user.name, email:user.email }, process.env.JWT_SECRET,{expiresIn:"1hr"});
           

            if(check){
                res.cookie('token',token)
                return res.status(200).json({
                    Message:"Logged In Succesfully",
                    data:user,
                    token:token                   
                })
            }
            else{
                return res.status(400).json({
                    Message:"Wrong Password"
                })
            }
        }
        else{
            return res.status(400).json({
                Message:"User Does Not Exists, Please Create an Account"
            })
        }
        
    } catch (e) {
        console.log("Login Error");
        console.log(e);       
    }

}

export const logout = (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: true, 
        sameSite: 'Strict'
    });

    return res.status(200).json({
        message: "Logged out successfully"
    });
};


export const getUsers=async(req,res)=>{

    try {
    const users=await prisma.user.findMany()
    res.json({
        Message:"All Users",
        data:users
        })
        
    } catch (error) {
        console.log("Getting User Errors");
        return res.status(400).json({
            error:"Not Authorized"
        })
        
    }
     

}


export const getUserProfile=async(req,res)=>{
  try {

    const data=req.jwtPayload
    const profile=await prisma.user.findUnique({
      where:{
          id:data.id
      }
    })
    

    return res.status(200).json({
        Message:"User Profile",
        data:profile
    })
    
  } catch (error) {
    console.log("Profile Error");
    console.log(error);
    return res.status(400).json({
        Error:"Profile-api-Error"
    })
      
  }
}

export const deleteUsers=async(req,res)=>{

    const deleteUsers = await prisma.user.deleteMany({})

    if(deleteUsers){
        return res.json({
            message:"deleted all users"
        })
    }
    else{
        return res.json({
            message:"some probelm deleting the users"
        })
    }

}


    // const data=req.jwtPayload
    
    // const check=await checkAdmin(data.id)
    // const users=await prisma.user.findMany()
    
    // if(check){
    //     res.json({
    //         Message:"All Users",
    //         data:users
    //     })
    // }
    // else{
    //     res.json({
    //         Message:"not admin",
    //     })
    // }