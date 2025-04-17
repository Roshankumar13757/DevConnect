const express=require('express');
const User=require("../models/user.js");
const { userAuth } = require('../middlewares/auth');
const ConnectionRequest = require('../models/connectionRequest.js');
const requestRouter=express.Router();
requestRouter.post("/request/send/:status/:toUserId",userAuth,async(req,res)=>{
    try{
        const fromUserId=req.user._id;
        const toUserId=req.params.toUserId;
        const status=req.params.status;
        const allowedStatus=["intrested","ignored"];
        if(!allowedStatus.includes(status)){
            return res.status(400).json({
                message:"invalid status type: "+status

            });
        }
        const toUser=await User.findById(toUserId);
        if(!toUser){
            return res.status(400).json({
                message:"user not found",
            });
        }

        // if there is an existing connnecitonRequest
           const exitstingConnectionRequest =await ConnectionRequest.findOne({
            $or:[
                {fromUserId,toUserId},
                {fromUserId:toUserId,toUserId:fromUserId},
                
            ],
            
           });
           if(exitstingConnectionRequest){
            return res.status(400).send("connection request already exitsts")
           }

        const connectionRequest =new ConnectionRequest({
            fromUserId,
            toUserId,
            status,
        });

         const data=await connectionRequest.save();
         
         res.json({
            message:"connection request sent successfully",
            data,
         });

    }
    catch(err){
        res.status(400).send("something went wrong please try again!!! "+err.message);
    }

});
module.exports=requestRouter;