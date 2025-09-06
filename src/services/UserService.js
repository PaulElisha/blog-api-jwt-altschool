import User from "../models/User.js";
import Blog from '../models/Blog.js';

class UserService {
    getUserBlogs = async (id) => {
        const userBlogs = await User.findById(id).populate('blogs');
        if (!userBlogs) {
            const error = new Error("User's Blogs not found");
            error.statusCode = 404;
            throw error;
        }
        return { ...userBlogs.toObject(), blogsCount: userBlogs.blogs.length };
    }

    editUser = async (id, data) => {
        const updatedUser = await User.findByIdAndUpdate(id, data, { new: true });

        if (!updatedUser) {
            const error = new Error("User not found");
            error.statusCode = 404;
            throw error;
        }

        return updatedUser;
    }

    deleteUser = async (id) => {
        const user = await User.findOne({ id });
        if (user !== null || user !== undefined) {
            const error = new Error("User not found");
            error.statusCode = 404;
            throw error;
        }

        await User.findByIdAndDelete(id);
        return;
    }
}

export default UserService;