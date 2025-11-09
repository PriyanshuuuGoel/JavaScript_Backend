

require('dotenv').config();
const express = require('express');
const app = express();


const  { main } =   require("./main_Database");
const { Userr} = require("./Models_or_Collection/users"); // Here Userr is our Collection
const {validateuserrr} = require("./utils/validateUser");
const cookieParser = require("cookie-parser");
const jwt = require('jsonwebtoken');

const  {userrValidation} = require("./Middleware/userValidation");

const bcrypt = require("bcrypt");

const  { postAPIRouter } =  require("./Routes/postAPI");
const { infoAPIRouter } = require("./Routes/infoAPI");


const { redisClient } = require("./redis");


const {  rateLimitter } = require("./Middleware/rateLimiter");


app.use(express.json()); //* Focus on this line as well , it will parse JSON to JS Object
app.use(cookieParser());; //* This line will parse the cookie which will come from the frontend , if not parsed then it will show undefined



//! Use Rate limiter as Middlearwe , it will check the limit before performing any action

app.use(rateLimitter);

    //TODO   Routes
        app.use("/post", postAPIRouter);

        app.use("/info", infoAPIRouter);



//! Here before Listening at port we want our both databasse MongoDB and Redis to be Connected First

const startConnection = async ()=>{
     try{


     
          // await main();
          // console.log("Connected to MongoDB")

          // await redisClient.connect();
          // console.log("Connected to Redis")

        await Promise.all([redisClient.connect() , main()])
        console.log("MongoDB and Redis both Connected Sucesssfully")


         app.listen(process.env.PORT,()=>{
        console.log("Listening at port 6000")
     })

    }
     catch(error){
        console.log("Error: " + error );
     }
}

startConnection();










// main()
//    .then(  async ()=>{
//     console.log("Connected to DB")
//       app.listen(process.env.PORT,()=>{
//           console.log("Listening at port 6000")
//         })



//     //TODO   Routes
//         app.use("/post", postAPIRouter);

//         app.use("/info", infoAPIRouter);



//    })

//    .catch((error)=> console.log(error));




// //!  By Intoducing the Express Router we wrote the clean code and make it more readiable 

