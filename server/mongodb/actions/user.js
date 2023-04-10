import mongoose from "mongoose"
import bcrypt from "bcryptjs"
import User from "../models/user"
import connectDB from ".."
export const createUser = async (newUserData) => {
    let password = newUserData.password
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    await connectDB()
    newUserData.password = hash
    const newUser = await new User(newUserData)
    await newUser.save()
}

export const allUsers = async (page_size, page) => {
    //Returns users logs, ordered by object_id
    if (page == 1) {
        return await User.find().select("-password").limit(page_size)
    } else {
        return await User.find().select("-password").limit(page_size).skip(page_size * (page - 1))
    }
}