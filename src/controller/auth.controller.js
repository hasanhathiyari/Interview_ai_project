const usermodel = require("../model/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/** 
 * @name registeruserController
 * @description regitering a new user 
 * @access Public
 */

async function registeruserController(req,res){
    const {username , email , password } = req.body;

    if(!username || !email || !password){
        return res.status(400).json({
            message:"please provide username , email , password "
        })
    }

    const isUserAlreadyExists = await usermodel.findOne({
        $or:[{username},{email}]
    })

   if (isUserAlreadyExists){ 
    if (isUserAlreadyExists.username === username) 
        { return res.status(400).json({
             message: "Username is already registered"
             }); }
     if (isUserAlreadyExists.email === email) 
        { return res.status(400).json({ message: "Email is already registered" });
     } }

    const hash = await bcrypt.hash(password,10)

    const user = await usermodel.create({
        username,
        email,
        password : hash
    })

    const token = jwt.sign(
        {id:user._id,username:user.username},
        process.env.JWT_SECRET,
        {expiresIn:"1d"}
    )

    res.cookie("token" ,token)

    res.status(201).json({
        message : "user registered succesfully ",
        user :{
            id:user._id,
            username:user.username,
            email:user.email
        }
    })


}

/** 
 * @name loginUserController
 * @description logining  a  user with email and password 
 * @access Public
 */

async function loginUserController(req,res){
 const {email , password} = req.body;

    const user = await usermodel.findOne({ email })

    if(!user){
        return res.status(400).json({
            message:"email or password is incorrect"
        })
    }
    const isPasswordValid = await bcrypt.compare(password,user.password)

    if(!isPasswordValid){
         return res.status(400).json({
            message: "Invalid email or password"
        })
    }
    const token = jwt.sign(
        { id: user._id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    )
    res.cookie("token", token)
    res.status(200).json({
        message: "User loggedIn successfully.",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}


module.exports = {
    registeruserController,
    loginUserController
}