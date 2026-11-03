const {Router} = require("express");
const usercontroller = require("../controller/auth.controller");


const authRouter = Router();

/**
 * @route POST /api/auth/register
 * @description registering a new user 
 * @access public
 */

authRouter.post("/register",usercontroller.registeruserController)

/**
 * @route POST /api/auth/login
 * @description logining  a  user 
 * @access public
 */
authRouter.post("/login",usercontroller.loginUserController)

module.exports = authRouter;