import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String
    },
    blogsCount: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

userSchema.virtual('blogs', {
    ref: 'Blog',
    localField: '_id',
    foreignField: 'userId'
});

userSchema.set("toObject", { virtuals: true });
userSchema.set("toJSON", { virtuals: true });


userSchema.pre('save', async function (next) {
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

userSchema.methods.comparePassword = async function (password) {
    bcrypt.compare(password, this.password);
}

export default model("User", userSchema);



