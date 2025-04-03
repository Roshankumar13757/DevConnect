const mongoose =require("mongoose");

const connectDB= async()=>{
    await mongoose.connect(
        "mongodb+srv://rk5970869:6rXaQTLAjLDhV8YO@devconnect.4amuq.mongodb.net/DevConnect"
    );
};
module.exports=connectDB;

