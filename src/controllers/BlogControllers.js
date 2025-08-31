import BlogService from "../services/BlogService.js";

class BlogController {
    constructor() {
        this.blogService = new BlogService();
    }

    getBlogs = async (req, res) => {

        const query = {};

        const { state } = req.query;
        const { userId } = req.user;

        if (state) {
            query.state = state;
        }

        if (userId) {
            query.userId = userId;
        }
        try {
            const data = await this.blogService.getBlogs(query);
            res.status(200).json({ message: "Blogs fetched successfully", status: "ok", data });
        } catch (error) {
            console.error("Error fetching blogs:", error);
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