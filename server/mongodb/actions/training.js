import mongoose from "mongoose"
import Training from "../models/training"
import Animal from "../models/animal"
export const createTraining = async (newTrainingData, decoded) => {
    let animal = newTrainingData.animal
    let user = decoded.user._id
    animal = (await Animal.findById(animal))
    if (animal && animal.owner == user) {
        newTrainingData.user = user;
        const newTraining = await new Training(newTrainingData)
        await newTraining.save()
    } else {
        throw new Error("Animal in training log does not have the owner specified in training log")
    }
}

export const allTrainingLogs = async (page_size, page) => {
    //Returns Training logs, ordered by object_id
    if (page == 1) {
        return await Training.find().limit(page_size)
    } else {
        return await Training.find().limit(page_size).skip(page_size * (page - 1))
    }
}