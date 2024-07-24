import express from "express";
import { configDotenv } from "dotenv";
import { dbconn } from "./config/dbconnect.js";
configDotenv();
import router from "./routes/index.js";

const PORT = process.env.PORT || 5001;
const app = express();

app.use(express.json());

// api
app.use("/api", router);


app.listen(PORT, () => {
  console.log(`server is running on PORT  ${PORT}`);
  dbconn();
});
