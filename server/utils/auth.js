import { verify } from "jsonwebtoken"

export default function auth(req) {
    const jwt = req.cookies.OurJWT
    console.log(jwt)
    if (!jwt) {
        throw new Error("Please Login first")
    }
    try {
        const decoded = verify(jwt, process.env.SECRET)
        return decoded;
    } catch (e) {
        throw new Error("Login token is invalid, please login again")
    }
} 