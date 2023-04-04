import mongoose from "mongoose"
import Animal from "../models/animal"

export const createAnimal = async (newAnimalData) => {
    const newAnimal = await new Animal(newAnimalData)
    await newAnimal.save()
}

export const allAnimals = async (page_size, last_id) => {
    let data = null;
    if (last_id == null) {
        data = await Animal.find().limit(page_size)
    } else {
        data = await Animal.find({ '_id': { '$gt': last_id } }).limit(page_size);
    }
    //Check how pagination is supposed to be implemented? is this fine or should I do it with different pages
    if (data[data.length - 1] == null) {
        return [data, null];
    } else {
        last_id = data[data.length - 1]._id
        return [data, last_id];
    }
}