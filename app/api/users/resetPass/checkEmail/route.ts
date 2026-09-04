import prisma from "@/lib/db"
import { sendVerificationEmail } from "@/lib/email";
import { NextResponse } from "next/server"
import crypto from "node:crypto";

//1- click reset pass
//2- put email of the account 
//3- send verification code or verification button
//4- put new pass
export async function POST(request:Request) {
    const {email} = await request.json() //pass come from params 
    const user = await prisma.user.findUnique({
        where:{
            email:email.toLowerCase().trim()
        }
    })
    if(!email){
        return NextResponse.json({
            message:"Email is required",
        },{
            status:400
        })
    }
     const verificationToken = crypto
          .randomInt(10000, 100000)
          .toString();
        if(!user){
            return NextResponse.json({
                message:"There is no user with this email"
            });
        }
        sendVerificationEmail(email,user.name,verificationToken);
       await prisma.user.update({
        where:{
            email:email.toLowerCase().trim()
        },data:{
            verificationToken:verificationToken
        }
       })
}