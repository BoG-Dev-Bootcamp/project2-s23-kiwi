import mongoose from "mongoose";
import user from "./user";
const animalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    hoursTrained: {
        type: Number,
        required: true
    },
    owner: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true
    },
    dateOfBirth: {
        type: Date,
    },
    //Used in Expert Level
    profilePicture: {
        type: String
    }
})

//Checks if model is created, otherwise creates model
export default mongoose.models.Animal || mongoose.model("Animal", animalSchema)