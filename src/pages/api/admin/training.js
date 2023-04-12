import { allTrainingLogs } from "../../../../server/mongodb/actions/training";
import connectDB from "../../../../server/mongodb/index"

export default async function handler(req, res) {
    try {
        if (req.method == "GET") {
            await connectDB()
            if (auth(req).admin == true) {
                const page = req.query.page
                const logs = await allTrainingLogs(5, page)
                return res.status(200).send(logs)
            } return res.status(500).json({ "error": "Need to be Admin to access" })

        }
    } catch (e) {
        return res.status(500).json({ "error": e.message })
    }
    return res.status(500).json({ "error": "an error occurred" })
}