import { useState } from 'react';
import { Card, Form, Col, Row, Button } from 'react-bootstrap';
import "./UserProfile.css"
import ChangePasswordModal from './ChangePasswordModal/ChangePasswordModal';
import { useDispatch } from 'react-redux';
import { SAVEUSER } from "../../store/actions"

export default function UserProfile({ user, loadingService, apiService, notifyService }) {
  const dispatch = useDispatch();
  const [formValue, setFormValue] = useState(user);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);

  const updateUserProfile = async () => {
    loadingService.startLoading();
    const body = { ...formValue };
    delete body.email;
    delete body.password;
    apiService.post('/user/update', body)
    .then((res) => {
      dispatch({type: SAVEUSER, user: res});
      notifyService.success('Update success');
    })
    .catch((err) => {
      notifyService.error(err);
    })
    .finally(() => {
      loadingService.stopLoading();
    });
  }

  const changePassword = () => {
    setShowChangePasswordModal(true);
  }
  return (
    <div>
      <Card>
        <Card.Img className='wallpaper' variant="top" src="https://static1.squarespace.com/static/5fe4caeadae61a2f19719512/5fe5c3a9d85eb525301180ed/5ff082ae17af6f5d1930e6bf/1610530333403/Wallpaper+engine+4k.png?format=1500w" />
        <Card.Body className='card-body'>
          <Card.Text>
            <h1>User profile</h1>
          </Card.Text>
          <Card.Text>
            <Form>
              <Form.Group as={Row} className="mb-3" controlId="formEmail">
                <Form.Label column sm="2">
                  Email
                </Form.Label>
                <Col sm="10">
                  <Form.Control plaintext readOnly defaultValue={formValue.email} />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="formName">
                <Form.Label column sm="2">
                  Name
                </Form.Label>
                <Col sm="10">
                  <Form.Control type="name" placeholder="Name" value={formValue.name} onChange={(event) => { setFormValue({ ...formValue, name: event.target.value }) }}/>
                </Col>
              </Form.Group>
            </Form>
          </Card.Text>
          <Card.Text>
            <Button className='me-2 mt-5' onClick={updateUserProfile}>Save change</Button>
            <Button className='me-2 mt-5' onClick={changePassword}>Change password</Button>
          </Card.Text>
        </Card.Body>
      </Card>
      <ChangePasswordModal show={showChangePasswordModal} setShow={setShowChangePasswordModal} notifyService={notifyService} apiService={apiService} loadingService={loadingService}/>
    </div>
  );
}