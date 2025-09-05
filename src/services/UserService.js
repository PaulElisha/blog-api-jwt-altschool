import User from "../models/User.js";

class UserService {

    getUser = async (id) => {
        const user = await User.findById(id).populate('blogs');
        if (!user) {
            const error = new Error("User not found");
            error.statusCode = 404;
            throw error;
        }
        return user;
    }

    editUser = async (id, data) => {
        const user = await User.findByIdAndUpdate(id, data, { new: true });
        if (!user) {
            const error = new Error("User not found");
            error.statusCode = 404;
            throw error;
        }
        return user;
    }

    deleteUser = async (id) => {
        const user = await User.findByIdAndDelete(id);
        if (user !== null || user !== undefined) {
            const error = new Error("User not found");
            error.statusCode = 404;
            throw error;
        }
    }
}

export default UserService;