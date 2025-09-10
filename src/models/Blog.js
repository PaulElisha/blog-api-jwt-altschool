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
    slug: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    state: {
        type: String,
        enum: ["published", "archived", "draft"],
        required: true,
        default: 'draft'
    },
    readCount: {
        type: Number,
        default: 0
    },
    commentCount: {
        type: Number,
        default: 0
    },
    tags: {
        type: Array,
        required: true
    },
    body: {
        type: String,
        required: true
    }
}, { timestamps: true });

blogSchema.virtual("comments", {
    ref: "Comment",
    localField: "_id",
    foreignField: "blogId",
});

blogSchema.set("toObject", { virtuals: true });
blogSchema.set("toJSON", { virtuals: true });

export default model("Blog", blogSchema);



