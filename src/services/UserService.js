import User from "../models/User.js";
import { generateUserToken } from "../utils/generateToken.js";

class UserService {

    createUser = async (data) => {
        const foundOne = await User.findOne({ email: data.email });
        if (foundOne) {
            const error = new Error("User with this email already exists");
            error.statusCode = 400;
            throw error;
        }
        const user = await User.create(data);
        if (!user) {
            const error = new Error("User creation failed");
            error.statusCode = 500;
            throw error;
        }
        const token = this.generateUserToken(user);
        return { user, token };
    }

    loginUser = async (data) => {
        const user = await User.findOne({ email: data.email });
        if (!user) {
            const error = new Error('User does not exist');
            error.statusCode = 404;
            throw error;
        }

        user.comparePassword(data.password, (err, isMatch) => {
            if (err || !isMatch) {
                const error = new Error('Invalid email or password');
                error.statusCode = 401;
                throw error
            }
        });

        const token = this.generateUserToken(user);
        return { user, token };
    }

    getUsers = async () => {
        const users = await User.find({});
        if (users.length === 0) {
            const error = new Error("No users found");
            error.statusCode = 404;
            throw error;
        }
        return users;
    }

    updateUser = async (id, data) => {
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