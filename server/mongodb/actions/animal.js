import mongoose from "mongoose"
import Animal from "../models/animal"

export const createAnimal = async (newAnimalData, decoded) => {
    newAnimalData.owner = decoded.user._id
    const newAnimal = await new Animal(newAnimalData)
    await newAnimal.save()
}

export const allAnimals = async (page_size, page, last_id) => {
    //Returns animals logs, ordered by object_id
    //if last_id is not given:
    if (last_id == null) {
        if (page == 1) {
            return await Animal.find()
                .populate({ path: 'owner', select: '-password' })
                .limit(page_size)
        } else {
            return await Animal.find()
                .populate({ path: 'owner', select: '-password' })
                .limit(page_size).skip(page_size * (page - 1))
        }
    } else {
        return await Animal.find({ '_id': { '$gt': last_id } }
            .populate({ path: 'owner', select: '-password' })
            .limit(page_size))
    }
}