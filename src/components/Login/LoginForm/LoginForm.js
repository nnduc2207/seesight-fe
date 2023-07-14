import { useState } from "react"
import { Button, Form, Alert } from "react-bootstrap"
import { BsArrowRightCircle } from "react-icons/bs"

function LoginForm({ loginHandle, registerHandle, errorHandle, successHandle }) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [isRegister, setIsRegister] = useState(false)
    const { error, setError } = errorHandle;
    const { success, setSuccess } = successHandle;

    return (
        <div>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}
            <h1>{ isRegister ? 'REGISTER' : 'LOGIN' }</h1>
            <Form>
                <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>

                {
                isRegister ?                
                <Form.Group className="mb-3" controlId="formName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="name"
                        placeholder="Enter name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </Form.Group>
                : null
                }

                <Button className="me-2" onClick={() => {setError(null); setSuccess(null); isRegister ? registerHandle(email, password, name) : loginHandle(email, password)}}>Enter</Button>
                <Button className="me-2" onClick={() => {setIsRegister(!isRegister); setError(null); setSuccess(null)}}>
                    <BsArrowRightCircle className="me-2" />
                    {!isRegister ? 'Go to Register' : 'Go to Login'}
                </Button>
            </Form>
        </div>
    )
}

export default LoginForm
