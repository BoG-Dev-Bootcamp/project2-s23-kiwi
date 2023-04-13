import { use, useRef, useState } from "react";
import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Link from 'next/link'

export default function index() {
    return (
        <>
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
            <div>
                <h2>Which Page Do You Want to See</h2>
                <Link class="button" href="/admin/user">Users</Link>
                <Link class="button" href="/admin/animal">Animals</Link>
                <Link class="button" href="/admin/training">Training Logs</Link>
            </div>
        </>
    )
}