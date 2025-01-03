import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/helper/sendVerificationEmail";
sendVerificationEmail;

export async function POST(request:Request){
  await dbConnect();
  try {
    const {username,email,password  }=await request.json()
   const existingUserVerifiedByUsername= await UserModel.findOne({
      username,
      isVerified:true
    })
    if(existingUserVerifiedByUsername){
      return Response.json({
success:false,
message:"Username is already taken"
      },{status:400})
    }
    const existingUserByEmail= await UserModel.findOne({email})
    if(existingUserByEmail){
      true //TODO BACK HERE
    }else{
      const hashedPassword= await bcrypt.hash(password,10)
      const expiryDate =new Date();
      expiryDate.setHours(expiryDate.getHours()+1)

      new UserModel({
        
      })
    }
  } catch (error) {
    console.error("Error registring user",error )
    return Response.json({
      success:false,
      message:"Error registring user"
    },
    {
      status:500
    }
  
  )
    
  }
}