import { useRef, useState } from "react";
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

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
                    <h1 class="welcomeMessage">Welcome to KiwiTrain!</h1>
                    <div class="signUpText">
                        <div className="Result String">{JSON.stringify(message)}</div>
                        <div class="signUpFields">
                            <label htmlFor="firstName">First Name: </label>
                            <input class="signUpBox" type="text" placeholder="First Name" ref={firstName} id="firstName" />
                        </div>

                        <div class="signUpFields">
                            <label htmlFor="lastName">Last Name: </label>
                            <input class="signUpBox" type="text" placeholder="Last Name" ref={lastName} id="lastName" />
                        </div>
                        
                        <br></br>
                        <div class="signUpFields">
                            <label htmlFor="email">Email: </label>
                            <input class="signUpBox" type="text" placeholder="email" ref={email} id="email" />
                        </div>
                        <div class="signUpFields">
                            <label htmlFor="password">Password: </label>
                            <input class="signUpBox" type="password" placeholder="password" ref={password} id="password" />
                        </div>
                        <div class="signUpFields">
                            <label htmlFor="profilePic">Profile Picture: </label>
                            <input class="signUpBox" type="text" ref={profilePicture} id="profilePic" />
                        </div>
                        
                        <br></br>
                        <button onClick={handleSignUp}>Sign Up</button>
                    </div>
                    
                </div>
            </div>
        </div>
        

    </div>
}