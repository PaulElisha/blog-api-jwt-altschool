import express from 'express';
import BlogController from "../controllers/blogControllers.js";

class BlogRouter {
    constructor() {
        this.blogRouter = express.Router();
        this.blogController = new BlogController();
        this.registerRoutes();
    }

    registerRoutes() {
        this.blogRouter.get("/", this.blogController.getBlogs);
        this.blogRouter.get("/:id", this.blogController.getBlogById);
        this.blogRouter.post("/", this.blogController.postBlog);
        this.blogRouter.put("/:id", this.blogController.updateBlog);
        this.blogRouter.delete("/:id", this.blogController.deleteBlog);
    }
}

const blogRouter = new BlogRouter().router;
export { blogRouter };