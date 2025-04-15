const express =require("express");
const User=require("../models/user.js");
const {userAuth} =require("../middlewares/auth");
const {validateEditProfileData}=require("../utils/validation.js");
const profileRouter=express.Router();
const bcrypt=require("bcrypt");

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
profileRouter.patch("/profile/password", userAuth, async (req, res) => {
        const { currentPassword, newPassword, confirmNewPassword } = req.body;
    
        try {
            // Validate input
            if (!currentPassword || !newPassword || !confirmNewPassword) {
                return res.status(400).send("All fields must be filled");
            }
    
            // Check if new password and confirmation match
            if (newPassword !== confirmNewPassword) {
                return res.status(400).send("New passwords entred  do not match.");
            }
    
            const user = req.user;
    
            // Check if current password is correct
            const isMatch = await bcrypt.compare(currentPassword, user.password);
            if (!isMatch) {
                return res.status(401).send("Incorrect current password.");
            }
    
            // Hash the new password
            const hashedPassword = await bcrypt.hash(newPassword, 10);
    
            // Update and save
            user.password = hashedPassword;
            await user.save();
    
            res.send("Password updated successfully!");
        } catch (err) {
            res.status(500).send("Failed to update password: " + err.message);
        }
    });
    
module.exports=profileRouter;
