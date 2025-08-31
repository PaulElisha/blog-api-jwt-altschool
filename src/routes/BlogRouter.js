import express from 'express';
import { BlogController } from "../controllers/BlogController.js";
import { BlogValidation } from "../middlewares/BlogValidation.js"
import { UserAuthorization } from "../middlewares/AuthorizeUser.js";

class BlogRouter {
    constructor() {
        this.router = express.Router();
        this.blogController = new BlogController();
        this.blogValidation = new BlogValidation();
        this.userAccess = new UserAuthorization();
        this.registerRoutes();
    }

    registerRoutes() {
        this.router.get("/", this.blogController.getBlogs);
        this.router.post("/", this.userAccess.authorizeUser, this.blogValidation.validateBlog, this.blogController.createBlog);
        this.router.put("/:id", this.userAccess.authorizeUser, this.blogController.updateBlog);
        this.router.delete("/:id", this.userAccess.authorizeUser, this.blogController.deleteBlog);
    }
}

const blogRouter = new BlogRouter().router;
export { blogRouter };