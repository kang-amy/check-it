import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CredentialsContext } from '../App';
import { handleErrors } from './Login';

export default function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [credentials, setCredentials] = useContext(CredentialsContext);
    const [error, setError] = useState("");

    const register = (e) => {
        e.preventDefault();
        fetch("/register", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                password,
            }),
        })
        .then(handleErrors)
        .then(() => {
            setCredentials({ username, password});
            navigate("/");
            // localStorage.setItem("credentials", JSON.stringify(credentials));
        })
        .catch((error) => {
            setError(error.message);
        })
    };

    const navigate = useNavigate();

  return (
    <div className='main'>
        <div className="title-header">
            <br/>
        Register Here
        </div>
        <Link className='text-link' to="/">&larr; back</Link>
        <form onSubmit={register}>
            {error}
            <br/>
            <label>Username: </label>
            <input id="username" onChange={(e) => setUsername(e.target.value)}/>
            <br/>
            <label>Password: </label>
            <input type="password" id="password" onChange={(e) => setPassword(e.target.value)}/>
            <br/>
            <button type="submit">Register</button>
        </form>
    </div>
  )
}
