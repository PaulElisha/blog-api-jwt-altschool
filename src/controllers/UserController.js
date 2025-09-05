import UserService from "../services/UserService.js";

class UserController {

    constructor() {
        this.userService = new UserService();
    }
    getUser = async (req, res) => {
        try {
            const response = await this.userService.getUser(req.params.id);
            res.status(200).json({ message: "User fetched successfully", status: "ok", data: response });
        } catch (error) {
            console.error("Error fetching User:", error);
            res.status(500).json({ message: "Internal Server Error", status: "error" });
        }
    }

    editUser = async (req, res) => {
        try {
            const response = await this.userService.editUser(req.params.id, req.body);
            res.status(200).json({ message: "User updated successfully", status: "ok", data: response });
        } catch (error) {
            console.error("Error updating User:", error);
            res.status(500).json({ message: "Internal Server Error", status: "error" });
        }
    }

    deleteUser = async (req, res) => {
        try {
            await this.userService.deleteUser(req.params.id);
            res.status(200).json({ message: "User deleted successfully", status: "ok" });
        } catch (error) {
            console.error("Error deleting User:", error);
            res.status(500).json({ message: "Internal Server Error", status: "error" });
        }
    }
}



export default UserController;