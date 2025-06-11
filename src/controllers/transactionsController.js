import {sql} from "../config/db.js";

export async function getTransactionByUserId(req,res){
    try{
      const {userId}=req.params;
      const transactions=await sql`
      SELECT * FROM transactions WHERE user_id = ${userId} ORDER BY created_at DESC
      `
      res.status(200),json(transactions);
      }catch(error){
        console.log("Error getting transaction",error);
        res.status(500).json({message:"Internal server error."});
      }
}

export async function createTransaction(req,res){
    try{
        const {title,amount,category,user_id}=req.body;
        if(!title || !amount || !category || !user_id){
            return res.status(400).json({message:"All fields are required!"})
        }
        const transaction=await sql `
        INSERT INTO transactions(user_id,title,amount,category)
        VALUES (${user_id},${title},${amount},${category})
        RETURNING *`
        res.status(201).json(transaction[0])
     }catch(error){
        console.log("Error making transaction",error);
        res.status(500).json({message:"Internal server error."})
     }
}

export async function deleteTransaction(req,res){
    try{  
     const {id}=req.params;
     if (isNaN(parseInt(id))){
        return res.status(400).json({message:"Invalid transaction Id."})
     }
     const result = await sql `
     DELETE FROM transcations WHERE id = ${id} RETURNING *
     `
     if(result.length === 0){
        return res.status(404).json({message:"Transaction not found"})
     }
     return res.status(200).json({message:"Transaction deleted successfully!"})
    }catch(error){
        console.log("Error deleting transaction",error);
    res.status(500).json({message:"Internal server error."})
 }
}

export async function getSummaryById(req,res){
     try{
    const {userID}=rea.params;
    const balanceRes=await sql`
    SELECT COALESCE(SUM(amount),0) as balance FROM transactions WHERE user_id = ${userID}
    `
    const incomeRes=await sql`
    SELECT COALESCE(SUM(amount),0) as income FROM transactions WHERE user_id = ${userID}
    `
    const expensesRes=await sql`
     SELECT COALESCE(SUM(amount),0) as expenses FROM transactions WHERE user_id = ${userID}
    `
    res.status(200).json({
        balance:balanceRes[0].balance,
        income:incomeRes[0].income,
        expenses:expensesRes[0].expenses,
    })

    }catch(error){
        console.log("Error getting summary",error);
        res.status(500).json({message:"Internal server error."});
    }
    
}