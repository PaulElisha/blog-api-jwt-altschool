import { config } from "dotenv";
config({ path: ".env" });
import express from "express";
import cors from "cors";

import { blogRouter } from "./src/routes/BlogRouter.js";
import { aiRouter } from "./src/routes/AiRouter.js";
import { userRouter } from "./src/routes/UserRouter.js";
import { authRouter } from "./src/routes/AuthRouter.js";
import { commentRouter } from './src/routes/CommentRouter.js'
import { connectDb } from "./src/config/connectDb.js";

const port = process.env.PORT;
const hostname = process.env.HOSTNAME;
const MONGODB_URI = process.env.MONGODB_URI;
console.log("Port and Hostname:", `${port} - ${hostname} - ${MONGODB_URI}`);

class App {
    constructor() {
        this.db = new connectDb();
        this.app = express();
        this.initializeMiddlewares();
        this.initializeRoutes();
    }

    initializeMiddlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }

    initializeRoutes() {
        this.app.use('api/auth', authRouter);
        this.app.use("/api/users", userRouter);
        this.app.use("/api/blogs", blogRouter);
        this.app.use('/api/comments', commentRouter);
        this.app.use("/api/ai", aiRouter);
    }

    startServer() {
        this.app.listen(port, () => {
            console.log(`Server running at http://${hostname}:${port}/`);
        });
    }
}

const app = new App();
app.startServer();