import express from 'express';
import AuthController from "../controllers/AuthController.js";

class AuthRouter {
    constructor() {
        this.router = express.Router();
        this.authController = new AuthController();
        this.registerRoutes();
    }

    registerRoutes() {
        this.router.get("/", this.authController.loginUser);
        this.router.post("/", this.authController.registerUser);
    }
}

const authRouter = new AuthRouter().router;
export { authRouter };