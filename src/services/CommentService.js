import Comment from "../models/Comment";
import Blog from '../models/Blog';

class CommentService {

    async getComment(filter) {
        const comment = await Comment.find(filter).populate('userId', 'firstName');
        if (!comment) {
            const error = new Error("No comments found");
            error.status = 404;
            throw error;
        }
        return comment;
    }


    async postComment(postData) {
        const comment = await Comment.create(postData);
        if (!comment) {
            const error = new Error("Failed to post comment");
            error.status = 500;
            throw error
        }
        return comment;
    }

    async updateComment(filter, updateData) {
        const updatedComment = await Comment.findOneAndUpdate(filter, updateData, { new: true });

        if (!updatedComment) {
            const error = new Error("Comment not found or you don't have permission to re-write this comment");
            error.status = 404;
            throw error;
        }
        return updatedComment;
    }

    async deleteComment(filter) {
        const comment = await Comment.findOne(filter);
        if (!comment) {
            const error = new Error("Comment not found or you don't have permission to delete this comment");
            error.status = 404;
            throw error;
        }

        await Comment.deleteOne(filter);
        return;
    }
}

export { CommentService };