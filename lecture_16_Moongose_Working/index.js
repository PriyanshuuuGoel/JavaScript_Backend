// TODO ( Perform CRUD Operation using API in Moongose )

const express = require('express');
const app = express();


const  { main } =   require("./main_Database");
const { Userr} = require("./Models_or_Collection/users"); // Here Userr is our Collection


app.use(express.json()); //* Focus on this line as well , it will parse JSON to JS Object

main()
   .then(  async ()=>{
    console.log("Connected to DB")
      app.listen(3000,()=>{
          console.log("Listening at port 3000")
        })

//! GET data 
     app.get("/info",async (req,res)=>{
            const ans = await Userr.find({});
            res.send(ans);
     })


//! POST data

      app.post("/info" , async (req,res)=>{
           // data will come req.body

           //* Method 1 -  Create a Instance/Object
          //  const ans = new Userr(req.body);
          //  ans.save();

                   //* OR


           //* Method 2 - use the direct option
           //* Use try and catch to handle errors 
           
           try{
            await Userr.create(req.body); // Here Instance will cretae itself as well as it will save it automatically
           }
           catch(error){
            res.status(500).send(error);
           }


           res.send("Data Saved Successfully");

      })


//! DELETE data 

app.delete("/info",async (req,res)=>{
   
      try{
           await Userr.deleteOne({name:"Paras"});
            res.send("Deleted Successfully");
      }
      catch(error){
           res.status(500).send(error);
      }
})


//! PATCH/PUT data

app.patch("/info",async(req,res)=>{
    await Userr.updateMany({name : "Guddu"} , { age : 25 , profile : "Senior HR"})
    res.send("Data updated successfully");
})


   })

   .catch((error)=> console.log(error));

