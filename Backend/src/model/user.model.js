const mongoose = require("mongoose");
const { type } = require("node:os");

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:[true,"name is already taken "]
    },
    email:{
        type:String,
        required:true,
        unique:[true,"email is already registered"]
    },
    password:{
        type:String,
        required:true
    }
});

const usermodel = mongoose.model("user",UserSchema);

module.exports = usermodel;