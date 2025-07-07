import jwt from "jsonwebtoken";
import User from "../models/User.js";

class UserAuthorization {
    authorizeUser = async (req, res, next) => {
        const bearerToken = req.headers.authorization;

        if (!bearerToken || !bearerToken.startsWith("Bearer"))
            res.status(401).json({ success: false, message: "Unauthorized access" });

        const token = bearerToken.split(" ")[1];

        if (!token)
            return res.status(401).json({ success: false, message: "Authorization Failed: Invalid token" });


        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id);
            next();
        } catch (error) {
            res.status(401).json({
                success: false,
                error: error.message
            });
        }
    }
}

export { UserAuthorization }