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

export const allUsers = async (page_size, page, last_id) => {
    //Returns users logs, ordered by object_id
    //if last_id is not given:
    if (last_id == null) {
        if (page == 1) {
            return await User.find().select("-password").limit(page_size)
        } else {
            return await User.find().select("-password").limit(page_size).skip(page_size * (page - 1))
        }
    } else {
        return await User.find({ '_id': { '$gt': last_id } }).limit(page_size)
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
    let user = await User.findOne({ email })
    let result = false;
    if (user) {
        result = await bcrypt.compare(password, user.password);
        if (result) {
            return user;
        }
    }
    return null
}