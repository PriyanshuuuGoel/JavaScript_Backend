

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
const { infoAPIRouter } = require("./Routes/infoAPI")


app.use(express.json()); //* Focus on this line as well , it will parse JSON to JS Object
app.use(cookieParser());; //* This line will parse the cookie which will come from the frontend , if not parsed then it will show undefined

main()
   .then(  async ()=>{
    console.log("Connected to DB")
      app.listen(process.env.PORT,()=>{
          console.log("Listening at port 6000")
        })



    //TODO   Routes
        app.use("/post", postAPIRouter);

        app.use("/info", infoAPIRouter);



   })

   .catch((error)=> console.log(error));




//!  By Intoducing the Express Router we wrote the clean code and make it more readiable 

