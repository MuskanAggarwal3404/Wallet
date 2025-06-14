import express from  "express";
import dotenv from "dotenv";
import {initDB} from "./config/db.js";
import ratelimiter from "./middleware/rateLimiter.js";
import transactionsRoute from "./routes/transcationsRoute.js";
import cors from "cors";

dotenv.config();
const app=express();
const PORT=5001;

app.use(cors());
app.use(express.json());
app.use(ratelimiter);

app.use("/api/transactions",transactionsRoute);

initDB().then(()=>{
    app.listen(PORT,()=>{
    console.log(`Server is up and working on Port : ${PORT}`);
})
})