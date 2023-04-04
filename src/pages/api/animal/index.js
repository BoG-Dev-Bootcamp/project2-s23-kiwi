import connectDB from "../../../../server/mongodb/index"
import { createUser } from "../../../../server/mongodb/actions/animal"

export default async function handler(req, res) {
    try {
        if (req.method == "POST") {
            await connectDB()
            if (await createAnimal(req.body) == true) {
                return res.status(200).json({ "success": "created new animal" })
            } else {
                return res.status(400).json({ "error": "did not create new animal" })
            }
        }
    } catch (e) {
        console.log(e.message)
        return res.status(500).json({ "error": e.message })
    }
    return res.status(500).json({ "error": "an error occurred" })
}