import express from "express";
import { configDotenv } from "dotenv";
import { dbconn } from "./config/dbconnect.js";
configDotenv();
import router from "./routes/index.js";
import cookieParser from "cookie-parser";
import cors from "cors"
const PORT = process.env.PORT || 5001;
const app = express();


app.use(express.json());
app.use(cookieParser());

app.use(cors());


// api
app.use("/api", router);


app.listen(PORT, () => {
  console.log(`server is running on PORT  ${PORT}`);
  dbconn();
});
