import { CommentService } from "../services/CommentService";

class CommentController {

    constructor() {
        this.commentService = new CommentService();
    }

    postComment = async (req, res) => {
        const { blogId, content } = req.body;
        const { userId } = req.user;

        const postData = { blogId, userId, content };

        try {
            const response = await this.commentService.postComment(postData);
            res.status(201).json({ message: "Comment posted successfully", status: "ok", data: response });
        } catch (error) {
            console.error("Error posting comment:", error);
            res.status(error.status || 500).json({ message: error.message || "Internal Server Error", status: "error" });
        }
    }

    fetchComments = async (req, res) => {
        try {
            const response = await this.commentService.fetchComments(req.params.blogId);
            res.status(200).json({ message: "Comments fetched successfully", status: "ok", data: response });
        } catch (error) {
            console.error("Error fetching comments:", error);
            res.status(error.status || 500).json({ message: error.message || "Internal Server Error", status: "error" });
        }
    }

    getCommentsByBlogId = async (req, res) => {
        try {
            const response = await this.commentService.getCommentsByBlogId(req.params.blogId);
            res.status(200).json({ message: "Comments fetched successfully", status: "ok", data: response });
        } catch (error) {
            console.error("Error fetching comments by blog ID:", error);
            res.status(500).json({ message: "Internal Server Error", status: "error" });
        }
    }

    updateComment = async (req, res) => {
        const { commentId, blogId } = req.params;
        const { updateData } = req.body;
        const { userId } = req.user;

        const filter = { commentId, blogId, userId };
        try {
            await this.commentService.updateComment(filter, updateData);
            res.status(200).json({ message: "Comment deleted successfully", status: "ok" });
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error", status: "error" });
        }
    }

    deleteComment = async (req, res) => {
        const { commentId, blogId } = req.params;
        const { userId } = req.user;

        const filter = { commentId, blogId, userId };
        try {
            await this.commentService.deleteComment(filter);
            res.status(200).json({ message: "Comment deleted successfully", status: "ok" });
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error", status: "error" });
        }
    }
}

export { CommentController };