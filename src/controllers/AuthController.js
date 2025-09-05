import AuthService from "../services/UserService.js";

class AuthController {

    constructor() {
        this.authService = new AuthService();
    }

    registerUser = async (req, res) => {
        try {
            const response = await this.authService.registerUser(req.body);
            res.status(201).json({ message: "User created successfully", status: "ok", data: response });

        } catch (error) {
            console.error("Error creating User:", err);
            res.status(500).json({ message: "Internal Server Error", status: "error" });
        }
    }

    loginUser = async (req, res) => {
        try {
            const { user, token } = await this.authService.loginUser(req.body);
            res.status(200).json({
                success: true, message: "User logged in successfully", data: { user: user, token: token }
            });
        } catch (error) {
            res.status(error.statusCode).json({ success: false, error: error.message });
        }
    }
}



export default AuthController;