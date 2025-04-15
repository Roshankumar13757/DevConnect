const mongoose=require("mongoose");
const validator = require('validator');
const bcrypt =require("bcrypt");
const jwt = require("jsonwebtoken");


const userSchema=mongoose.Schema({
    firstName:{
        type: String,
        required: true,
    } ,
    middleName: {
        type: String,
    } ,
    lastName: {
        type: String,

    } ,
    emailId: {
        type: String,
        required: true,
        unique: true,//@gmail,@yahoo.sfskljk@sfklasjdk.com
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email Address!!!");
            }
        },
         
    } ,
    password:{
        type: String,
        required: true,
        minLength:5,
    } ,
    age:{
        type: Number,
       
    } ,
    gender:{
        type: String,
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("Please Enter a valid Gender!!!");
            }
        }
        
    } ,
    photoUrl:{
        type: String,
        default:"https://www.kindpng.com/picc/m/252-2524695_dummy-profile-image-jpg-hd-png-download.png",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Invalid photo URL"+ value);
            }
        },
    },
    about:{
        type: String,
        default:"Hey I am a new user",
    },
    skills:{
        type:[String],
    },


},{timestamp:true});


userSchema.methods.getJWT=async function(){
    const user= this;
    const token=await jwt.sign({_id:user._id},"admin@123",{expiresIn:'7d'});
    return token;
};


userSchema.methods.validatePassword = async function(passwordInputByUser){
    const user= this;
    const passwordHash=user.password;
    const isPasswordValid =await bcrypt.compare(passwordInputByUser,passwordHash);
    return isPasswordValid;

};
const User =mongoose.model("User",userSchema);
module.exports=User;