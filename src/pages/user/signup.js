import { useRef, useState } from "react";
import Link from "next/link";

export default function Login() {
    const firstName = useRef(null)
    const lastName = useRef(null)
    const email = useRef(null)
    const password = useRef(null)
    const profilePicture = useRef(null)
    const [message, setMessage] = useState()
    async function handleSignUp() {
        let body = {
            firstName: firstName.current?.value,
            lastName: email.current?.value,
            email: email.current?.value,
            password: password.current?.value,
        }
        if (profilePicture.current?.value != "") {
            body.profilePicture = profilePicture.current?.value
        }
        const resp = await fetch('http://localhost:3000/api/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...body })
        })
        await fetch('http://localhost:3000/api/user/verify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email.current?.value,
                password: password.current?.value
            })
        })
        const json = await resp.json()
        setMessage(json)
    }

    return <div>
        <div className="Result String">{JSON.stringify(message)}</div>
        <label htmlFor="firstName">First Name</label>
        <input type="text" placeholder="First Name" ref={firstName} id="firstName" />
        <label htmlFor="lastName">Last Name</label>
        <input type="text" placeholder="Last Name" ref={lastName} id="lastName" />
        <label htmlFor="email">Email</label>
        <input type="text" placeholder="email" ref={email} id="email" />
        <label htmlFor="password">Password</label>
        <input type="password" placeholder="password" ref={password} id="password" />
        <label htmlFor="profilePic">Profile Picture</label>
        <input type="text" ref={profilePicture} id="profilePic" />
        <button onClick={handleSignUp}>Sign Up</button>

    </div>
}