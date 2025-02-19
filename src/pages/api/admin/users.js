import { allUsers } from "../../../../server/mongodb/actions/user";
import connectDB from "../../../../server/mongodb/index"
import User from "../../../../server/mongodb/models/user";
import auth from "../../../../server/utils/auth";
export default async function handler(req, res) {
    try {
        if (req.method == "GET") {
            await connectDB()
            let admin = auth(req)
            if (auth(req).admin == true) {
                const page = req.query.page
                const last_id = req.query.last_id
                const data = await allUsers(5, page, last_id)
                return res.status(200).json(data)
            } return res.status(500).json({ "error": "Need to be Admin to access" })
        }
    } catch (e) {
        return res.status(500).json({ "error": e.message })
    }
    return res.status(500).json({ "error": "an error occurred" })
}