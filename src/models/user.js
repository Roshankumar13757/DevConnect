const mongoose=require("mongoose");
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
        unique: true,
        trim:true,
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
    },
    about:{
        type: String,
        default:"Hey I am a new user",
    },
    skills:{
        type:[String],
    },


},{timestamp:true});
const User =mongoose.model("User",userSchema);
module.exports=User;