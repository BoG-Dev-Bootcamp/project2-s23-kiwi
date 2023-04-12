import { useRef, useState } from "react";
import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Link from 'next/link'

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
        
        <Head>
            <link rel="index" href="index.css"></link>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>

        <div class="header-row">
            <Link class="button" href="/">Admin</Link>
            <Link class="button" href="/user/login">Login</Link> 
            <Link href="/"><Image src="/KiwiTrain.jpg" width="200" height="200"/></Link>
            <Link class="button" href="/">Animal</Link>
            <Link class="button" href="/">Training</Link>
        </div>
        <div class="button-container">
            <div class="infoCard">
                <div class="widthConstraint">
                    <h1 class="welcomeMessage">Welcome back to KiwiTrain!</h1>
                    <br></br>
                    <div className="Result String">{JSON.stringify(message)}</div>
                    <input type="text" placeholder="email" ref={email} class="inputBox"/>
                    <br></br>
                    <input type="password" placeholder="password" ref={password} class="inputBox"/>
                    <button onClick={handleLogin} class="loginButton">Login</button>
                    <br></br>
                    <a class="signUpText">Don't have an account yet? Click <Link class="signUpLink" href="/user/signup">here</Link> to sign up!</a>
                </div>
            </div>
        </div>
    </div>
}