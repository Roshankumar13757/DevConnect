const express=require("express");
const { userAuth } = require("../middlewares/auth");
const userRouter=express.Router();
const ConnectionRequest=require("../models/connectionRequest");
const User = require("../models/user");

const USER_SAFE_DATA="firstName lastName skills photoUrl about age";
//get all the pending request for the loggedin userss
userRouter.get("/user/requests/received",userAuth,async(req, res)=>{
    try{
        const loggedInUser=req.user;
        const connectionRequests =await ConnectionRequest.find({
            toUserId: loggedInUser._id,
            status:"intrested",

        }).populate("fromUserId",USER_SAFE_DATA);
        //populate("fromUserId",["firstName","lastName"])
        res.json({
            data:connectionRequests,
        })
    }
    catch(err){
        res.status(400).json({
            message:"Error: "+err.message,
        })
    }
});

userRouter.get("/user/connections",userAuth,async (req, res)=>{
    try{
        const loggedInUser=req.user;
        const connectionRequests=await ConnectionRequest.find({
            $or:[
                {toUserId:loggedInUser._id,status:"accepted"},
                {fromUserId:loggedInUser._id,status:"accepted"}

            ],
        }).populate("fromUserId",USER_SAFE_DATA)
        .populate("toUserId",USER_SAFE_DATA);
        const data=connectionRequests.map((row)=>{
            if(row.fromUserId._id.toString() === loggedInUser._id.toString()){
                return row.toUserId;
            }
            return row.fromUserId;
        });
        res.json({
            data
        });

    }
    catch(err){
        res.status(400).json({
            message:"Error: "+err.message,

        })
        
    }
});
 
userRouter.get("/feed",userAuth,async(req, res)=>{
    try{
        //1. user should not see his own card
        //2. user should not see the cards of people who are already his friends.
        //3. user should not see the card of peopel whom he has ignored.
        //4. user should not see the card whom he has sent request to.

        const loggedInUser=req.user;

        const page=parseInt(req.query.page)||1;
        let limit=parseInt(req.query.limit)||10;
        limit=limit>50?50:limit;
        const skip=(page-1)*limit;
        //find all hte connection requests(sent+ recieved)
        const connectionRequests =await ConnectionRequest.find({
            $or:[{fromUserId:loggedInUser._id},{toUserId:loggedInUser._id}],     
        }).select("fromUserId toUserId");

        const hideUserFromFeed=new Set();
        connectionRequests.forEach(req=>{
            hideUserFromFeed.add(req.fromUserId.toString());
            hideUserFromFeed.add(req.toUserId.toString());
        });
        const users=await User.find({
            $and:[
                {_id:{$nin:Array.from(hideUserFromFeed)}},
                {_id:{$ne: loggedInUser._id}},
            ],
        }).select(USER_SAFE_DATA).skip(skip).limit(limit);
        res.json(users);
        
    }
    catch(err){
        res.status(400).json({
            message:"something went wrong!!!",
        })
    }

});



module.exports=userRouter;