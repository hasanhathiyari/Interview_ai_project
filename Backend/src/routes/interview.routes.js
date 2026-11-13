const express = require("express");
const authMiddleware = require("../middleware/auth.middlware");
const interviewController = require("../controller/interviewController");


const interviewRouter = express.Router()

/**
 * @route POST /api/interview/
 * @description
 * @access private
 */
interviewRouter.post("/",authMiddleware.authUser,interviewController.generateInterviewReportController)

module.exports = interviewRouter