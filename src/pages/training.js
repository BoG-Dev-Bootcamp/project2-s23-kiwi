import { useRef, useState } from "react";
import Link from "next/link";
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
        <div classdate="Result String">{JSON.stringify(message)}</div>
        <input type="date" ref={date} id="date" />
        <label htmlFor="description">Description</label>
        <textarea id="description" ref={description} />
        <label htmlFor="hours">Hours</label>
        <input type="number" ref={hours} id="hours" />
        <label htmlFor="animal">Animal</label>
        <input type="text" ref={animal} id="profilePic" />
        <label id="video">Training Log Video</label>
        <input type="text" ref={video} id="video" />
        <button onClick={handleSubmit}>Submit</button>
    </div>
}

// Animal.getInitialProps = async (NextPageContext) => {
//     const cookie = NextPageContext.req?.headers;
//     console.log(cookie)
//     return await cookie.json();
// }

Training.getInitialProps = async ({ req, res }) => {
    return {
        props: {
            token: req.cookies.OurJWT
        }
    }
}