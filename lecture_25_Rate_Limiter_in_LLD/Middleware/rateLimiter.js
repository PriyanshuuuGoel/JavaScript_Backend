


const { redisClient } = require("../redis");


const rateLimitter = async (req,res,next)=>{

    try{
        
          const ip = req.ip;
          console.log(ip);

          // Setting up the IP in Redis DB
          const count = await redisClient.incr(ip);  //! Count = No of Request 


          console.log(count);
          // Setting up the ip expire time when count is 1 
          if ( count == 1){
             await redisClient.expire(3600);
          }


          if( count > 10){
              throw new Error("User Limit Exceed");
          }

          next();

    }
    catch(error){
        res.send("Error: " + error);
    }
}



module.exports = { rateLimitter}