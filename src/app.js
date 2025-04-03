const express= require("express");
const connectDB=require("./config/database.js");
const app= express();
const port=7777;
const User=require("./models/user.js");
app.use(express.json());

app.get("/user",async (req, res)=>{
    const userEmail=req.body.emailId;
    try{
        const user=await User.find({emailId:userEmail});
        if(user.length===0){
            res.status(404).send("No user is Registred with this Mail");

        }
        else{
            res.send(user);
        }
        
    }
    catch{
        res.status(400).send("something went Wrong!!!")
    }
});
app.get("/feed",async(req, res)=>{
    try{
        const users=await User.find({});
        res.send(users);
    }
    catch{
        res.status(400).send("something went Wrong!!!");
    }
     
});
app.delete("/user",async(req,res)=>{
    const userId= req.body.userId;
    try{
        const user=await User.findByIdAndDelete({_id:userId});
        res.send("user deleted successfully");


    }
    catch(err){
        res.status(400).send("something went Wrong!!!");
    }
});
app.patch("/user",async(req, res)=>{
    const userId=req.body.userId;
    const data=req.body;
    try{
        await User. findByIdAndUpdate({ _id: userId},data,{
            returnDocument:"after",
            runValidators:true,
        });
        
        res.send("user data updated successfully!!!");
    }catch (err) {
    res. status(400) . send("Update failed:"+ err.message);
    }
   
});
app.post("/signup",async (req, res)=>{
    //creating a new instance of the User model
    const user=new User(req.body);
    try{
        await user.save();
        res.send("user added successfully");
    }
    catch(err){
        res.status(400).send("Error saving the user: "+err.message);
    }
    

});

connectDB().then(()=>{
    console.log("Connection Successful");
    app.listen(port, ()=> {
        console.log("server is listning successfully on port 7777");
    });
}).catch(err=>{
    console.error("Can't connect to Database!!! ");
});



