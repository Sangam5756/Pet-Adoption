import express from "express";
import { configDotenv } from "dotenv";
import { dbconn } from "./config/dbconnect.js";
configDotenv();
import router from "./routes/index.js";
import cookieParser from "cookie-parser";
import cors from "cors"
import path from "path";


const PORT = process.env.PORT || 5001;
const app = express();

const allowedOrigins = ['http://localhost:5173', 'https://petfriend5756.onrender.com'];


app.use(express.json());
app.use(
  cors({
    // origin: "http://localhost:5173", // Your frontend URL
    origin: process.env.FRONTEND_URL || "http://localhost:5173", // Your frontend URL
    // optionsSuccessStatus: 200,
    credentials: true,
  })
);

app.use(cookieParser());

// apiz
app.use("/api", router);
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});



app.listen(PORT, () => {
  console.log(`server is running on PORT  ${PORT}`);
  dbconn();
});
