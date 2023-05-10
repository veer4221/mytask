
import CustomerErrorHandler from "../../services/CustomErrorHandler.cjs";

import TimeLine from "../../models/timeline.cjs";
import * as fs from 'fs';
import { decodeBase64Image } from "../../utils/base64decode.cjs";
import { timelineImagePath } from "../../image/Timelines/index.js";
var mime = require('mime');
const TimeLineController = {
    insertTimeLine: async (req, res, next) => {
        try {
            const exist = await TimeLine.exists({ name: req.body.name })
            if (exist) return next(CustomerErrorHandler.alreadyExists("This TimeLine  is already exist"));
        } catch (error) {
            return next(error);
        }
        if (req.body.image) {
            //  res.send(decodeBase64Image(req.body.image))
            var decodedImg = decodeBase64Image(req.body.image);
            var imageBuffer = decodedImg.data;
            var type = decodedImg.type;
            var extension = mime.getExtension(type);
            var fileName = "timeline" + new Date().getTime() + "." + extension
            var filepath = timelineImagePath + `\\` + fileName
            req.body.image = `/image/Timelines` + fileName
            try {
                fs.writeFileSync(filepath, imageBuffer, 'utf8');
            }
            catch (err) {
                return next(err);
            }
        }
        const timeline = new TimeLine(req.body)
        try {
            const result = await timeline.save();
            if (result) res.send({ message: "inserted timeline  successfully" })
        } catch (error) {
            return next(error);
        }
    },
    getTimeLine: async (req, res, next) => {
        try {
            res.json(await TimeLine.find())
        } catch (error) {
            return next(error);
        }
    }
};

export default TimeLineController;
