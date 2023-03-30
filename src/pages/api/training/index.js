import connectDB from "../../../../server/mongodb/index"
import { createTraining } from "../../../../server/mongodb/actions/training"

export default async function handler(req, res) {
    try {
        if (req.method == "POST") {
            await connectDB()
            if (await createTraining(req.body) == true) {
                return res.status(200).json({ "success": "created new trainingLog" })
            } else {
                return res.status(400).json({ "error": "did not create new trainingLog" })
            }
        }
    } catch (e) {
        console.log(e.message)
        return res.status(500).json({ "error": e.message })
    }
    return res.status(500).json({ "error": "an error occurred" })
}