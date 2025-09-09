import BlogService from "../services/BlogService.js";

class BlogController {
    constructor() {
        this.blogService = new BlogService();
    }

    getBlogsByState = async (req, res) => {

        const query = {};

        const { state } = req.query;
        const { userId } = req.user;

        if (state) {
            query.state = state;
        }

        try {
            const data = await this.blogService.getBlogsByState(query, userId);
            res.status(200).json({ message: "Blogs fetched successfully", status: "ok", data });
        } catch (error) {
            console.error("Error fetching blogs:", error);
            res.status(500).json({ message: error.message, status: "error" });
        }
    }

    getBlogs = async (req, res) => {
        try {
            const data = await this.blogService.getBlogs();
            res.status(200).json({ message: "Blogs fetched successfully", status: "ok", data });
        } catch (error) {
            res.status(500).json({ message: error.message, status: "error" });
        }
    }

    getFeedBlogBySlug = async (req, res) => {
        const { slug } = req.params;
        try {
            const blog = await this.blogService.getFeedBlogBySlug(slug);
            res.status(200).json({ message: "Blog fetched successfully", status: "ok", data: blog });
        } catch (error) {
            res.status(500).json({ message: error.message, status: "error" });
        }
    }

    getBlogsByTag = async (req, res) => {
        const { tag } = req.params;
        try {
            const blogs = await this.blogService.getBlogsByTag(tag);
            res.status(200).json({ message: "Blogs fetched successfully", status: "ok", data: blogs });
        } catch (error) {
            res.status(500).json({ message: error.message, status: "error" });
        }
    }

    getMostReadBlogs = async (req, res) => {
        try {
            const blogs = await this.blogService.getMostReadBlogs();
            res.status(200).json({ message: "Most read blogs fetched successfully", status: "ok", data: blogs });
        } catch (error) {
            res.status(500).json({ message: error.message, status: "error" });
        }
    }

    createBlog = async (req, res) => {
        const userId = req.user._id;
        const slug = req.body.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
        req.body.slug = slug;
        req.body.userId = userId;

        try {
            const response = await this.blogService.createBlog(req.body);
            res.status(201).json({ message: "User created successfully", status: "ok", data: response });

        } catch (error) {
            console.error("Error creating User:", err);
            res.status(500).json({ message: error.message, status: "error" });
        }
    }

    editBlog = async (req, res) => {
        const updateData = req.body;
        const blogId = req.params.id;
        const userId = req.user._id;
        if (!updateData || Object.keys(updateData).length === 0) {
            return res.status(400).json({ message: 'No blog data provided for update' });
        }

        const filter = { _id: blogId, userId };

        try {
            const response = await this.blogService.editBlog(filter, updateData);
            res.status(200).json({ message: "Blog updated successfully", status: "ok", data: response });
        } catch (error) {
            console.error("Error updating Blog:", error);
            res.status(500).json({ message: error.message, status: "error" });
        }
    }

    publishBlog = async (req, res) => {
        const userId = req.user._id;
        const blogId = req.params.id;

        const filter = { _id: blogId, userId };
        try {
            const blog = await this.blogService.publishBlog(filter);
            res.status(200).json({ message: "Blog published successfully", status: "ok", data: blog });
        } catch (error) {
            console.error("Error publishing Blog:", error);
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