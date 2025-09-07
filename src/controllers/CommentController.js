import { CommentService } from "../services/CommentService";

class CommentController {

    constructor() {
        this.commentService = new CommentService();
    }

    postComment = async (req, res) => {
        const { blogId } = req.params;
        const { content } = req.body;
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

    updateComment = async (req, res) => {
        const { commentId } = req.params;
        const { updateData } = req.body;
        const { userId } = req.user;

        const filter = { commentId, userId };
        try {
            const response = await this.commentService.updateComment(filter, updateData);
            res.status(200).json({ message: "Comment deleted successfully", status: "ok", data: response });
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error", status: "error" });
        }
    }

    deleteComment = async (req, res) => {
        const { commentId } = req.params;
        const { userId } = req.user;

        const filter = { commentId, userId };
        try {
            await this.commentService.deleteComment(filter);
            res.status(200).json({ message: "Comment deleted successfully", status: "ok" });
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error", status: "error" });
        }
    }
}

export { CommentController };