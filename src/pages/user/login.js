import { useRef, useState } from "react";
import Link from "next/link";

export default function Login() {
    const email = useRef(null)
    const password = useRef(null)
    const [message, setMessage] = useState()
    async function handleLogin() {
        const resp = await fetch('http://localhost:3000/api/user/verify', {
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
        <input type="text" placeholder="email" ref={email} />
        <input type="password" placeholder="password" ref={password} />
        <button onClick={handleLogin}>Login</button>
    </div>
}