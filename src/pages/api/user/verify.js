import connectDB from '../../../../server/mongodb'
import { userVerify } from '../../../../server/mongodb/actions/user'
import { sign } from 'jsonwebtoken'
import { serialize } from 'cookie'
export default async function handler(req, res) {
    try {
        if (req.method == "POST") {
            const { email, password } = req.body
            await connectDB()
            const user = await userVerify(email, password)
            if (user != null) {
                const token = sign({ user, admin: true }, process.env.SECRET, { expiresIn: '360s' })
                const serialized = serialize("OurJWT", token, {
                    httpOnly: true,
                    secure: false,
                    sameSite: "strict",
                    maxAge: 360,
                    path: '/'
                });
                res.setHeader('Set-Cookie', serialized)
                return res.status(200).json({ "Success": "User verified" })
            } else {
                return res.status(403).json({ "error": "Password or email is invalid" })
            }
        }
    } catch (e) {
        return res.status(500).json({ "error": e.message })
    }
    return res.status(500).json({ "error": "an error occurred" })
}