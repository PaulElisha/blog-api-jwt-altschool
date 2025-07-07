import BlogService from "../services/BlogService.js";

class BlogController {
    constructor() {
        this.blogService = new BlogService();
    }

    getPublishedBlogs = async (req, res) => {
        const query = {};

        if (req.query.published) {
            query.published = req.query.published;
        }
        try {
            const response = await this.blogService.getPublishedBlogs(query);
            res.status(200).json({ message: "Published blogs fetched successfully", status: "   ok", data: response });
        } catch (error) {
            console.error("Error fetching published blogs:", error);
            res.status(500).json({ message: "Internal Server Error", status: "error" });
        }
    }

    getAPublishedBlog = async (req, res) => {
        const id = req.params.id;

        try {
            const response = await this.blogService.getAPublishedBlog(id);
            res.status(200).json({ message: "Published blogs fetched successfully", status: "   ok", data: response });
        } catch (error) {
            console.error("Error fetching published blogs:", error);
            res.status(500).json({ message: "Internal Server Error", status: "error" });
        }
    }

    getBlogs = async (req, res) => {
        try {
            const response = await this.blogService.getBlogs();
            res.status(200).json({ message: "Blogs fetched successfully", status: "ok", data: response });
        } catch (error) {
            console.error("Error fetching blogs:", error);
            res.status(500).json({ message: "Internal Server Error", status: "error" });
        }
    }

    createBlog = async (req, res) => {
        try {
            const response = await this.blogService.createBlog(req.body);
            res.status(201).json({ message: "User created successfully", status: "ok", data: response });

        } catch (error) {
            console.error("Error creating User:", err);
            res.status(500).json({ message: "Internal Server Error", status: "error" });
        }
    }

    updateBlog = async (req, res) => {
        try {
            const response = await this.blogService.updateBlog(req.params.id, req.body);
            res.status(200).json({ message: "Blog updated successfully", status: "ok", data: response });
        } catch (error) {
            console.error("Error updating Blog:", error);
            res.status(500).json({ message: "Internal Server Error", status: "error" });
        }
    }

    deleteBlog = async (req, res) => {
        try {
            const response = await this.blogService.deleteBlog(req.params.id);
            res.status(200).json({ message: "Blog deleted successfully", status: "ok" });
        } catch (error) {
            console.error("Error deleting Blog:", error);
            res.status(500).json({ message: "Internal Server Error", status: "error" });
        }
    }
}



export default BlogController;