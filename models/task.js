import mongoose from "mongoose";
const Schema = mongoose.Schema;
var Comments = new Schema({
    title: "string",
    body: "string",
    date: "date",
});
const taskSchema = new Schema(
    {
        name: {
            type: "string",
            required: true,
        },
        taskslug: {
            type: "string",
            required: true,
            unique: true,
        },
        image: {
            type: "string",
            required: false,
            unique: false,
        },
        priority: {
            type: "string",
            enum: ["H", "M", "L", "NA"],
            required: true,
        },
        startTime: {
            type: "date",
        },
        endTime: {
            type: "date",
        },
        description: {
            notes: {
                type: "string",
                required: false,
            },
            text: {
                type: "string",
                required: false,
            },
        },
        isCheck: {
            type: "boolean",
            default: false,
        },
        Comment: [Comments],
        perentId: { type: mongoose.Schema.Types.ObjectId, ref: "Task" },
        timeLineId: { type: mongoose.Schema.Types.ObjectId, ref: "Timeline" },
        status: {
            type: "boolean",
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Task", taskSchema, "task");
