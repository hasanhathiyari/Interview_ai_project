const express = require("express");
const authMiddleware = require("../middleware/auth.middlware");
const interviewController = require("../controller/interviewController");
const upload = require("../middleware/file.middleware");


const interviewRouter = express.Router()

/**
 * @route POST /api/interview/
 * @description
 * @access private
 */
interviewRouter.post("/",authMiddleware.authUser , upload.single("resume"),  interviewController.generateInterviewReportController)

/**
 * @route GET /api/interview/report/:interviewId
 * @description get interview report by interviewId
 * @access private
 */
interviewRouter.get("/report/:interviewId", authMiddleware.authUser , interviewController.getInterviewReportByIdController)

/**
 * @route GET /api/interview
 * @description get all interview report of logged in user
 * @access private
 */
interviewRouter.get("/", authMiddleware.authUser , interviewController.getAllInterviewReportsController)


module.exports = interviewRouter
