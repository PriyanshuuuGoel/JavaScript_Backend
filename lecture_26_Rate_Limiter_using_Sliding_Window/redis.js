
const redis = require('redis');

const redisClient = redis.createClient({
  url: process.env.REDIS_CONNECT_KEY 
});

// async function connectRedis(){
  
//      try{
//           await redisClient.connect();
//           console.log("Connected to Redis");
//      }
//      catch(error){
//           console.log(error);
//      }
// }


// connectRedis();


//*  Don't Perform above function here

module.exports = {
    redisClient
}