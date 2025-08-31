import e from "express";
import Comment from "../models/Comment";

class CommentService {
    async postComment(data) {
        const { blogId, userId, content } = postData;

        if (!content) {
            const error = new Error("Content is required");
            error.status = 400;
            throw error;
        }

        const comment = await Comment.create(content);
        if (!comment) {
            const error = new Error("Failed to post comment");
            error.status = 500;
            throw error
        }
        return comment;
    }

    async fetchComments(blogId) {
        const comments = await Comment.find({ blogId });
        if (comments.length === 0) {
            const error = new Error("No comments found for this blog");
            error.status = 404;
            throw error;
        }
        return comments;
    }

    async getCommentsByBlogId(blogId) {
        return await Comment.find({ blogId }).populate("userId", "email").sort({ createdAt: -1 });
    }

    async updateComment(filter, updateData) {
        const comment = await Comment.findOne(filter);
        if (!comment) {
            const error = new Error("Comment not found or you don't have permission to re-write this comment");
            error.status = 404;
            throw error;
        }

        return await Comment.updateOne(filter, updateData, { new: true });
    }

    async deleteComment({ commentId, blogId, userId }) {
        const comment = await Comment.findOne({ _id: commentId, blogId, userId });
        if (!comment) {
            const error = new Error("Comment not found or you don't have permission to delete this comment");
            error.status = 404;
            throw error;
        }

        return await Comment.deleteOne(filter);
    }
}

export { CommentService };