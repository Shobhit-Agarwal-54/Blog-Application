import jwt from "jsonwebtoken";
import obj from "../config/variable.js";
export  const protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  console.log(token);
  if (!token) {
    return res.status(401).json({ message: "Not authorized, token missing" });
  }

  try {
    const decoded = await jwt.verify(token, obj.JWT_SECRET);
    console.log("This is step 1");
    console.log(decoded);
    req.user = decoded; 
    console.log("This is step 2");
    next();
  } catch(error) {
    console.log(error);
    res.status(401).json({
      sucess:false,
       message: "Invalid token",
       error
      });
  }
};
