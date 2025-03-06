const express= require("express");

const app= express();

const port=7777;


app.use("/hello", (req, res)=>{
    res.send("Hello Hello Hello");
});



app.use("/crash", (req, res)=>{
    res.send("Hello from the server!");
});

app.use("/", (req, res)=>{
    res.send("Welcome to dashboard");
});
app.listen(port, ()=> {
    console.log("server is listning successfully on port 3000");
});
