import express, { Router } from "express";
const router = express.Router();
import { Transactioncontroller, registerController } from "../controllers/index";
import loginController from "../controllers/Auth/login.controller";
import auth from "../middlewares/auth";
import userController from "../controllers/Auth/user.controller";
import TimeLineController from "../controllers/TimeLine/timeline";
import TaskController from "../controllers/Task/task";

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
