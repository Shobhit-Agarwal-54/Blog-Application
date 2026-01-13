import { userExist } from "../repository/user.js";
import { comparePassword, createJWT, createUserDetails } from "../service/userService.js";

export const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
      
        const exists = await userExist(email);
        if (exists) 
          return res.status(400).json(
          {
           message: "User already exists" 
          });
      
        const user = await createUserDetails({name,email,password});
      
        return res.status(201).json(
            {
             success:true,
             message: "User registered successfully",
             user:user
            });
        
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"User details not created",
            error:error
        })
    }
};

export  const login = async (req, res) => {
    try {
        const { email, password } = req.body;
      
        const user = await userExist(email);
        if (!user) 
        return res.status(400).json(
            { 
                success:false,
                message: "Invalid credentials! User does not exist", 
            }
        );
      
        const isMatch = comparePassword(password,user.password);
        if (!isMatch) 
            return res.status(400).json(
            {
            success:false,
             message: "Invalid credentials! Passwords does not match" 
            });
      
          const token= await createJWT(user._id);
      
        return res.status(200).json({
             token,
             user,
             success:true,
             message:"Login Successful"
             });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Login failed",
            error
        });
    }
};
