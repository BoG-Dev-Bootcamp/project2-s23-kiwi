import { allUsers } from "../../../../server/mongodb/actions/user";
import connectDB from "../../../../server/mongodb/index"
import User from "../../../../server/mongodb/models/user";

export default async function handler(req, res) {
    try {
        if (req.method == "GET") {
            await connectDB()
            let [users, last_id] = await allUsers(5)
            let newUsers = null;
            //Gets 5 at a time, however, unsure if to do pagination this way or with different pages 
            while (last_id != null) {
                [newUsers, last_id] = await allUsers(5, last_id);
                users = [...users, ...newUsers]
            }
            return res.status(200).send(logs)
        }
    } catch (e) {
        console.log(e.message)
        return res.status(500).json({ "error": e.message })
    }
    return res.status(500).json({ "error": "an error occurred" })
}