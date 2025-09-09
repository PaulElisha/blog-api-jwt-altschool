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
            const error = new Error(`No ${state} blogs found for this user`);
            error.statusCode = 404;
            throw error;
        }
        return blogs;
    }

    getBlogs = async () => {
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 20;
        const skip = (page - 1) * limit;

        let blogs = await Blog.find({ state: 'published' }).populate('userId', 'firstName').sort({ createdAt: -1 }).skip(skip).limit(limit);

        const [totalCount, publishedCount, draftCount] = await Promise.all([blogs.countDocuments(), blogs.countDocuments({ status: 'published' }), blogs.countDocuments({ status: 'draft' })]);

        if (blogs.length === 0) {
            const error = new Error('No published blogs found');
            error.statusCode = 404;
            throw error;
        }
        return {
            blogs, page, totalPages: Math.ceil(totalCount / limit), totalCount, counts: { all: totalCount, published: publishedCount, draft: draftCount }
        };
    }

    getFeedBlogBySlug = async (slug) => {
        const blogWithComments = await Blog.findOneAndUpdate({ slug, state: 'published' }, { $inc: { readCount: 1 } }, { new: true }).populate('comments', 'userId content').lean();

        if (!blogWithComments) {
            const error = new Error('Blog not found');
            error.statusCode = 404;
            throw error;
        }

        const { comments, ...blog } = blogWithComments;

        return { comments, blog, commentCount: comments.length };
    }

    getBlogsByTag = async (tag) => {
        const blogs = await Blog.find({ tags: { $exists: true, $ne: [] }, state: 'published' }).populate('userId', 'firstName').sort({ createdAt: -1 });

        if (blogs.length === 0) {
            const error = new Error(`No published blogs found with tag: ${tag}`);
            error.statusCode = 404;
            throw error;
        }

        return blogs;
    }

    getMostReadBlogs = async () => {
        const blogs = await Blog.find({ state: 'published' }).sort({ readCount: -1 }).limit(10).populate('userId', 'firstName');

        if (blogs.length === 0) {
            const error = new Error('No published blogs found');
            error.statusCode = 404;
            throw error;
        }

        return blogs;
    }

    editBlog = async (filter, updateData) => {
        const updatedBlog = await Blog.findOneAndUpdate(filter, updateData, { new: true });

        if (!updatedBlog) {
            const error = new Error('Product update failed');
            error.statusCode = 500;
            throw error;
        }

        return updatedBlog;
    }

    publishBlog = async (filter) => {
        const blog = await Blog.findOneAndUpdate(filter, { $set: { state: 'published' } }, { new: true });
        if (!blog) {
            const error = new Error('User blog not found or unauthorized');
            error.statusCode = 404;
            throw error;
        }

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