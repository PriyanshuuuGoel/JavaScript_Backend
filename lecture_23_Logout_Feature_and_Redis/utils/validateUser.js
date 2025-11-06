
const validator = require("validator");

 function validateuserrr(data){

       const mandatoryField = ["firstName" , "age" , "emailId","password"];

        const isAllowedToPost = mandatoryField.every((k)=> Object.keys(data).includes(k));

//! Validating required fields        
        if ( ! isAllowedToPost){
            throw new Error("Field Missing");
        }

//! Validating the email        
        if( ! validator.isEmail(data.emailId)){
            throw new Error("Invalid Email");
        }

//! Validating the Passsword 
        if( ! validator.isStrongPassword(data.password)){
             throw new Error("Invalid Passsword");
        }

//! Validating the Length of the firstName
       if( !(data.firstName.length >= 2  && data.firstName.length < 20)){
            throw new Error ("Length of firstName should be atleast 2 and atmost 20 ");
       }
 }     
 
 
 module.exports = {
           validateuserrr
 }
      