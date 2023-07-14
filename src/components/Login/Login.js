import LoginForm from "./LoginForm/LoginForm"
import "./Login.css"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { login, register } from "../../helper/auth"
import { LOGIN } from "../../store/actions"

function Login(props) {
    const token = useSelector(state => state.token)
    const history = useHistory()
    const dispatch = useDispatch()
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)

    useEffect(() => {
        if (token) {
            return history.push('/')
        }
        
        if (props.location.state?.errorMsg) {
            setError(props.location.state?.errorMsg.toString())
        }
    }, [props.location.state?.errorMsg, token, history])
    
    const loginHandle = async (email, password) => {
        try {
            const result = await login({ email, password })
            dispatch({type: LOGIN, token: result.token, user: result.user})
            history.push('/')
        } catch (err) {
            if (err.toString() === 'TypeError: Failed to fetch') {
                return setError("Can't connect to server")
            }
            return setError(err.toString())
        }
    }

    const registerHandle = async (email, password, name) => {
        try {
            await register({ email, password, name });
            setSuccess('Register success');
        } catch (err) {
            if (err.toString() === 'TypeError: Failed to fetch') {
                return setError("Can't connect to server")
            }
            return setError(err.toString())
        }
    }

    return (
        <div className="Login">
            {<LoginForm loginHandle={loginHandle} registerHandle={registerHandle} errorHandle={{error, setError}} successHandle={{success, setSuccess}}/>}
        </div>
    )
}

export default Login
