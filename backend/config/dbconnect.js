import mongoose from "mongoose";
import { configDotenv } from "dotenv";

configDotenv();
export const dbconn = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_DB_URL)
        console.log("Connected to db");
    } catch (error) {
        console.log("error",error)
    }
}