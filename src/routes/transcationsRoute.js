import express from "express";
import ratelimiter from "../middleware/rateLimiter.js"

import {getTransactionByUserId,  createTransaction, deleteTransaction, getSummaryById } from "../controllers/transactionsController.js"

const router=express.Router();

router.get("/:userId",ratelimiter,getTransactionByUserId)

router.get("/summary/:userId",ratelimiter,getSummaryById)

router.post("/",createTransaction)

router.delete("/:id",deleteTransaction)

export default router;