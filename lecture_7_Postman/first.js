const express = require("express");

const app = express();

//! Do Parsing first to receive data
app.use(express.json());


app.get("/user", (req,res)=>{
    res.send({"name":"Priyanshu" , "age":23 , "profile":"Software Engineer"});
})


app.post("/data", (req,res)=>{
    console.log(req.body);
    console.log( typeof req.body.age)
    res.send("Data saved sucessfully")
})

app.listen(4000,()=>{
    console.log("Yes listening at port 4000");
})