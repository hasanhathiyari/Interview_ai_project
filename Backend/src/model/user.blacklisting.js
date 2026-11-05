const mongoose = require("mongoose");

const BlackListTokenSchema = new mongoose.Schema({
    token:{
        type:String,
        required:[true,"this is required"]
    }
},{
    timestamps:true
})

const tokenBlackListModel = mongoose.model("BlackListToken",BlackListTokenSchema)

module.exports= tokenBlackListModel;