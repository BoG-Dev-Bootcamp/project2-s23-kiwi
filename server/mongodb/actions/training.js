import mongoose from "mongoose"
import User from "../models/training"

export const createTraining = async (newTrainingData) => {
    try {
        const newTraining = await new User(newTrainingData)
        await newTraining.save()
    } catch (e) {
        console.log(e.message)
        return false
    }
    return true
} 