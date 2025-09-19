const express = require("express");


//! Creating server here 

const app = express();


app.use("/about/:id/:user",(req,res)=>{
    console.log(req.params);
    res.send({"name":"Priyanshu" , "age":23 , "profile":"SDE"});
    
})

app.use("/contact",(req,res)=>{
    res.send("I am your Contact Page");
    
})


app.use("/", (req,res)=>{
    res.send("I am your Home Page");
})

app.listen(4000,()=>{
    console.log("Listening at port 4000");
})