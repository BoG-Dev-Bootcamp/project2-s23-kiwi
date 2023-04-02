import { allTrainingLogs } from "../../../../server/mongodb/actions/training";
import connectDB from "../../../../server/mongodb/index"
import Training from "../../../../server/mongodb/models/training";

export default async function handler(req, res) {
    try {
        if (req.method == "GET") {
            await connectDB()
            return res.status(200).send(await allTrainingLogs(5))
        }
    } catch (e) {
        console.log(e.message)
        return res.status(500).json({ "error": e.message })
    }
    return res.status(500).json({ "error": "an error occurred" })
}