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
    }

    getUserBlogsByState = async (query, userId) => {
        const { state } = query;
        let blogs = await Blog.find(userId);

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
        if (blogs.length === 0) {
            const error = new Error('No blogs found');
            error.statusCode = 404;
            throw error;
        }
        return blogs;
    }

    getBlogs = async () => {
        let blogs = await Blog.find({});

        blogs = blogs.filter(blog => blog.state === 'published').populate('userId').sort({ createdAt: -1 });
        if (blogs.length === 0) {
            const error = new Error('No published blogs found');
            error.statusCode = 404;
            throw error;
        }
        return blogs;
    }

    getBlog = async (blogId) => {
        const blog = await Blog.findById(blogId).populate('comments');

        if (!blog) {
            const error = new Error('Blog not found');
            error.statusCode = 404;
            throw error;
        }

        return blog;
    }

    updateBlog = async (filter, updateData) => {
        const { userId, } = filter;
        const blog = await Blog.findOne(filter);
        if (!blog) {
            const error = new Error('Blog not found or unauthorized');
            error.statusCode = 404;
            throw error;
        }


        if (blog.userId._id.toString() !== userId.toString()) {
            const error = new Error('Not allowed to update this blog');
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
        const { userId, } = filter;
        const blog = await Blog.findOne(filter);
        if (!blog) {
            const error = new Error('Blog not found or unauthorized');
            error.statusCode = 404;
            throw error;
        }

        if (blog.userId._id.toString() !== userId.toString()) {
            const error = new Error('Not allowed to delete this blog');
            error.statusCode = 404;
            throw error;
        }

        await Blog.deleteOne(filter);
        return;
    }
}

export default BlogService 