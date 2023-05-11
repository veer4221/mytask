import CustomerErrorHandler from "../../services/CustomErrorHandler";
import jwt from "jsonwebtoken";
import TimeLine from "../../models/timeline";
import * as fs from "fs";
import { decodeBase64Image } from "../../utils/base64decode";
import { timelineImagePath } from "../../image/Timelines";
// var mime = require('mime');
import mime from "mime";
import UserTimeline from "../../models/userTimeline";
const TimeLineController = {
    getUserTimeLine: async (req, res, next) =>
        res.send({
            timelines: await UserTimeline.findOne({ userId: jwt.verify(req.get("Authorization").split(" ")[1], process.env.JWT_SECRET)._id }),
        }),

    insertUserTimeline: async (req, res, next) => {
        try {
            console.log("hello");
            const decoded = jwt.verify(req.get("Authorization").split(" ")[1], process.env.JWT_SECRET);
            const findUser = await UserTimeline.find({ userId: decoded._id });
            if (findUser) {
                const filter = { userId: decoded._id };
                const update = { object: req.body.object };
                let doc = await UserTimeline.findOneAndUpdate(filter, update);
                return res.send({ doc });
            }
            // res.json(findUser)
            let userTimeline = new UserTimeline({ object: req.body.object, userId: decoded._id });
            let doc = await userTimeline.save();
            return res.json(doc);
            // res.send({ doc })
            // res.send({
            //     token: req.get("Authorization").split(" ")[1],
            //     decoded
            // })
        } catch (error) {
            console.error(error);
            return next(error);
        }
    },
    insertTimeLine: async (req, res, next) => {
        try {
            const exist = await TimeLine.exists({ name: req.body.name });
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
            var fileName = "timeline" + new Date().getTime() + "." + extension;
            var filepath = timelineImagePath + `\\` + fileName;
            req.body.image = `/image/Timelines` + fileName;
            try {
                fs.writeFileSync(filepath, imageBuffer, "utf8");
            } catch (err) {
                return next(err);
            }
        }
        const timeline = new TimeLine(req.body);
        try {
            const result = await timeline.save();
            if (result) res.send({ message: "inserted timeline  successfully" });
        } catch (error) {
            return next(error);
        }
    },
    getTimeLine: async (req, res, next) => {
        try {
            res.json(await TimeLine.find());
        } catch (error) {
            return next(error);
        }
    },
};

export default TimeLineController;
