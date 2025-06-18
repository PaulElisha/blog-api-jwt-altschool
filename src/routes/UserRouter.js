import express from 'express';
import UserController from "../controllers/UserControllers.js";

class UserRouter {
    constructor() {
        this.router = express.Router();
        this.userController = new UserController();
        this.registerRoutes();
    }

    registerRoutes() {
        this.router.get("/", this.userController.getUsers);
        this.router.get("/:id", this.userController.getUserById);
        this.router.post("/", this.userController.postUser);
        this.router.put("/:id", this.userController.updateUser);
        this.router.delete("/:id", this.userController.deleteUser);
    }
}

const userRouter = new UserRouter().router;
export { userRouter };