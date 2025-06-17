import { fileURLToPath } from "url";
import { dirname, join } from "path";
import Blog from "../models/Blog.js";

class BlogController {
    constructor() {
        this.__path = fileURLToPath(import.meta.url);
        this.__dirname = dirname(this.__path);
        this.port = process.env.port;
        this.filePath = join(this.__dirname, "../db/Blogs.json");
    }

    getBlogs = async (req, res) => {
        Blog.find({}).then((Blogs) => {
            res.status(200).json(Blogs);
        }
        ).catch((err) => {
            console.error("Error fetching Blogs:", err);
            res.status(500).json({ message: "Internal Server Error" });
        });
    }

    getBlogById = async (req, res) => {

        Blog.findById(req.params.id).then((Blog) => {
            if (!Blog) {
                res.status(404).json({ message: "Blog not found" });
                return;
            }
            res.status(200).json(Blog)
        }).catch((err) => {
            console.error("Error fetching Blog:", err);
            res.status(500).json({ message: "Internal Server Error" });
        })
    }

    postBlog = async (req, res) => {

        Blog.create(req.body)
            .then((Blog) => {
                res.status(201).json({ message: "Blog created successfully", status: "ok" });
            })
            .catch((err) => {
                console.error("Error creating Blog:", err);
                res.status(500).json({ message: "Internal Server Error" });
            }
            );
    }

    updateBlog = async (req, res) => {


        Blog.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .then((Blog) => {
                if (!Blog) {
                    res.status(404).json({ message: "Blog not found" });
                    return;
                }
                res.status(200).json({ Blog });
            })
            .catch((err) => {
                console.error("Error updating Blog:", err);
                res.status(500).json({ message: "Internal Server Error" });
            });
    }

    deleteBlog = async (req, res) => {

        Blog.findByIdAndDelete(req.params.id)
            .then(() => {
                res.status(200).json({ message: "Blog deleted successfully" });
            })
            .catch((err) => {
                console.error("Error updating Blog:", err);
                res.status(500).json({ message: "Internal Server Error" });
            });
    }
}



export default BlogController;