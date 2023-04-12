import connectDB from "../../../../server/mongodb/index"
import { createTraining } from "../../../../server/mongodb/actions/training"
import auth from "../../../../server/utils/auth"

export default async function handler(req, res) {
    try {
        if (req.method == "POST") {
            await connectDB()
            const decoded = await auth(req)
            await createTraining(req.body, decoded)
            return res.status(200).json({ "success": "created new trainingLog" })
        }
    } catch (e) {
        if (e.name == "ValidationError")
            return res.status(400).json({ "Validation Error": e.message })
        let statusCode = e.statusCode || 500
        console.log(e)
        return res.status(statusCode).json({ "error": e.message })
    }
    return res.status(500).json({ "error": "an error occurred" })
}