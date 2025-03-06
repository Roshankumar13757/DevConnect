const express= require("express");

const app= express();

const port=7777;

//thsi will only handle GET call to /user
app.get("/user/:userId/:name/:password", (req, res)=>{
    console.log(req.params);
    res.send({firstName: "Roshan", lastName:"Kumar"})
})
app.get("/user" , (req, res)=>{
    console.log(req.query);
    res.send({firstName: "Sejal", lastName:"Gadekar"})
});
app.post("/user", (req, res)=>{
    res.send("Data sent successfully :) ")
})
app.use("/hello", (req, res)=>{
    res.send("Hello Hello Hello");
});



app.use("/test", (req, res)=>{
    res.send("Hello from the server!");
});
app.use("/crash", (req, res)=>{
    res.send("server crashed due to unknown error!!!");
});
    //this will match alll the HTTP menthod API calls to /test
app.use("/", (req, res)=>{
    res.send("Welcome to dashboard");
});
app.listen(port, ()=> {
    console.log("server is listning successfully on port 3000");
});
