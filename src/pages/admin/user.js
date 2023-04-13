import { use, useRef, useState } from "react";

export default function Users(cookie) {
    const [page, setPage] = useState(1)
    const [message, setMessage] = useState()
    const [lastId, setLastId] = useState(null)
    async function handleClick() {
        let url = `http://localhost:3000/api/admin/users?page=${page}`
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

    return <div>
        <button onClick={handleClick}>View Page {page}</button>
        <div>{JSON.stringify(message)}</div>
    </div>
}

Users.getInitialProps = async ({ req, res }) => {
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