import mongoose from "mongoose";

const trainingSchema = new mongoose.Schema({
    _id: {
        type: ObjectId,
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
        type: number,
        required: true
    },
    animal: {
        type: ObjectId,
        required: true
    },
    user: {
        type: ObjectId,
        required: ObjectId
    },
    // Used in Expert level
    trainingLogVideo: {
        type: String,
        required: false
    }
})

//Checks if model is created, otherwise creates model
export default mongoose.models.Training || mongoose.model("Training", trainingSchema)