import { useState } from "react";
import axios from 'axios';
const Login = (props) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
// submit user to DB
    const submitForm = (e) => {
        e.preventDefault()
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/login`, {
          email, password
        })
        .then((response) => {
            // console.log(response)
            props.setUser(response.data.user)
            // localStorage.setItem('userId', response.data.user.id)
            localStorage.setItem('userId', response.data.user_id)
            // window.location.reload();
            window.location.href="/home"
        })
        .catch((err) => {
            console.log(err)
            // setError(err.response.data.message)
            alert("NO USER")
          })
      }

    return (
        <form onSubmit={submitForm} className="signlog">
            <h2>Log in</h2>
            <div>
                <label htmlFor="email">Email:</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div>
                <input type="submit" value="Log In"/>
            </div>
        </form>
    )
}

export default Login