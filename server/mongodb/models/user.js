import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
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
        required: true
    },
    profilePicture: {
        type: String
    }
})

//Checks if model is created, otherwise creates model
export default mongoose.models.User || mongoose.model("User", userSchema)