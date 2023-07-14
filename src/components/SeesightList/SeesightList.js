import { ListGroup, Row } from "react-bootstrap"
import SeesightItem from "./SeesightItem/SeesightItem"
import { useState } from "react"
import SeesightDetailModal from './SeesightDetailModal'

export default function SeesightList({ seesights }) {
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [selectedDetail, setSelectedDetail] = useState(undefined);
    const viewMoreHandle = (detail) => {
        setShowDetailModal(true);
        setSelectedDetail(detail);
    }
    return (
        <>
        <SeesightDetailModal show={showDetailModal} setShow={setShowDetailModal} seesight={selectedDetail}/>
        <Row>
            {(seesights).map((e) => (
                <SeesightItem key={e.id} seesight={e} viewMoreHandle={viewMoreHandle}/>
            ))}
        </Row>
        </>
    )
}
