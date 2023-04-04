import connectDB from "../../../../server/mongodb/index"
import { createUser } from "../../../../server/mongodb/actions/user"

export default async function handler(req, res) {
    try {
        if (req.method == "POST") {
            await connectDB()
            await createUser(req.body)
            return res.status(200).json({ "success": "created new user" })
        }
    } catch (e) {
        return res.status(400).json({ "error": e.message })
    }
    return res.status(500).json({ "error": "an error occurred" })
}