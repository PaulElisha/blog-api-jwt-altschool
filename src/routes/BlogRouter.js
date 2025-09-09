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
        this.router.get('/:slug', this.blogController.getFeedBlogBySlug);
        this.router.get('/tags/:tag', this.blogController.getBlogsByTag);
        this.router.get('/most-read', this.blogController.getMostReadBlogs);
        this.router.get("/", this.userAccess.authorizeUser, this.blogController.getBlogs);
        this.router.get("/", this.userAccess.authorizeUser, this.blogController.getBlogsByState);
        this.router.post("/", this.userAccess.authorizeUser, this.blogValidation.validateBlog, this.blogController.createBlog);
        this.router.put("/:id", this.userAccess.authorizeUser, this.blogController.editBlog);
        this.router.put('/:id', this.userAccess.authorizeUser, this.blogController.publishBlog);
        this.router.delete("/:id", this.userAccess.authorizeUser, this.blogController.deleteBlog);
    }
}

const blogRouter = new BlogRouter().router;
export { blogRouter };