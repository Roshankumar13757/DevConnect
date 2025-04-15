const express=require('express');
const User=require("../models/user.js");
const { userAuth } = require('../middlewares/auth');
const requestRouter=express.Router();
requestRouter.post("/sendConnectionRequest",userAuth,(req,res)=>{
    const user=req.user;
    res.send(user.firstName +" sent you a connection request");

});
module.exports=requestRouter;