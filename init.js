const mongoose = require("mongoose");
const User =  require("./models/user.js");

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/monkey");
}
main()
    .then(() => {console.log("connection successful")})
    .catch((err) => console.log(err));

let Users = [
    {
        email : "manthanjasoliya84014@gmail.com",
        password : "ManthanJasoliya@@2807",
        confirm_password : "ManthanJasoliya@@2807",
        dob : Date()
    }
];

User.insertMany(Users);