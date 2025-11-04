
const express = require('express');
const app = express();


const  { main } =   require("./main_Database");
const { Userr} = require("./Models_or_Collection/users"); // Here Userr is our Collection
const {validateuserrr} = require("./utils/validateUser");
const cookieParser = require("cookie-parser");
const jwt = require('jsonwebtoken');

const  {userrValidation} = require("./Middleware/userValidation");

const bcrypt = require("bcrypt");


app.use(express.json()); //* Focus on this line as well , it will parse JSON to JS Object
app.use(cookieParser());; //* This line will parse the cookie which will come from the frontend , if not parsed then it will show undefined

main()
   .then(  async ()=>{
    console.log("Connected to DB")
      app.listen(6000,()=>{
          console.log("Listening at port 6000")
        })

//! 1. POST Data

     app.post("/register", userrValidation ,async (req,res)=>{
      
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
   

//! 2(a). GET data

    app.get("/info",userrValidation , async (req,res)=>{


       try{

                    
//* Before sending the data , we have to verify the Token 




          const result = await Userr.find({});
          res.send(result);
       }
       catch(error){
           res.send("Error : " + error.message);
       }
    })


//! 2(b). GET particular data using ID

    app.get("/info/:id",  async (req,res)=>{

        try{
            const result = await Userr.findById(req.params.id);
            res.send(result);
        }
        catch(error){
            res.send("Error " + error.message);
        }
    })



//! 3. DELETE data by ID

    app.delete("/info/:id", userrValidation ,  async (req,res)=>{


         try{
             await Userr.findByIdAndDelete(req.params.id);
             res.send("Data Delete Succcessfully");
         }

         catch(error){
             res.send("Error: " + error.message);
         }
    })

//! 4. PATCH/PUT data by ID

app.patch("/info" , userrValidation , async (req,res)=>{
                         // Things work like that (A.findByIdAndUpdate(id, update, options) )  // returns Query
   try{
       // Destructure id separately and ( age and emailId separately)
       const {_id, ...update} = req.body;
       await Userr.findByIdAndUpdate( _id , update , {"runValidators":true});
       res.send("Data updated successfully")
   }

   catch(error){
      res.send("Error: " + error.message);
   }

})


//! 5. Doing Login , by checking the credentials 

app.post("/login", async (req,res)=>{

      try{

          console.log("Received body:", req.body);  
        
           //* 1. Firstly find the credentials from the database 
              const people = await Userr.findOne({ emailId : req.body.emailId });
            

                if (!people) {
                         throw new Error("User not found");
                    }

      //* 2. Now Validate 
              if ( req.body.emailId !== people.emailId){
                 throw new Error("Invalid Credentials");
              }        

             const isPasswordMatch = await bcrypt.compare(req.body.password, people.password);

    if (!isPasswordMatch) {
      throw new Error("Invalid Credentials (password)");
    }

  //* Will see how JWT Token is generated 
  
              const tokenGenerated = jwt.sign({_id:people._id , emailId : people.emailId} , "rohit@123" , {expiresIn: 20});
              
              res.cookie("Token",  tokenGenerated)
              res.send("Login Successfully")
      }
      catch(error){
         res.send("Error " + error.message);
      }
})

   })

   .catch((error)=> console.log(error));

