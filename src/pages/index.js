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
        <Link class="button" href="/user/login">Login</Link>
        <Link href="/"><Image src="/KiwiTrain.jpg" width="200" height="200" /></Link>
        <Link class="button" href="/">Animal</Link>
        <Link class="button" href="/">Training</Link>
      </div>
      <div class="button-container">
        <div class="infoCard">
          <div>
            <p><b>Login: </b>
              Allows you to login in or sign up to create new user if
              information is valid. Compares and stores passwords with Bcrypt.
              Issues JWT tokens if succesful</p>
            <p><b>Admin: </b>
              If issued admin access through JWT, allows you to view all users, training logs,
              and animals. Implements pagination with object ids.</p>
            <p><b>Animal: </b>
              If logged in, allows users to add animals that they own. Only creates new animals if
              information is valid.
            </p>
            <p><b>Training: </b>
              If logged in, allows users to create training logs for animals that they own.
              Only works if animal is owned by current user.
            </p>
          </div>
        </div>
      </div>

    </>
  )
}
