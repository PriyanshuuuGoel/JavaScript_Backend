const express = require("express");
const app = express();


//! app.use( Route , RH, [RH ,RH , RH , RH ], RH)
           // RH - Route Handlers 


//! Middleware :-  mw -> mw -> mw -> Request Handler
   // Middleware perform some operations and they themselves dont responed and they move to next            

app.use("/user",(req,res,next)=>{
    console.log("First");
    next();
    console.log("Sixth");
})

app.use("/user",(req,res,next)=>{
    console.log("Second");
    next();
    console.log("Fifth");
})

app.use("/user",(req,res)=>{
    console.log("Third");
    res.send("I am Done");
    console.log("Fourth");
})

app.listen(6000,()=>{
    console.log("Server at 6000 port");
})