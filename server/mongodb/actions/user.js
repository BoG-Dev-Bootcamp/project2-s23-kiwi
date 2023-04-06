import mongoose from "mongoose"
import User from "../models/user"

export const createUser = async (newUserData) => {
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