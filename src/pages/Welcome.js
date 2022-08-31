import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { CredentialsContext } from '../App';
import Todos from "../components/Todos"

export default function Welcome() {
  // const LOCAL_STORAGE_KEY = 'todoApp.todos';
  const [credentials, setCredentials] = useContext(CredentialsContext);
  const logout = () => {
    setCredentials(null);
    // localStorage.setItem("credentials", JSON.stringify(credentials));
  };

  // useEffect(() => {
  //   const storedCredentials = localStorage.getItem("credentials", JSON.parse(credentials));
  //   setCredentials(storedCredentials);
  // }, []);

  return (
      <div className='main'>
        <br/>
        <p className='title'>Check It!</p>
        <div className="title-header">
        Welcome {credentials && credentials.username}
        {/* {credentials && JSON.stringify(credentials)} */}
        </div>
        <br/>
        <div>
        {credentials && <button onClick={ logout }>Logout</button>}
        {!credentials && <Link to="/register" className='text-link'>register &rarr;</Link>}
        <br/>
        {!credentials && <Link to='/login' className='text-link'>login &rarr;</Link>}
        </div>
        {credentials && <Todos/>}
        <a className='footer text-link' target="_blank" href="amykang.ca">about the developer</a>
      </div>
  )
}
