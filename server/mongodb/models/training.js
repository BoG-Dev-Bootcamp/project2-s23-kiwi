import mongoose from "mongoose";

const trainingSchema = new mongoose.Schema({
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
        ref: 'Animal',
        required: true
    },
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
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