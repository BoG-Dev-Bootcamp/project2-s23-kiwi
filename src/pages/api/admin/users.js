import { allUsers } from "../../../../server/mongodb/actions/user";
import connectDB from "../../../../server/mongodb/index"
import User from "../../../../server/mongodb/models/user";

export default async function handler(req, res) {
    try {
        if (req.method == "GET") {
            await connectDB()
            const page = req.query.page
            const logs = await allUsers(5, page)
            return res.status(200).send(logs)
        }
    } catch (e) {
        console.log(e.message)
        return res.status(500).json({ "error": e.message })
    }
    return res.status(500).json({ "error": "an error occurred" })
}