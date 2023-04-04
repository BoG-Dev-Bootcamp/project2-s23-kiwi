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

export const allUsers = async (page_size, last_id) => {
    let data = null;
    if (last_id == null) {
        data = await User.find().limit(page_size)
    } else {
        data = await User.find({ '_id': { '$gt': last_id } }).limit(page_size);
    }
    // Uses same method of pagination, check!!
    if (data[data.length - 1] == null) {
        return [data, null];
    } else {
        last_id = data[data.length - 1]._id
        return [data, last_id];
    }
}
