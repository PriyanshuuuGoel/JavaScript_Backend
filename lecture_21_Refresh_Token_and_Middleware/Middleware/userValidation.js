// TODO  ( Middleware to do Verification )

const jwt = require('jsonwebtoken');

const userrValidation = (req,res,next)=>{
    
          const { Token } = req.cookies;  // Here token X   Token ( correct ) because in cookiess it saved like that , because i wrote that like in Login Backend 

         if ( ! Token){
            throw new Error("Invalid Token");
         }
         const payload = jwt.verify(Token , "rohit@123");

         const {_id} = payload;

         if( ! _id){
            throw new Error("Id not found");
         }


         next();
}

module.exports = {
      userrValidation
}