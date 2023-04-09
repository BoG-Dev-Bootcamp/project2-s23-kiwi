import mongoose from "mongoose"
import User from "../models/user"
import bcrypt from 'bcryptjs'

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

export const userLogin = async (email, password) => {
    //If email or password is invalid, returns false
    const user = await User.findOne({ email })
    let result = false;
    if (user) {
        result = await bcrypt.compare(password, user.password)
    }
    return result
}

export const userVerify = async (email, password) => {
    //If email or password is invalid, returns null
    const user = await User.findOne({ email })
    let result = false;
    if (user) {
        result = await bcrypt.compare(password, user.password)
        return user
    }
    return null
}