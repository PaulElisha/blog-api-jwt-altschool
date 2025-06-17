import mongoose from "mongoose";
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    author: {
        type: String
    },
    description: {
        type: String
    },
    state: {
        type: Boolean,
        default: true
    },
    readCount: {
        type: Number,
    },
    readingTime: {
        type: String
    },
    tags: {
        type: Array
    },
    body: {
        type: String
    }

}, { timestamps: true });

export default mongoose.model("Blog", blogSchema);



