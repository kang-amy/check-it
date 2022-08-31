import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CredentialsContext } from '../App';

export const handleErrors = async (response) => {
    if (!response.ok) {
        const { message } = await response.json();
        console.log("message", message);
        throw Error(message);
    }
    return response.json();
}

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [credentials, setCredentials] = useContext(CredentialsContext);
    const [error, setError] = useState("");

    const navigate = useNavigate();
    
    const login = (e) => {
        e.preventDefault();
        fetch("/login", {
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
            setCredentials({ username, password });
            navigate("/");
            // localStorage.setItem("credentials", JSON.stringify(credentials));
        })
        .catch((error) => {
            setError(error.message);
        })
    };


  return (
    <div className='main'>
        <br/>
        <div className="title-header">
        Login Here
        </div>
        <Link className='text-link' to="/">&larr; back</Link>
        <form onSubmit={login}>
            {error}
            <br/>
            <label>Username: </label>
            <input id="username" onChange={(e) => setUsername(e.target.value)}/>
            <br/>
            <label>Password: </label>
            <input type="password" id="password" onChange={(e) => setPassword(e.target.value)}/>
            <br/>
            <button type="submit">Login</button>
        </form>
    </div>
  )
}