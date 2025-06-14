import express from "express";
import rateLimiter from "../middleware/rateLimiter.js"

import {getTransactionByUserId,  createTransaction, deleteTransaction, getSummaryById } from "../controllers/transactionsController.js"

const router=express.Router();

router.get("/:userId",rateLimiter,getTransactionByUserId)

router.get("/summary/:userId",rateLimiter,getSummaryById)

router.post("/",createTransaction)

router.delete("/:id",deleteTransaction)

export default router;