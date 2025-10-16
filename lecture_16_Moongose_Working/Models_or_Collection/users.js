

const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema ({
        name : String ,
        age : Number ,
        profile : String,
        city : String
     })



const Userr = mongoose.model("user",userSchema); // Here Userr is Collection 

module.exports = { Userr };