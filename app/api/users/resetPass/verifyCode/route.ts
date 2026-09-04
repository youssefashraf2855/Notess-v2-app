import prisma from "@/lib/db"
import { sendVerificationEmail } from "@/lib/email";
import { NextResponse } from "next/server"
import crypto from "node:crypto";

//1- click reset pass
//2- put email of the account 
//3- send verification code or verification button
//4- put new pass
export async function POST(request:Request) {
    const {email,code} = await request.json() //pass come from params 
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
     if(!user){
            return NextResponse.json({
                message:"There is no user with this email"
            });
        }
     if(user.verificationToken !== code.toString().trim()){
        return NextResponse.json({
            message:"Code not correct"
        })
     }else{
        return NextResponse.json({
            message:"Correct code"
        })
     }
}