import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';

export default function SeesightDetailModal({ show, setShow, seesight }) {
  return (
    <>
      {
        !seesight ? <></> :
        <Modal show={show} onHide={() => { setShow(false) }} centered size='lg'>
          <Modal.Body>
            <Card className="text-center">
              <Card.Header><strong>{ seesight.name }</strong></Card.Header>
              <Card.Img variant="top" src={ seesight.image } />
              <Card.Body style={{ width: '100%' }}>
                <Card.Text>
                  { seesight.content }
                </Card.Text>
              </Card.Body>
            </Card>
          </Modal.Body>
        </Modal>
      }
    </>
  );
};