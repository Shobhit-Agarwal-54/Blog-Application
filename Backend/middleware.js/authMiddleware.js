import jwt from "jsonwebtoken";
import obj from "../config/variable.js";
export const protect = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Not authorized, token missing" });
  }

  try {
    const decoded = jwt.verify(token, obj.JWT_SECRET);
    req.user = decoded; // { id }
    next();
  } catch {
    res.status(401).json({
      sucess:false,
       message: "Invalid token" 
      });
  }
};
