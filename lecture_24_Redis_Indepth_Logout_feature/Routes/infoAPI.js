

const express = require('express');
const infoAPIRouter = express.Router();

const { Userr} = require("../Models_or_Collection/users"); // Here Userr is our Collection
const  {userrValidation} = require("../Middleware/userValidation");

//! 2(a). GET data

    infoAPIRouter.get("/",userrValidation , async (req,res)=>{


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

    infoAPIRouter.get("/:id",  async (req,res)=>{

        try{
            const result = await Userr.findById(req.params.id);
            res.send(result);
        }
        catch(error){
            res.send("Error " + error.message);
        }
    })


    //! 3. DELETE data by ID
    
        infoAPIRouter.delete("/:id", userrValidation ,  async (req,res)=>{
    
    
             try{
                 await Userr.findByIdAndDelete(req.params.id);
                 res.send("Data Delete Succcessfully");
             }
    
             catch(error){
                 res.send("Error: " + error.message);
             }
        })
    
    //! 4. PATCH/PUT data by ID
    
    infoAPIRouter.patch("/" , userrValidation , async (req,res)=>{
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


    module.exports = { infoAPIRouter}