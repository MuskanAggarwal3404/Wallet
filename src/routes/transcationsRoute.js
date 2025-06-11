import express from "express";

import {getTransactionByUserId,  createTransaction, deleteTransaction, getSummaryById } from "../controllers/transactionsController.js"

const router=express.Router();

router.get("/:userId",getTransactionByUserId)


router.get("/summary/:userId",getSummaryById)

router.post("/",createTransaction)

router.delete("/:id",deleteTransaction)

export default router;