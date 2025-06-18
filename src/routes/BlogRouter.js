import express from 'express';
import BlogController from "../controllers/blogControllers.js";

class BlogRouter {
    constructor() {
        this.router = express.Router();
        this.blogController = new BlogController();
        this.registerRoutes();
    }

    registerRoutes() {
        this.router.get("/", this.blogController.getBlogs);
        this.router.get("/:id", this.blogController.getBlogById);
        this.router.post("/", this.blogController.postBlog);
        this.router.put("/:id", this.blogController.updateBlog);
        this.router.delete("/:id", this.blogController.deleteBlog);
    }
}

const blogRouter = new BlogRouter().router;
export { blogRouter };