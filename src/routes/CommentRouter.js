import express from 'express';
import { CommentController } from "../controllers/CommentController.js";
import { UserAuthorization } from "../middlewares/AuthorizeUser.js";

class CommentRouter {
    constructor() {
        this.router = express.Router();
        this.commentController = new CommentController();
        this.userAccess = new UserAuthorization();
        this.registerRoutes();
    }

    registerRoutes() {
        this.router.post("/:blogId", this.userAccess.authorizeUser, this.commentController.postComment);
        this.router.put("/:id", this.userAccess.authorizeUser, this.commentController.updateComment);
        this.router.delete("/:id", this.userAccess.authorizeUser, this.commentController.deleteComment);
    }
}

const commentRouter = new CommentRouter().router;
export { commentRouter };