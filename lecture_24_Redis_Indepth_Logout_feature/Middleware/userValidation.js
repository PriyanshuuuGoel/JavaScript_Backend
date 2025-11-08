// TODO  ( Middleware to do Verification )

const jwt = require('jsonwebtoken');
const { redisClient } = require('../redis');

const userrValidation = async (req,res,next)=>{
    
          const { Token } = req.cookies;  // Here token X   Token ( correct ) because in cookiess it saved like that , because i wrote that like in Login Backend 

         if ( ! Token){
            throw new Error("Invalid Token");
         }
         const payload = jwt.verify(Token , process.env.SECRET_KEY);

         const {_id} = payload;

         if( ! _id){
            throw new Error("Id not found");
         }

         const isBlocked = await redisClient.exists(`token:${Token}`);
         if(isBlocked){
            throw new error("Invalid Token");
            
         }


         next();
}

module.exports = {
      userrValidation
}