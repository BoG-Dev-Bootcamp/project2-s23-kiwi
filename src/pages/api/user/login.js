import bcrypt from 'bcryptjs'
import User from '../../../../server/mongodb/models/user'
export default async function handler(req, res) {
    try {
        if (req.method == "POST") {
            const { email, password } = req.body
            const user = await User.findOne(email)
            const result = await bcrypt.compare('password', user.password)
            return result ? res.status(200).send("Logged in") : res.status(403).send("Password or email is invalid")
        }
    } catch (e) {
        return res.status(400).json({ "error": e.message })
    }
    return res.status(500).json({ "error": "an error occurred" })
}