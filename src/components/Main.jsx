import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home, Register, Me, Header } from './';
import { useEffect, useState } from 'react';
import { getMe } from '../api-client/auth'

const Main = () => {
  const [user, setUser] = useState({});
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        const fetchedUser = await getMe(token);
        if (fetchedUser) {
          setUser(fetchedUser);
          setIsLoggedIn(true);
          localStorage.setItem('currentUser', fetchedUser.username);
        }
      } 
    };
    fetchUser();
  }, [token]);

  return (
    <div>
      <Routes>
        <Route
          path='/'
          element={<Home 
          user={user}
          isLoggedIn={isLoggedIn}
          token={token}
          setIsLoggedIn={setIsLoggedIn}
          setUser={setUser}
          />}
        />
        <Route
          path='/register'
          element={<Register 
            setIsLoggedIn={setIsLoggedIn}
            setToken={setToken}
            token={token}
            user={user}
          />}
        />
        <Route
        path='/me'
        element={<Me 
          setIsLoggedIn={setIsLoggedIn}
          setToken={setToken}
          token={token}
          user={user}
          isLoggedIn={isLoggedIn}
          setUser={setUser}
        />}
        />
      </Routes>
      
    </div>
  )
};

export default Main;