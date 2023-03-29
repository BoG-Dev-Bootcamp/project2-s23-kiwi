import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    _id: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
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
        required: true
    },
    //Only used in level 3 and beyond
    password: {
        type: String,
    },
    profilePicture: {
        type: String
    }
})

export default mongoose.model("User", userSchema)