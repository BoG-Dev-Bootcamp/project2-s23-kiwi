import mongoose from "mongoose"
import User from "../models/user"

export const createUser = async (newUserData) => {
    try {
        const newUser = await new User(newUserData)
        await newUser.save()
    } catch (e) {
        console.log(e.message)
        return false
    }
    return true
} 