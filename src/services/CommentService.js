import Comment from "../models/Comment";
import Blog from '../models/Blog';

class CommentService {
    async postComment(postData) {
        const { blogId, userId, content } = postData;

        const blog = await Blog.findOne({ _id: blogId, userId });

        if (!blog) {
            const error = new Error('Blog post not found');
            error.status = 400;
            throw error;
        }

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
        const blog = await Blog.findById(blogId);
        if (!blog) {
            const error = new Error('Blog not found');
            error.status = 404;
            throw error;
        }

        if (blog._id.toString() === blogId) {
            const comments = await Comment.find({ blogId }).populate('userId', 'email').sort({ createdAt: -1 });
            if (comments.length === 0) {
                const error = new Error("No comments found for this blog");
                error.status = 404;
                throw error;
            }
            return comments;
        }
    }

    async updateComment(filter, updateData) {
        const { commentId, blogId, userId } = filter;

        const blog = await Blog.findOne({ _id: blogId, userId });

        if (!blog) {
            const error = new Error("Blog not found or you don't have permission to update comments on this blog");
            error.status = 404;
            throw error;
        }

        const comment = await Comment.findOne({ _id: commentId, blogId, userId });
        if (!comment) {
            const error = new Error("Comment not found or you don't have permission to re-write this comment");
            error.status = 404;
            throw error;
        }

        return await Comment.updateOne(filter, updateData, { new: true });
    }

    async deleteComment({ commentId, blogId, userId }) {
        const blog = await Blog.findOne({ _id: blogId, userId });

        if (!blog) {
            const error = new Error("Blog not found or you don't have permission to update comments on this blog");
            error.status = 404;
            throw error;
        }

        const comment = await Comment.findOne({ _id: commentId, blogId, userId });
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