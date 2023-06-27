import React, { useEffect } from 'react';
import './Header.css';
import { NavLink } from 'react-router-dom';


const Header = ({setToken, setIsLoggedIn}) => {
  const handleLogout = async () => {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    setIsLoggedIn(false);
    setToken('');
  }

  return (
    <div>
      <header>
        <NavLink to='/me' className='nav-logo'>
          <h1 className='logo-header'>jabber</h1>
        </NavLink>
        <div className='left-nav'>
          <NavLink className='nav'>
          <i className="fa-solid fa-plus"></i>
          </NavLink>
          <NavLink to='/' className='nav' onClick={handleLogout}>
          Logout
          </NavLink>
        </div>
      </header>
      <div className='banner-post-container'>
        <h3>What's on your mind?</h3>
      </div>
      <hr></hr>
    </div>
  )
}

export default Header