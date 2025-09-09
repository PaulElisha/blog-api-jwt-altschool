import express from 'express';
import { AiController } from "../controllers/AiController.js";
import { UserAuthorization } from "../middlewares/AuthorizeUser.js";

class AiRouter {
    constructor() {
        this.router = express.Router();
        this.aiController = new AiController();
        this.userAccess = new UserAuthorization();
        this.registerRoutes();
    }

    registerRoutes() {
        this.router.post('/generate-ideas', this.aiController.generateBlogIdeas);
        this.router.post('/generate-summary', this.aiController.generateBlogSummary);
        this.router.post('/generate-blog', this.aiController.generateBlog);
    }
}

const aiRouter = new AiRouter().router;
export { aiRouter };