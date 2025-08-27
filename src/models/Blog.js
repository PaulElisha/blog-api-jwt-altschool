import { Schema, model } from "mongoose";

const blogSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: {
        type: String,
        required: true,
        unique: true
    },
    author: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    state: {
        type: String,
        enum: ["published", "archived", "draft", "deleted"],
        required: true,
        default: "draft"
    },
    readCount: {
        type: Number,
        default: 0
    },
    readingTime: {
        type: String
    },
    tags: {
        type: Array
    },
    body: {
        type: String,
        required: true
    }

}, { timestamps: true });

export default model("Blog", blogSchema);



