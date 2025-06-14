import ratelimit from "../config/upstash.js";

const ratelimiter=async(req,res,next)=>{
    try{
      const userId=req.params?.userId;
      if(!userId){
        return res.status(400).json({message:"UserId is required!"})
      }
     const {success}=await ratelimit.limit(userId.toString());
     if(!success){
       return res.status(429).json({
        message:"Too many requests"
       })
     }
     next();
    }catch(error){
        console.log("Rate limit error",error);
        next(error);
    }
}

export default ratelimiter;