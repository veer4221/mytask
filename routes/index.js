import express, { Router } from "express";
const router = express.Router();
import { Transactioncontroller, registerController } from "../controllers/index.js";
import loginController from "../controllers/Auth/login.controller.js";
import auth from "../middlewares/auth.js";
import userController from "../controllers/Auth/user.controller.js";
import TimeLineController from "../controllers/TimeLine/timeline.js";
import TaskController from "../controllers/Task/task.js";

router.post("/register", registerController.register);
router.post("/login", loginController.login);
router.get("/me", auth, userController.me);
router.post("/Transaction", Transactioncontroller.Transaction);

//timeLineRoute
router.post("/Timeline", TimeLineController.insertTimeLine);
router.get("/getTimeline", TimeLineController.getTimeLine);
//task
router.post("/Task", TaskController.insertTask);
router.get("/TaskList", TaskController.getTimeLine);
router.get("/getTest", TaskController.getTest);
router.post("/UploadImage", TaskController.uploadImage);
// getTest
export default router;
