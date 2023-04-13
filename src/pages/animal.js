import { useRef, useState } from "react";
import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Link from 'next/link'

export default function Animal(token) {
    const cookie = token.props.token
    const name = useRef(null)
    const hoursTrained = useRef(null)
    const dateOfBirth = useRef(null)
    const profilePicture = useRef(null)
    const [message, setMessage] = useState()
    async function handleSubmit() {
        let body = {
            name: name.current?.value,
            hoursTrained: hoursTrained.current?.value,
        }
        if (profilePicture.current?.value != "") {
            body.profilePicture = profilePicture.current?.value
        }
        if (dateOfBirth.current?.value != "") {
            body.dateOfBirth = dateOfBirth.current?.value
        }
        const resp = await fetch('http://localhost:3000/api/animal', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': cookie
            },
            body: JSON.stringify({ ...body })
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
            <Link class="button" href="/admin">Admin</Link>
            <Link class="button" href="/user/login">Login</Link> 
            <Link href="/"><Image src="/KiwiTrain.jpg" width="200" height="200"/></Link>
            <Link class="button" href="/animal">Animal</Link>
            <Link class="button" href="/training">Training</Link>
        </div>
        
        <div class="button-container">
            <div class="infoCard">
                <div class="widthConstraint">
                    <div>
                        <div class="signUpText">
                        <h1 class="welcomeMessage">Let's get to know your animal!</h1>
                        <br></br>
                        <div class="signUpFields">
                            <label htmlFor="name">Animal Name: </label>
                            <input class="signUpBox" type="text" placeholder="Animal Name" ref={name} id="name" />
                        </div>
                        <div class="signUpFields">
                            <label htmlFor="hours">Hours Trained: </label>
                            <input class="signUpBox" type="text" placeholder="Hours Trained" ref={hoursTrained} id="hoursTrained" />
                        </div>
                        <div class="signUpFields">
                            <label htmlFor="DOB">Date of Birth: </label>
                            <input class="signUpBox" type="text" placeholder="Date of Birth" ref={dateOfBirth} id="email" />
                        </div>
                        <div class="signUpFields">
                            <label id="profilePic">Profile Picture</label>
                            <input class="signUpBox" type="text" ref={profilePicture} id="profilePic" />
                        </div>
                        <button onClick={handleSubmit}>Submit</button>
                        <div class="errorText">{JSON.stringify(message)}</div>
                    </div>
                </div>
                </div>
            </div>
        </div>

       
    </div>
}

// Animal.getInitialProps = async (NextPageContext) => {
//     const cookie = NextPageContext.req?.headers;
//     console.log(cookie)
//     return await cookie.json();
// }

Animal.getInitialProps = async ({ req, res }) => {
    let token = null;
    if (req != undefined) {
        token = req.cookies.OurJWT
    }
    return {
        props: {
            token
        }
    }
}