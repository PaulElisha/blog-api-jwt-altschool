import { fileURLToPath } from "url";
import { dirname, join } from "path";
import User from "../models/User.js";

class UserController {
    constructor() {
        this.__path = fileURLToPath(import.meta.url);
        this.__dirname = dirname(this.__path);
        this.port = process.env.port;
        this.filePath = join(this.__dirname, "../db/Users.json");
    }

    getUsers = async (req, res) => {
        User.find({}).then((Users) => {
            res.status(200).json(Users);
        }
        ).catch((err) => {
            console.error("Error fetching Users:", err);
            res.status(500).json({ message: "Internal Server Error" });
        });
    }

    getUserById = async (req, res) => {

        User.findById(req.params.id).then((User) => {
            if (!User) {
                res.status(404).json({ message: "User not found" });
                return;
            }
            res.status(200).json(User)
        }).catch((err) => {
            console.error("Error fetching User:", err);
            res.status(500).json({ message: "Internal Server Error" });
        })
    }

    postUser = async (req, res) => {

        User.create(req.body)
            .then((User) => {
                res.status(201).json({ message: "User created successfully", status: "ok" });
            })
            .catch((err) => {
                console.error("Error creating User:", err);
                res.status(500).json({ message: "Internal Server Error" });
            }
            );
    }

    updateUser = async (req, res) => {


        User.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .then((User) => {
                if (!User) {
                    res.status(404).json({ message: "User not found" });
                    return;
                }
                res.status(200).json({ User });
            })
            .catch((err) => {
                console.error("Error updating User:", err);
                res.status(500).json({ message: "Internal Server Error" });
            });
    }

    deleteUser = async (req, res) => {

        User.findByIdAndDelete(req.params.id)
            .then(() => {
                res.status(200).json({ message: "User deleted successfully" });
            })
            .catch((err) => {
                console.error("Error updating User:", err);
                res.status(500).json({ message: "Internal Server Error" });
            });
    }
}



export default UserController;