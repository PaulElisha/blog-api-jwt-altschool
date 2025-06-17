import { config } from "dotenv";
config({ path: "../.env" });
import express from "express";
import { blogRouter } from "./routes/BlogRouter.js";
import { connectDB } from "./db.js";

const port = process.env.PORT;
const hostname = process.env.HOSTNAME;
console.log("Port and Hostname:", `${port} - ${hostname}`)

class App {
    constructor() {
        connectDB();
        this.app = express();
        this.initializeMiddlewares();
        this.initializeRoutes();
    }

    initializeMiddlewares() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }

    initializeRoutes() {
        this.app.use("/blog", blogRouter);
    }

    startServer() {
        this.app.listen(port, () => {
            console.log(`Server running at http://${hostname}:${port}/`);
        });
    }
}

const app = new App();
app.startServer();