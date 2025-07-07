import UserService from "../services/UserService.js";

class UserController {

    constructor() {
        this.userService = new UserService();
    }

    getUsers = async (req, res) => {
        try {
            const response = await this.userService.getUsers();
            res.status(200).json({ message: "Users fetched successfully", status: "ok", data: response });
        } catch (error) {
            res.status(404).json({ message: "No users found", status: "error" });
        }
    }

    createUser = async (req, res) => {
        try {
            const response = await this.userService.createUser(req.body);
            res.status(201).json({ message: "User created successfully", status: "ok", data: response });

        } catch (error) {
            console.error("Error creating User:", err);
            res.status(500).json({ message: "Internal Server Error", status: "error" });
        }
    }

    loginUser = async (req, res) => {
        try {
            const { user, token } = await this.userService.loginUser(req.body);
            res.status(200).json({
                success: true, message: "User logged in successfully", data: { user: user, token: token }
            });
        } catch (error) {
            res.status(error.statusCode).json({ success: false, error: error.message });
        }
    }


    updateUser = async (req, res) => {
        try {
            const response = await this.userService.updateUser(req.params.id, req.body);
            res.status(200).json({ message: "User updated successfully", status: "ok", data: response });
        } catch (error) {
            console.error("Error updating User:", error);
            res.status(500).json({ message: "Internal Server Error", status: "error" });
        }
    }

    deleteUser = async (req, res) => {
        try {
            const response = await this.userService.deleteUser(req.params.id);
            res.status(200).json({ message: "User deleted successfully", status: "ok" });
        } catch (error) {
            console.error("Error deleting User:", error);
            res.status(500).json({ message: "Internal Server Error", status: "error" });
        }
    }
}



export default UserController;