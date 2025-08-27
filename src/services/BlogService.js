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

    getPublishedBlogs = async (query) => {
        const blogs = await Blog.find(query);
        if (blogs.length === 0) {
            const error = new Error('No published blogs found');
            error.statusCode = 404;
            throw error;
        }
        return blogs;
    }

    getAPublishedBlog = async (id) => {
        const blog = await Blog.findOne(id);
        if (!blog) {
            const error = new Error('No blog found');
            error.statusCode = 404;
            throw error;
        }
        return blog;
    }

    getBlogs = async () => {
        const blogs = await Blog.find({});
        if (blogs.length === 0) {
            const error = new Error('No blogs found');
            error.statusCode = 404;
            throw error;
        }
        return blogs;
    }

    getUserBlogs = async (userId) => {
        const blogs = await Blog.find({ userId });
        if (!blogs || blogs.length === 0) {
            const error = new Error('No blogs found for this user');
            error.statusCode = 404;
            throw error;
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

        const updatedProduct = await Blog.findOneAndUpdate(filter, updateData, { new: true });

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

        const deletedProduct = await Blog.findOneAndDelete(filter, updateData, { new: true });

        if (!deletedProduct) {
            const error = new Error('Deletion unsuccessful');
            error.statusCode = 404;
            throw error;
        }
    }
}

export default BlogService 