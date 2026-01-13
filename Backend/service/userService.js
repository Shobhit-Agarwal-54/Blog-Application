import { createUser } from "../repository/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import obj from "../config/variable.js";

export async function generateHashedPassword(password)
{
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(password, salt);
     return hashed;
}

export async function comparePassword(password,hashedPassword)
{
   return await bcrypt.compare(password, hashedPassword);
}

export async function createJWT(userId)
{
    const token = await jwt.sign({ id: userId }, obj.JWT_SECRET, {
              expiresIn: "1d"
            });
    return token;
}

export async function createUserDetails({name,email,password}) 
{
    try {
        const hashedPassword=await generateHashedPassword(password);
        const user=await createUser({name,email,password:hashedPassword});
        return user;  
    } catch (error) {
        console.log("Error in service layer at createUserDetails()",error);
        throw error;
    }
}