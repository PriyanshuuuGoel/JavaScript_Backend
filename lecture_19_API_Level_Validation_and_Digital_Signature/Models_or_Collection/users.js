

const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema ({
        firstName:{
            type:String,
            required : true,
            minLength : 2 ,
            maxLength : 20
        },

        lastName:{
            type:String    
        },

        age:{
                type:Number,
                min:14,
                max:80,
                required : true
        },
        
        gender:{
                type:String,
                // enum: ["male","female","others", "Male" , "Female" , "Others"]

                       //* OR

                 validate(value){
                        if ( ! ["male","female","others", "Male" , "Female" , "Others"].includes(value) ){
                             throw new Error("Invalid Gender Value");
                        }
                 }      
        },

        emailId:{
                type:String,
                required : true,
                unique : true,
                trim:true,
                lowercase:true,
                immutable : true
        },

        password:{
                type:String
        },

        photo:{
                type:String ,   // Here we will store the Link of image as a String
                default : "This is the Link of the default photo" // Just like we see in instagram( Anonymous Profile) 
        } ,

      

     }  ,    { timestamps: true })



const Userr = mongoose.model("user",userSchema); // Here Userr is Collection/Class and in MongoDB Compass Collection is user

module.exports = { Userr };