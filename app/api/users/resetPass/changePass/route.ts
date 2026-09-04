import prisma from "@/lib/db"
import { sendVerificationEmail } from "@/lib/email";
import { NextResponse } from "next/server"
import crypto from "node:crypto";

//1- click reset pass
//2- put email of the account 
//3- send verification code or verification button
//4- put new pass
export async function POST(request:Request) {
    const {email,password} = await request.json()
    const hasLetterAndNumber = /^(?=.*[a-zA-Z])(?=.*\d)/; //pass come from params 
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
        if (!password) {
      return NextResponse.json({ message: 'Password is required' }, { status: 400 });
    }
    if (password.length < 8) {
      return NextResponse.json(
        { message: 'Password must be at least 8 characters long' },
        { status: 400 }
      );
    }
    if (!hasLetterAndNumber.test(password)) {
      return NextResponse.json(
        { message: 'Password must contain both letters and numbers' },
        { status: 400 }
      );
    }
       await prisma.user.update({
        where:{
            email:email.toLowerCase().trim()
        },data:{
            password:password
        }
       })
}