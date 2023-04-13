import { use, useRef, useState } from "react";
import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Link from 'next/link'

export default function Logs(cookie) {
    const [page, setPage] = useState(1)
    const [message, setMessage] = useState()
    const [lastId, setLastId] = useState(null)
    async function handleClick() {
        let url = `http://localhost:3000/api/admin/animals?page=${page}`
        if (lastId != null) {
            url = url + `&last_id=${lastId}`
        }
        let logs = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': cookie
            },
        })
        logs = await logs.json()
        if (logs[4] != null) {
            setLastId(logs[4]._id)
        } else {
            setLastId(null)
        }
        setMessage(logs)
        setPage(page + 1)
    }
    let data = "Please Log In";
    if (message != undefined && Array.isArray(message)) {
        data = <div class="displayDB">
            {message.map(el => <div>
                {Object.entries(el).map(
                    ([key, value]) =>
                        <div class="">
                            {key}: {JSON.stringify(value)}
                        </div>
                )}
            </div>
            )}
        </div>

    } else {
        data = <div class="displayDB">{JSON.stringify(message)}</div>
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
                <div class="displayDB">
                    <h1 class="welcomeMessage infoHead">Training Log View</h1>
                    <button class="adminButton" onClick={handleClick}>View Page {page}</button>
                    {data}
                </div>
            </div>
        </div>
    </div>
}

Logs.getInitialProps = async ({ req, res }) => {
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