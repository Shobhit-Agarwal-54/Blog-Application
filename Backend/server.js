import express from "express";
import obj from "./config/variable.js"
import connectDB from "./config/db.js";
import authRoutes from "./routes/authroutes.js";
import blogRoutes from "./routes/blogroutes.js";
import cors from "cors";

const app=express();

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true })); 

app.use("/auth", authRoutes);
app.use("/blogs", blogRoutes);

connectDB();
app.listen(obj.PORT,()=>{
    console.log("Server started at Port ",obj.PORT);
});