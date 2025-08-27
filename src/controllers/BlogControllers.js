import BlogService from "../services/BlogService.js";

class BlogController {
    constructor() {
        this.blogService = new BlogService();
    }

    getPublishedBlogs = async (req, res) => {
        const query = {};

        const { state } = req.query;

        if (state) {
            query.state = state
        }
        try {
            const response = await this.blogService.getPublishedBlogs(query);
            res.status(200).json({ message: "Published blogs fetched successfully", status: "   ok", data: response });
        } catch (error) {
            console.error("Error fetching published blogs:", error);
            res.status(500).json({ message: error.message, status: "error" });
        }
    }

    getAPublishedBlog = async (req, res) => {
        const id = req.params.id;

        try {
            const response = await this.blogService.getAPublishedBlog(id);
            res.status(200).json({ message: "Published blogs fetched successfully", status: "   ok", data: response });
        } catch (error) {
            console.error("Error fetching published blogs:", error);
            res.status(500).json({ message: error.message, status: "error" });
        }
    }

    getBlogs = async (req, res) => {
        try {
            const response = await this.blogService.getBlogs();
            res.status(200).json({ message: "Blogs fetched successfully", status: "ok", data: response });
        } catch (error) {
            console.error("Error fetching blogs:", error);
            res.status(500).json({ message: error.message, status: "error" });
        }
    }

    getUserBlogs = async (req, res) => {
        const userId = req.user._id;
        try {
            const response = await this.blogService.getUserBlogs(userId);
            res.status(200).json({ message: "User blogs fetched successfully", status: "ok", data: response });
        } catch (error) {
            console.error("Error fetching User blogs:", error);
            res.status(500).json({ message: error.message, status: "error" });
        }
    }

    createBlog = async (req, res) => {
        const userId = req.user._id;
        try {
            const response = await this.blogService.createBlog({ ...req.body, userId });
            res.status(201).json({ message: "User created successfully", status: "ok", data: response });

        } catch (error) {
            console.error("Error creating User:", err);
            res.status(500).json({ message: error.message, status: "error" });
        }
    }

    updateBlog = async (req, res) => {
        const updateData = req.body;
        const blogId = req.params.id;
        const userId = req.user._id;
        if (!updateData || Object.keys(updateData).length === 0) {
            return res.status(400).json({ message: 'No product data provided for update' });
        }

        const filter = { _id: productId, userId };

        try {
            const response = await this.blogService.updateBlog(filter, updateData);
            res.status(200).json({ message: "Blog updated successfully", status: "ok", data: response });
        } catch (error) {
            console.error("Error updating Blog:", error);
            res.status(500).json({ message: error.message, status: "error" });
        }
    }

    deleteBlog = async (req, res) => {
        const blogId = req.params.id;
        const user = req.user;

        try {
            await this.blogService.deleteBlog({ _id: blogId, userId: user._id });
            res.status(200).json({ message: "Blog deleted successfully", status: "ok" });
        } catch (error) {
            console.error("Error deleting Blog:", error);
            res.status(500).json({ message: error.message, status: "error" });
        }
    }
}


export { BlogController };