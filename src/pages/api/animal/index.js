import connectDB from "../../../../server/mongodb/index"
import { createAnimal } from "../../../../server/mongodb/actions/animal"
import auth from "../../../../server/utils/auth"

export default async function handler(req, res) {
    try {
        if (req.method == "POST") {
            await connectDB()
            const decoded = auth(req)
            await createAnimal(req.body, decoded)
            return res.status(200).json({ "success": "created new animal" })
        }
    } catch (e) {
        return res.status(400).json({ "error": e.message })
    }
    return res.status(500).json({ "error": "an error occurred" })
}