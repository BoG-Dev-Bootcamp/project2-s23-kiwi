import mongoose from "mongoose"
import User from "../models/user"

export const createUser = async (newUserData) => {
    const newUser = await new User(newUserData)
    await newUser.save()
} 