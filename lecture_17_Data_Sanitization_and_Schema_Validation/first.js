
const express = require('express');
const app = express();


const  { main } =   require("./main_Database");
const { Userr} = require("./Models_or_Collection/users"); // Here Userr is our Collection


app.use(express.json()); //* Focus on this line as well , it will parse JSON to JS Object

main()
   .then(  async ()=>{
    console.log("Connected to DB")
      app.listen(6000,()=>{
          console.log("Listening at port 6000")
        })

//! 1. POST Data

     app.post("/register",async (req,res)=>{
      
      try{
         await Userr.create(req.body);
         res.send("Data posted Successfully");
      }
      catch(error){
        res.send("Error " + error.message);
      }

     })
   

//! 2(a). GET data

    app.get("/info",async (req,res)=>{


       try{
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

    app.delete("/info/:id",  async (req,res)=>{


         try{
             await Userr.findByIdAndDelete(req.params.id);
             res.send("Data Delete Succcessfully");
         }

         catch(error){
             res.send("Error: " + error.message);
         }
    })

//! 4. PATCH/PUT data by ID

app.patch("/info" , async (req,res)=>{
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

   })

   .catch((error)=> console.log(error));

