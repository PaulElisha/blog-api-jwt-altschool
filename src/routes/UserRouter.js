import express from 'express';
import UserController from "../controllers/UserController.js";
import { UserAuthorization } from "../middlewares/AuthorizeUser.js";

class UserRouter {
    constructor() {
        this.router = express.Router();
        this.userController = new UserController();
        this.userAccess = new UserAuthorization();
        this.registerRoutes();
    }

    registerRoutes() {
        this.router.get("/", this.userAccess.authorizeUser, this.userController.getUser);
        this.router.put("/:id", this.authorizeUser.authorizeUser, this.userController.editUser);
        this.router.delete("/:id", this.userAccess.authorizeUser, this.userController.deleteUser);
    }
}

const userRouter = new UserRouter().router;
export { userRouter };