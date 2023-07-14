import { Button, Card } from "react-bootstrap"
import "./SeesightItem.css"

export default function SeesightItem({ seesight, viewMoreHandle }) {
    return (
        <>
            <Card style={{ width: '28vw', height: '30vh', margin: '30px', border: '0px' }}>
                <Card.Img src={seesight.image} alt="Card image" style={{ width: '28vw', height: '30vh', opacity: 0.5}}/>
                <Card.ImgOverlay className="d-flex flex-column">
                    <Card.Title><strong>{ seesight.name }</strong></Card.Title>
                    <Card.Text>
                        {seesight.content?.slice(0, 200) + '...'}
                    </Card.Text>
                    <Button className="align-self-start mt-auto" onClick={()=> { viewMoreHandle(seesight) }}>View more</Button>
                </Card.ImgOverlay>
            </Card>
        </>
    )
}
