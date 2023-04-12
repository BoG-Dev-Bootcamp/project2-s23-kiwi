import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <link rel="index" href="index.css"></link>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div class="header-row">
        <Link class="button" href="/">Admin</Link>
        <Link class="button" href="/">Login</Link> 
        <Link href="/"><Image src="/KiwiTrain.jpg" width="200" height="200"/></Link>
        <Link class="button" href="/">Animal</Link>
        <Link class="button" href="/">Training</Link>
      </div>
      <div class="button-container">
        <div class="infoCard">

        </div>
      </div>

    </>
  )
}
