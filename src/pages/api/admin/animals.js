import { allAnimals } from "../../../../server/mongodb/actions/animal";
import connectDB from "../../../../server/mongodb/index"
import auth from "../../../../server/utils/auth";
export default async function handler(req, res) {
    try {
        if (req.method == "GET") {
            await connectDB()
            if (auth(req).admin == true) {
                const page = req.query.page
                const logs = await allAnimals(5, page)
                return res.status(200).send(logs)
            } return res.status(500).json({ "error": "Need to be Admin to access" })

        }
    } catch (e) {
        return res.status(500).json({ "error": e.message })
    }
    return res.status(500).json({ "error": "an error occurred" })
}