import connectDB from '../../../../server/mongodb'
import User from '../../../../server/mongodb/models/user'
import { userLogin } from '../../../../server/mongodb/actions/user'
export default async function handler(req, res) {
    try {
        if (req.method == "POST") {
            const { email, password } = req.body
            await connectDB()
            const result = await userLogin(email, password)
            return result ? res.status(200).send("Logged in") : res.status(403).send("Password or email is invalid")
        }
    } catch (e) {
        return res.status(400).json({ "error": e.message })
    }
    return res.status(500).json({ "error": "an error occurred" })
}