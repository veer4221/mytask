import express, { Router } from "express";
const router = express.Router();
import { Transactioncontroller, registerController } from "../controllers/index.cjs";
import loginController from "../controllers/Auth/login.controller.cjs";
import auth from "../middlewares/auth.cjs";
import userController from "../controllers/Auth/user.controller.cjs";
import TimeLineController from "../controllers/TimeLine/timeline.cjs";
import TaskController from "../controllers/Task/task.cjs";

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
