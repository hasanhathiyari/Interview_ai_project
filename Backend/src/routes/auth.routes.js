const {Router} = require("express");
const usercontroller = require("../controller/auth.controller");
const authMiddleware = require("../middleware/auth.middlware");



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

/**
 * @route GET /api/auth/logout
 * @description logout   a  user 
 * @access public
 */

authRouter.get("/logout",usercontroller.logoutusercontroller)

/**
 * @route GET api/auth/get-me 
 * @description get the current logged in users
 * @access private 
 */

authRouter.get("/get-me",authMiddleware.authUser,usercontroller.getMeController)

module.exports = authRouter;