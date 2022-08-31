import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Welcome from './pages/Welcome';
import Register from './pages/Register';
import Login from './pages/Login';

export const CredentialsContext = React.createContext();

function App() {
  const credentialsState = useState(null);
  return (
    <CredentialsContext.Provider value={credentialsState}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element= {< Welcome />}/>
        <Route path="/register" element= {< Register />}/>
        <Route path="/login" element={< Login />}/>
      </Routes>
    </BrowserRouter>
    </CredentialsContext.Provider>
  );
}

export default App;

