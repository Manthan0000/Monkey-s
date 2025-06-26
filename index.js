const express = require('express');
const mongoose = require("mongoose");
const path = require('path');
const app=express();
const User = require("./models/user.js");
// const session = require("express-session");

app.set('view engine', 'ejs');
app.use(express.static('views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'views')));

// app.use(session({
//     secret: 'yourSecretKey', 
//     resave: false,
//     saveUninitialized: true
// }));

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/monkey");
}
main()
.then( () => {console.log("connection succesful")})
.catch((err) => console.log(err));

const port=3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

//For the registration 
app.get("/register", (req,res) => {
    res.sendFile(path.join(__dirname, "views/HTML", "sign-up.html"));
});
app.post("/register", async (req, res) => {
    let { email, password, confirm_password, dob } = req.body;

    try {
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            console.log("User already exists.");
            res.redirect("/login");
        }else{
             const newuser = new User({
            email: email,
            password: password,
            confirm_password: confirm_password,
            dob: dob
        });

        await newuser.save();
        console.log("User registered successfully.");
        res.redirect("/"); 
        }

    } catch (err) {
        console.error("Registration error:", err);
        res.status(500).send("Internal Server Error");
    }
});

//For the Login Procces
app.get("/login", (req,res) => {
    res.sendFile(path.join(__dirname, "views/HTML", "login.html"));
});
app.post("/login", async (req,res) => {
    const {email,password} = req.body;
    const user = await User.findOne({email, password});
    if (user) {
        req.session.user = user._id; 
        res.redirect("/");
    } else {
        res.send("Invalid login");
    }
});

//For the Home Page
app.post("/", async(req, res) => {
    if(!req.session.user){
        return res.redirect("/login");
    }
    res.sendFile(path.join(__dirname, "views/HTML", "index.html"));

    const {jsonrpc , method , params ,id} = req.body;

    if(method === "buy"){
        
    }
});