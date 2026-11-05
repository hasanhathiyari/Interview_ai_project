// it is a middleware to check  whether the exidting user is logged in or not 

const jwt = require("jsonwebtoken");
const blacklistMOdel = require("../model/user.blacklisting");

 async function authUser(req,res,next){
    const token = req.cookies.token

    if(!token){
        return res.status(401).json({
            message:"token not provided "
        })
    }

    // it checks whether the token is blacklisted or not 
    const isTokenBlackListed = await blacklistMOdel.findOne({
        token
    })

    if(isTokenBlackListed){
        return res.status(401).json({
            message:"invalid token "
        })
    }

    try{
    const decoded = jwt.verify(token,process.env.JWT_SECRET)

    req.user = decoded;

    next()

    }catch(err){
        return res.status(401).json({
            message:"Invalid token "
        })
    }

    
}

module.exports = {
    authUser
}