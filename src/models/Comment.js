import { Schema } from "mongoose";

const commentSchema = new Schema({
    blogId: {
        type: Schema.Types.ObjectId,
        ref: "Blog",
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
}, { timestamps: true });

export default model("Comment", commentSchema);