import mongoose from "mongoose"
import Animal from "../models/animal"

export const createAnimal = async (newAnimalData) => {
    try {
        const newAnimal = await new Animal(newAnimalData)
        await newAnimal.save()
    } catch (e) {
        console.log(e.message)
        return false
    }
    return true
} 