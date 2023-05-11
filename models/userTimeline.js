import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userTimeSchema = new Schema(
    {
        object: {
            type: "string",
            required: true,
        },

        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        status: {
            type: "boolean",
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("UsersTimeline", userTimeSchema, "usersTimeline");
