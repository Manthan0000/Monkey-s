const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    email:{
        type : String,
        required : true
    },
    password:{
        type : String,
        required : true
    },
    confirm_password:{
        type : String,
        required : true
    },
    dob : {
        type : Date,
        required : true
    }
});

const User = mongoose.model("User", userSchema);

module.exports = User;