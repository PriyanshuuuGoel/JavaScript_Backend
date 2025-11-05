

const mongoose = require('mongoose');
const {Schema} = mongoose;

const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");

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




//! getJWT Method
userSchema.methods.getJWT = function(){
      return jwt.sign({_id:this._id , emailId : this.emailId} , process.env.SECRET_KEY , {expiresIn: 200});
}


//! verifyPassword Method 

userSchema.methods.verifyPassword = async function(userPassword){
        const ans = await bcrypt.compare(userPassword, this.password);
        return ans;
}


const Userr = mongoose.model("user",userSchema); // Here Userr is Collection/Class and in MongoDB Compass Collection is user

module.exports = { Userr };