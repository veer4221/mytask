
import CustomerErrorHandler from "../../services/CustomErrorHandler.js";

import TimeLine from "../../models/timeline.js";
import * as fs from 'fs';
import { decodeBase64Image } from "../../utils/base64decode.js";

import Task from "../../models/task.js";
import { taskImagePath } from "../../image/TaskImage/index.js";
// import task from "../../models/task";
var mime = require('mime');
const TaskController = {
    insertTask: async (req, res, next) => {
        // try {
        //     const exist = await TimeLine.exists({ name: req.body.taskslug })
        //     if (exist) return next(CustomerErrorHandler.alreadyExists("This this  is already exist"));
        // } catch (error) {
        //     return next(error);
        // }
        if (req.body.image) {
            var decodedImg = decodeBase64Image(req.body.image);
            var imageBuffer = decodedImg.data;
            var type = decodedImg.type;
            var extension = mime.getExtension(type);
            var fileName = "task" + new Date().getTime() + "." + extension
            var filepath = taskImagePath + `\\` + fileName
            req.body.image = `/image/TaskImage/` + fileName
            try {
                fs.writeFileSync(filepath, imageBuffer, 'utf8');
            }
            catch (err) {
                return next(err);
            }
        }
        const timeline = new Task(req.body)
        try {
            const result = await timeline.save();
            if (result) res.send({ message: "inserted timeline  successfully" })
        } catch (error) {
            return next(error);
        }
    },
    getTimeLine: async (req, res, next) => {
        try {
            res.json(await Task.find())
        } catch (error) {
            return next(error);
        }
    },
    getTest: async (req, res, next) => {
        try {

            const result = await Task.find().populate("perentId")
            res.send(result)
        } catch (error) {
            console.log(error)
            res.send(error.message)
        }
    },
    uploadImage: function (req, res) {
        if (req.body.image) {
            var decodedImg = decodeBase64Image(req.body.image);
            var imageBuffer = decodedImg.data;
            var type = decodedImg.type;
            var extension = mime.getExtension(type);
            var fileName = "task" + new Date().getTime() + "." + extension
            var filepath = taskImagePath + `\\` + fileName
            req.body.image = `/image/TaskImage/` + fileName
            try {
                fs.writeFileSync(filepath, imageBuffer, 'utf8');
                res.send(req.body.image)
            }
            catch (err) {
                return next(err);
            }
        }
    }
};

export default TaskController;
