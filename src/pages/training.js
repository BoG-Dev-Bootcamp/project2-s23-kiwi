import { useRef, useState } from "react";
import Link from "next/link";
import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'

export default function Training(token) {
    const cookie = token.props.token
    const date = useRef(null)
    const description = useRef(null)
    const hours = useRef(null)
    const animal = useRef(null)
    const video = useRef(null)
    const [message, setMessage] = useState()
    async function handleSubmit() {
        let body = {
            date: date.current?.value,
            description: description.current?.value,
            hours: hours.current?.value,
            animal: animal.current?.value,
        }
        if (video.current?.value != "") {
            body.trainingLogVideo = trainingLogVideo.current?.value
        }
        const resp = await fetch('http://localhost:3000/api/training', {
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
            <Link href="/"><Image src="/KiwiTrain.jpg" width="200" height="200" /></Link>
            <Link class="button" href="/animal">Animal</Link>
            <Link class="button" href="/training">Training</Link>
        </div>

        <div class="button-container">
            <div class="infoCard">
                <div class="widthConstraint">
                    <div class="signUpText">
                        <h1 class="welcomeMessage">Tell us about your training plan!</h1>
                        <div class="signUpFields">
                            <label htmlFor="data">Date: </label>
                            <input class="signUpBox" type="date" ref={date} id="date" />
                        </div>
                        <div class="signUpFields">
                            <label htmlFor="description">Description:</label>
                            <textarea class="signUpBox" id="description" ref={description} />
                        </div>
                        <div class="signUpFields">
                            <label htmlFor="hours">Hours:</label>
                            <input class="signUpBox" type="number" ref={hours} id="hours" />
                        </div>
                        <div class="signUpFields">
                            <label htmlFor="animal">Animal:</label>
                            <input class="signUpBox" type="text" ref={animal} id="profilePic" />
                        </div>
                        <div class="signUpFields">
                            <label id="video">Training Log Video:</label>
                            <input class="signUpBox" type="text" ref={video} id="video" />
                        </div>
                        <br></br>
                        <button onClick={handleSubmit}>Submit</button>
                    </div>
                    <div class="errorText">{JSON.stringify(message)}</div>
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

Training.getInitialProps = async ({ req, res }) => {
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