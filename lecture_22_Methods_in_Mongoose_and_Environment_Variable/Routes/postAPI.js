

const express = require('express');
const postAPIRouter = express.Router();

const bcrypt = require("bcrypt");
// const {validateuserrr} = require("../utils/validateUser");
const { Userr} = require("../Models_or_Collection/users"); // Here Userr is our Collection
const  {userrValidation} = require("../Middleware/userValidation");
const {validateuserrr} = require("../utils/validateUser");


//! 1. POST Data

     postAPIRouter.post("/register",async (req,res)=>{
      
      try{

    //! Doing API Level Validation
     
        validateuserrr(req.body);
   
    //! After Validation wanted to encrypt data into Hash form using bcrypt library
    
          req.body.password = await bcrypt.hash(req.body.password , 10);
        

         await Userr.create(req.body);
         res.send("Data posted Successfully");
      }
      catch(error){
        res.send("Error " + error.message);
      }

     })


//! 5. Doing Login , by checking the credentials 

postAPIRouter.post("/login", async (req,res)=>{

      try{

          console.log("Received body:", req.body);  
        
           //* 1. Firstly find the credentials from the database 
              const people = await Userr.findOne({ emailId : req.body.emailId });
            

                if (!people) {
                         throw new Error("User not found");
                    }

    //   //* 2. Now Validate 
    //           if ( req.body.emailId !== people.emailId){
    //              throw new Error("Invalid Credentials");
    //           }        

             const isPasswordMatch = people.verifyPassword(req.body.password); // verifyPassword is in bcrypt 

    if (!isPasswordMatch) {
      throw new Error("Invalid Credentials (password)");
    }

  //* Will see how JWT Token is generated 
  
              const tokenGenerated = people.getJWT();
              
              res.cookie("Token",  tokenGenerated)
              res.send("Login Successfully")
      }
      catch(error){
         res.send("Error " + error.message);
      }
})     


module.exports = {
     postAPIRouter
}