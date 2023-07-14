import { Spinner } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';

export default function Loading({ isLoading }) {
  return (
    <>
      <Modal show={isLoading} centered size="sm">
        <Modal.Body className="d-flex align-items-center justify-content-center">
          <div>
            <Spinner variant='primary' role="status" style={{ width: "30vh", height: "30vh", fontSize:'100px' }}/>
            <h2 className="d-flex align-items-center justify-content-center mt-3">Loading...</h2>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};