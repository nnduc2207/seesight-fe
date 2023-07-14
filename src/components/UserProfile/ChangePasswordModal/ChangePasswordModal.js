import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

export default function ChangePasswordModal({ show, setShow, apiService, notifyService, loadingService }) {
  const handleClose = () => setShow(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const changePassword = () => {
    loadingService.startLoading();
    apiService.post('/user/change-password', {
      oldPassword,
      newPassword,
    })
    .then((res) => {
      loadingService.stopLoading();
      notifyService.success();
      handleClose();
    })
    .catch((err) => {
      console.log(err);
      loadingService.stopLoading();
      notifyService.error(err.toString());
    })
  }

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Change password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="oldPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Your current password"
                autoFocus
                value={oldPassword}
                onChange={(event) => { setOldPassword(event.target.value) }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="newPassword">
              <Form.Label>New password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Your new password"
                value={newPassword}
                onChange={(event) => { setNewPassword(event.target.value) }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={changePassword}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};