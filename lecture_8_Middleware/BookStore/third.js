const express = require("express");
const app = express();


app.use("/user",(req,res,next)=>{
    console.log(`${Date.now()}  ${req.method} ${req.url}`);
    //! Can also do Authentication and Authorization
    next();
})



app.get("/user",(req,res)=>{
    res.send("Data Given")
})

app.post("/user",(req,res)=>{
    res.send("Data Saves Successfully");
})

app.delete("/user",(req,res)=>{
    res.send("Data Deleted Sucessfully");
})


app.listen(6000,()=>{
    console.log("My Server at 6000");
})