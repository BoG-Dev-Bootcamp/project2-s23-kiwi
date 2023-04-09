import mongoose from "mongoose"
import Animal from "../models/animal"

export const createAnimal = async (newAnimalData, decoded) => {
    newAnimalData.owner = decoded.user._id
    console.log(newAnimalData)
    const newAnimal = await new Animal(newAnimalData)
    await newAnimal.save()
}

export const allAnimals = async (page_size, page) => {
    //Returns animals logs, ordered by object_id
    if (page == 1) {
        return await Animal.find().limit(page_size)
    } else {
        return await Animal.find().limit(page_size).skip(page_size * (page - 1))
    }
}