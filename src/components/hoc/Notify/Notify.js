import Modal from 'react-bootstrap/Modal';
import { BiSolidCheckCircle, BiSolidXCircle } from "react-icons/bi"
import { IconContext } from "react-icons";

export default function Notify({ show, message, isSuccess }) {
  return (
    <>
      <Modal show={show} centered size={ !message ? 'sm' : message.length < 30 ? 'lg' : 'xl' }>
        <Modal.Body className="d-flex align-items-center justify-content-center">
          <div>
            <IconContext.Provider value={{ color: isSuccess ?"green" : "red" }}>
              <div>
                {
                  isSuccess ?
                  <BiSolidCheckCircle role="status" style={{ width: "30vh", height: "30vh" }}/>
                  :
                  <BiSolidXCircle role="status" style={{ width: "30vh", height: "30vh" }}/>
                }
              </div>
            </IconContext.Provider>;
            <h2 className="d-flex align-items-center justify-content-center">{message || (isSuccess ? 'SUCCESS' : 'ERROR')}</h2>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};