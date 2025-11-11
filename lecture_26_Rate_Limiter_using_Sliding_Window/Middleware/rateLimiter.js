


const { redisClient } = require("../redis");

const windowSize = 3600; // 60minutes == 3600 sec
const maxRequest = 60;

const rateLimitter = async (req,res,next)=>{

    try{
        
          const key = `IP: ${req.ip}`;
          const currentTime = Date.now()/1000;
          const windowTime_range_To_remove =  currentTime - windowSize;
          

           //! 1. Remove old requests that are outside the current window
          await redisClient.zRemRangeByScore(key , 0 , windowTime_range_To_remove);


          
          //! 2.  Get count of requests in the current window
          const numberOfRequest = await  redisClient.zCard(key);

          if( numberOfRequest > 60 ){
            throw new Error("User Limit Exceed");
          }


          //! 3.  If valid , means no exceed the maxRequest limit then put it in redis 

          await redisClient.zAdd(key,[{score:currentTime   ,  value:`${currentTime}:${Math.random()}`}])

         //! 4.  Now increase the TTL( Time to Live
         
         await redisClient.exports(key,3600);

    
          next();
    }
    catch(error){
        res.send("Error: " + error);
    }
}



module.exports = { rateLimitter}