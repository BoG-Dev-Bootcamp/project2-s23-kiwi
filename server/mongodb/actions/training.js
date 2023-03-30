import mongoose from "mongoose"
import Training from "../models/training"

export const createTraining = async (newTrainingData) => {
    try {
        const newTraining = await new Training(newTrainingData)
        await newTraining.save()
    } catch (e) {
        console.log(e.message)
        return false
    }
    return true
} 