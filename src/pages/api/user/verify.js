import connectDB from '../../../../server/mongodb'
import User from '../../../../server/mongodb/models/user'
import { userLogin } from '../../../../server/mongodb/actions/user'
import { sign } from 'jsonwebtoken'
import { serialize } from 'cookie'
export default async function handler(req, res) {
    try {
        if (req.method == "POST") {
            const { email, password } = req.body
            await connectDB()
            const result = await userLogin(email, password)
            if (result) {
                const token = sign({ email: email }, process.env.SECRET, { expiresIn: '60s' })
                const serialized = serialize("OurJWT", token, {
                    httpOnly: true,
                    secure: false,
                    sameSite: "strict",
                    maxAge: 60,
                });
                res.setHeader('Set-Cookie', serialized)
                return res.status(200).send(token)
            } else {
                return res.status(403).send("Password or email is invalid")
            }
        }
    } catch (e) {
        console.log("ERROR")
        console.log(e.message)
        return res.status(400).json({ "error": e.message })
    }
    return res.status(500).json({ "error": "an error occurred" })
}