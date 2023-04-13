import { useRef, useState } from "react";
import Link from "next/link";
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
        <div className="Result String">{JSON.stringify(message)}</div>
        <input type="text" placeholder="Animal Name" ref={name} id="name" />
        <input type="text" placeholder="Hours Trained" ref={hoursTrained} id="hoursTrained" />
        <input type="text" placeholder="Date of Birth" ref={dateOfBirth} id="email" />
        <label id="profilePic">Profile Picture</label>
        <input type="text" ref={profilePicture} id="profilePic" />
        <button onClick={handleSubmit}>Submit</button>
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