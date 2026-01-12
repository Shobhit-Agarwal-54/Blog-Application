import express from "express";
import obj from "./config/variable.js"
import connectDB from "./config/db.js";
import authRoutes from "./routes/authroutes.js";
import blogRoutes from "./routes/blogroutes.js";

const app=express();

app.use(cors());
app.use(express.json())

app.use("/auth", authRoutes);
app.use("/blogs", blogRoutes);

connectDB();
app.listen(()=>{
    console.log("Server started at Port ",obj.PORT);
});