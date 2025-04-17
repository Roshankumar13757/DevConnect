const express= require("express");
const connectDB=require("./config/database.js");
const app= express();
const cookieParser=require("cookie-parser");

const port=7777;

app.use(express.json());
app.use(cookieParser());

const authRouter=require("./routes/auth.js");
const profileRouter=require("./routes/profile.js");
const requestRouter=require("./routes/request.js");

app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);

// app.get("/user",async (req, res)=>{
//     const userEmail=req.body.emailId;
//     try{
//         const user=await User.find({emailId:userEmail});
//         if(user.length===0){
//             res.status(404).send("No user is Registred with this Mail");

//         }
//         else{
//             res.send(user);
//         }
        
//     }
//     catch{
//         res.status(400).send("something went Wrong!!!")
//     }
// });
// app.get("/feed",async(req, res)=>{
//     try{
//         const users=await User.find({});
//         res.send(users);
//     }
//     catch{
//         res.status(400).send("something went Wrong!!!");
//     }
     
// });
// app.delete("/user",async(req,res)=>{
//     const userId= req.body.userId;
//     try{
//         const user=await User.findByIdAndDelete({_id:userId});
//         res.send("user deleted successfully");


//     }
//     catch(err){
//         res.status(400).send("something went Wrong!!!");
//     }
// });
// app.patch("/user/:userId",async(req, res)=>{
//     const userId=req.params?.userId;
//     const data=req.body;
//     try{
//         const ALLOWED_UPDATE=["skills","about","photoUrl","gender","age","password","lastName","middleName","firstName"];
        
//         const isUpdateAllowed=Object.keys(data).every((k)=>ALLOWED_UPDATE.includes(k));
//         if(!isUpdateAllowed){
//             throw new Error("update not allowed")
//         }
//         const user = await User.findById(userId);
//         if (!user) {
//             return res.status(404).send("User not found");
//         }
//         if (data.skills) {
//             const currentSkills = user.skills || [];

//             // Combine, normalize, deduplicate
//             const mergedSkills = [...new Set([...currentSkills, ...data.skills.map(s => s.trim().toLowerCase())])];

//             data.skills = mergedSkills;
//         }

//         const updatedUser= await User. findByIdAndUpdate({ _id: userId},
//             data,
//             {
//             returnDocument:"after",
//             runValidators:true,
//             }
//         );
        
//         res.send("user data updated successfully!!!");
//     }catch (err) {
//     res. status(400) . send("Update failed:"+ err.message);
//     }
   
// });


connectDB().then(()=>{
    console.log("DB is Online");
    app.listen(port, ()=> {
        console.log("server is Online");
    });
}).catch(err=>{
    console.error("Can't connect to Database!!! ");
});



