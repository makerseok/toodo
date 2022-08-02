import React, { createContext, useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './components/templates/Home';
import Login from './components/templates/Login';
import Register from './components/templates/Register';
import axios from 'axios';

interface IUser {
  auth: boolean;
  user?: {
    name: string;
    email: string;
    role: number;
    image?: string;
    tokens?: string;
  };
}

const initState: IUser = {
  auth: false,
};

export const UserContext = createContext<IUser | undefined>(initState);
export const UserUpdateContext = createContext<any>(null);

function App() {
  const [user, setUser] = useState<IUser>();

  const updateUser = () => {
    axios.get<IUser>('/api/users/auth').then(res => {
      setUser(res.data);
    });
  };

  useEffect(() => {
    updateUser();
  }, []);

  return (
    <div className="App">
      <UserContext.Provider value={user}>
        <UserUpdateContext.Provider value={updateUser}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </BrowserRouter>
        </UserUpdateContext.Provider>
      </UserContext.Provider>
    </div>
  );
}

export default App;
