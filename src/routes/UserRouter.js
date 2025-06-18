import express from 'express';
import UserController from "../controllers/UserControllers.js";

class UserRouter {
    constructor() {
        this.userRouter = express.Router();
        this.userController = new UserController();
        this.registerRoutes();
    }

    registerRoutes() {
        this.userRouter.get("/", this.userController.getBlogs);
        this.userRouter.get("/:id", this.userController.getBlogById);
        this.userRouter.post("/", this.userController.postBlog);
        this.userRouter.put("/:id", this.userController.updateBlog);
        this.userRouter.delete("/:id", this.userController.deleteBlog);
    }
}

const userRouter = new UserRouter().router;
export { userRouter };