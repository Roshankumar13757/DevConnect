const express=require("express");
const authRouter=express.Router();
const User=require("../models/user.js");
const bcrypt=require("bcrypt");
const {validateSignUpData} = require("../utils/validation.js");



authRouter.post("/signup",async (req, res)=>{
   
    //creating a new instance of the User model
    try{
         //validatation of data
        validateSignUpData(req);
        //Encrypt the password
        const {firstName,lastName,emailId,password,gender,age}=req.body;
        const passwordHash= await bcrypt.hash(password,10);
        //creating anew instance of the user model
        const user=new User({
            firstName,
            lastName,
            emailId,
            password:passwordHash,
            gender,
            age,
            

        });
        await user.save();
        res.status(201).send("user added successfully");
    }
    catch(err){
        res.status(400).send("Error saving the user: "+err.message);
    }
    

});
authRouter.post("/login",async (req, res)=>{
    try{
        const {emailId,password}=req.body;
        const user=await User.findOne({emailId:emailId});
        if(!user){
            res.status(404).send("Invalid credentials");
        }
        const isPasswordValid =await user.validatePassword(password);
        if(isPasswordValid){
            //create a JWT Token
            const token=await user.getJWT();
            //console.log(token);

            //Add token to cokie and sned the response bck to the user
            res.cookie("token",token,{expires:new Date(Date.now()+8*3600000),});

            res.send("Login Successfully");
        }
        else{
            return res.status(401).send("Invalid credentials");
        }
       
        
    }
    catch(err){
        res.status(500).send("Something Went Wrong.Please try again "+err.message);
    }
});
authRouter.post("/logout",async (req,res)=>{
    res
    .cookie("token",null,{
        expires:new Date(Date.now()),
    })
    .send("successfully logged out");

});


module.exports=authRouter;
