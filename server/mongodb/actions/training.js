import mongoose from "mongoose"
import Training from "../models/training"

export const createTraining = async (newTrainingData) => {
    const newTraining = await new Training(newTrainingData)
    await newTraining.save()
}

export const allTrainingLogs = async (page_size, last_id) => {
    let data = null;
    if (last_id == null) {
        data = await Training.find().limit(page_size)
    } else {
        data = await Training.find({ '_id': { '$gt': last_id } }).limit(page_size);
    }
    //Check how pagination is supposed to be implemented? is this fine or should I do it with different pages
    if (data[data.length - 1] == null) {
        return [data, null];
    } else {
        last_id = data[data.length - 1]._id
        return [data, last_id];
    }
}