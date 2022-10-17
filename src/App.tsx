import './App.scss';
import React, { useEffect, useState } from 'react';
import './utils/styles/reset.scss';
import { Login } from './components/Login/Login';
import { Register } from './components/Register/Register';
// import { NavBar } from './components/NavBar/NavBar';
import { Navigate, Route, Routes } from 'react-router';
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage';
import { User } from './types/User';
import { Dashboard } from './components/Dashboard/Dashboard';

export const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userJson = localStorage.getItem('user');

    if (userJson) {
      const userData = JSON.parse(userJson);
      setUser(userData);
    }
  }, []);

  return (
    <>
      {/* <NavBar /> */}
      <Routes>
        <Route path='/login' element={<Login setUser={setUser} />} />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path='/register' element={<Register />} />
        <Route path='/dashboard' element={<Dashboard user={user} setUser={setUser}/>} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </>
  );
};
