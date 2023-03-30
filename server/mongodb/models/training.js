import mongoose from "mongoose";

const trainingSchema = new mongoose.Schema({
    _id: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    hours: {
        type: Number,
        required: true
    },
    animal: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    // Used in Expert level
    trainingLogVideo: {
        type: String,
        required: false
    }
})

//Checks if model is created, otherwise creates model
export default mongoose.models.Training || mongoose.model("Training", trainingSchema)