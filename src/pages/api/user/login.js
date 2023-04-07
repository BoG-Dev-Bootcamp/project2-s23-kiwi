import bcrypt from 'bcryptjs'
import User from '../../../../server/mongodb/models/user'
export default async function handler(req, res) {
    try {
        if (req.method == "POST") {
            //move to actions
            return res.send("Doesn't work")
            console.log("reached")
            const { email, password } = req.body
            console.log(email)
            const user = await User.findOne(email)
            console.log(user)
            const result = await bcrypt.compare(password, user.password)
            return result ? res.status(200).json({ "Success": "Logged in" }) : res.status(403).send({ "error": "Password or email is invalid" })
        }
    } catch (e) {
        return res.status(400).json({ "error": e.message })
    }
    return res.status(500).json({ "error": "an error occurred" })
}