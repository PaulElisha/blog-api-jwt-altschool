import { Types } from 'mongoose';
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

        return blog;
    }

    getBlogsByState = async (query, userId) => {
        const { state } = query;
        let blogs = await Blog.find({ userId, state });

        if (blogs.length === 0) {
            const error = new Error('No blogs found');
            error.statusCode = 404;
            throw error;
        }
        return blogs;
    }

    getBlogs = async () => {
        let blogs = await Blog.find({ state: 'published' }).populate('userId').sort({ createdAt: -1 });

        blogs = blogs.filter(blog => blog.state === 'published')
        if (blogs.length === 0) {
            const error = new Error('No published blogs found');
            error.statusCode = 404;
            throw error;
        }
        return blogs;
    }

    getFeedBlog = async (blogId) => {
        const blogWithComments = await Blog.findByIdAndUpdate(blogId, { $inc: { readCount: 1 } }).populate('comments', 'userId');

        if (!blogWithComments) {
            const error = new Error('Blog not found');
            error.statusCode = 404;
            throw error;
        }

        return blogWithComments;
    }

    editBlog = async (filter, updateData) => {
        const blog = await Blog.findOne(filter);
        if (!blog) {
            const error = new Error('User blog not found or unauthorized');
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

    publishBlog = async (filter) => {
        const blog = await Blog.findOne(filter);
        if (!blog) {
            const error = new Error('User blog not found or unauthorized');
            error.statusCode = 404;
            throw error;
        }

        if (blog.state === 'published') {
            const error = new Error('Blog is already published');
            error.statusCode = 400;
            throw error;
        }

        blog.state = 'published';
        await blog.save();
        return blog;
    }

    deleteBlog = async (filter) => {
        const blog = await Blog.findOne(filter);
        if (!blog) {
            const error = new Error('User blog not found or unauthorized');
            error.statusCode = 404;
            throw error;
        }

        await Blog.deleteOne(filter);
        return;
    }
}

export default BlogService 