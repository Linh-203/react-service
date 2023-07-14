import mongoose from "mongoose";
const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: "https://lh5.googleusercontent.com/x14nnYSvR1c8KkO6Kj1giR4iZcQL0UelyqcGBRFt8fHQg8sRUouMkFc3b_F-kmDLDW-qpDo8KkBpuXGnfUNjy6NZVqwAcBYnngbupNd2scJqGyNpjYTGQZdfY3ktqFJZNsKfXR-YrDmqrcQwOrM4k2M"
    },
    role: {
        type: String,
        default: "member",
    }



}, { timestamps: true, versionKey: false });

export default mongoose.model("User", userSchema)