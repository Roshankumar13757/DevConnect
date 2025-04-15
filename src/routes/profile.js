const express =require("express");
const User=require("../models/user.js");
const {userAuth} =require("../middlewares/auth");
const {validateEditProfileData}=require("../utils/validation.js");
const profileRouter=express.Router();

profileRouter.get("/profile",userAuth,async (req, res)=>{
    try{
       
        const user= req.user;
        res.send(user);

    }catch(err){
        res.status(404).send("not found");
    }
    
});
profileRouter.patch("/profile/edit",userAuth,async(req, res)=>{
        try {
            if (!validateEditProfileData(req)) {
                throw new Error("Update not allowed");
            }
    
            const loggedInUser = req.user;
            const data = req.body;
    
            // Handle skills specially
            if (data.skills) {
                const currentSkills = loggedInUser.skills || [];
    
                // Combine, normalize, deduplicate
                const mergedSkills = [
                    ...new Set([
                        ...currentSkills.map(s => s.trim().toLowerCase()),
                        ...data.skills.map(s => s.trim().toLowerCase())
                    ])
                ];
    
                loggedInUser.skills = mergedSkills; // ✅ apply to user
            }
    
            // Update other fields
            Object.keys(data).forEach((key) => {
                if (key !== "skills") {
                    loggedInUser[key] = data[key];
                }
            });
            await loggedInUser.save();
    
            res.json({
                message:`${loggedInUser.firstName} User data updated successfully!`,
                data:loggedInUser,
            });
        } catch (err) {
        res. status(400) . send("Update failed: "+ err.message);
        }
       
    });
module.exports=profileRouter;
