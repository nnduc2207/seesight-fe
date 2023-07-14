import { useState } from "react"
import { useEffect } from "react"
import { Container } from "react-bootstrap"
import SeesightList from "../SeesightList/SeesightList"

export default function Home({ apiService, notifyService }) {
    const [seesights, setSeesights] = useState(undefined);
    useEffect(() => {
        if(!seesights) {
            apiService.get('/seesight/all')
            .then((res) => {
                setSeesights(res);
            })
            .catch((err) => {
                notifyService.error(err);
            });
        }
    },[])

    return (
        <div className="d-flex align-items-center justify-content-center">
            <Container fluid>
                { seesights ? <SeesightList seesights={seesights}/> : <></> }
            </Container>
        </div>
    )
}

