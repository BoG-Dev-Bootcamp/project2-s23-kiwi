import { allUsers } from "../../../../server/mongodb/actions/user";
import connectDB from "../../../../server/mongodb/index"
import User from "../../../../server/mongodb/models/user";

export default async function handler(req, res) {
    try {
        if (req.method == "GET") {
            await connectDB()
            let [logs, last_id] = await allUsers(5)
            let newLogs = null;
            //Gets 5 at a time, however, unsure if to do pagination this way or with different pages 
            while (last_id != null) {
                [newLogs, last_id] = await allUsers(5, last_id);
                logs = [...logs, ...newLogs]
            }
            return res.status(200).send(logs)
        }
    } catch (e) {
        console.log(e.message)
        return res.status(500).json({ "error": e.message })
    }
    return res.status(500).json({ "error": "an error occurred" })
}