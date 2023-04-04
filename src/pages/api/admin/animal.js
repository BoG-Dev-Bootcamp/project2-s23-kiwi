import { allAnimals } from "../../../../server/mongodb/actions/animal";
import connectDB from "../../../../server/mongodb/index"
import Animal from "../../../../server/mongodb/models/user";

export default async function handler(req, res) {
    try {
        if (req.method == "GET") {
            await connectDB()
            let [animals, last_id] = await allAnimals(5)
            let newAnimals = null;
            //Gets 5 at a time, however, unsure if to do pagination this way or with different pages 
            while (last_id != null) {
                [newAnimals, last_id] = await allAnimals(5, last_id);
                animals = [...animals, ...newAnimals]
            }
            return res.status(200).send(logs)
        }
    } catch (e) {
        console.log(e.message)
        return res.status(500).json({ "error": e.message })
    }
    return res.status(500).json({ "error": "an error occurred" })
}