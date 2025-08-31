import Blog from '../models/Blog.js';

class BlogService {

    createBlog = async (data) => {
        const foundOne = await Blog.findOne({ title: data.title });
        if (foundOne) {
            const error = new Error('Blog with this title already exists');
            error.statusCode = 400;
            throw error;
        }
        const blog = await Blog.create(data);
        if (!blog) {
            const error = new Error('Blog creation failed');
            error.statusCode = 500;
            throw error;
        }
        return { message: "Blog created successfully", status: "ok", data: blog };
    }

    getBlogs = async (query) => {
        const { state, userId } = query;
        let blogs = await Blog.find(userId);
        if (blogs.length === 0) {
            const error = new Error('No blogs found');
            error.statusCode = 404;
            throw error;
        }

        switch (state) {
            case 'published':
                blogs = blogs.filter(blog => blog.state === 'published');
                break;
            case 'archived':
                blogs = blogs.filter(blog => blog.state === 'archived');
                break;
            default:
                blogs = blogs.filter(blog => blog.state === 'draft');
        }
        return blogs;
    }

    updateBlog = async (filter, updateData) => {
        const blog = await Blog.findOne(filter);
        if (!blog) {
            const error = new Error('Blog not found or unauthorized');
            error.statusCode = 404;
            throw error;
        }

        const updatedProduct = await Blog.updateOne(filter, updateData, { new: true });

        if (!updatedProduct) {
            const error = new Error('Product update failed');
            error.statusCode = 500;
            throw error;
        }
    }

    deleteBlog = async (filter) => {
        const blog = await Blog.findOne(filter);
        if (!blog) {
            const error = new Error('Blog not found or unauthorized');
            error.statusCode = 404;
            throw error;
        }

        const deletedProduct = await Blog.deleteOne(filter);

        if (!deletedProduct) {
            const error = new Error('Deletion unsuccessful');
            error.statusCode = 404;
            throw error;
        }
    }
}

export default BlogService 