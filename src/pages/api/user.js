import connectDB from "../../../server/mongodb/index"
import { createUser } from "../../../server/mongodb/actions/user"


export default async function handler(req, res) {
    try {
        if (req.method == "POST") {
            await connectDB()
            if (await createUser(req.body) == true) {
                return res.status(200).json({ "success": "created new user" })
            } else {
                return res.status(400).json({ "error": "did not create new user" })
            }
        }
    } catch (e) {
        console.log(e.message)
        return res.status(500).json({ "error": "did not create new user" })
    }
}