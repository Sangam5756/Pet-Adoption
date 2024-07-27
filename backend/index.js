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
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl requests, etc.)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));

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
