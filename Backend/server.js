import express from "express";
const app=express();
import obj from "./config/variable.js"
import connectDB from "./config/db.js";

connectDB();
app.listen(()=>{
    console.log("Server started at Port ",obj.PORT);
});