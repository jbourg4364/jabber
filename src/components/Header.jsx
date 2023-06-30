import React, { useEffect, useState } from 'react';
import './Header.css';
import { NavLink } from 'react-router-dom';
import { AddPost } from './'


const Header = ({setToken, setIsLoggedIn, user, token}) => {
  const [currentUser, setCurrentUser] = useState('');
  const [addPost, showAddPost] = useState(false);

  const handleLogout = async () => {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    setIsLoggedIn(false);
    setToken('');
  }

  const handleAddPost = async () => {
    showAddPost(true);
  }
  
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
   
    setCurrentUser(storedUser);
  }, []); 

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
      <div className='banner-post-container' onClick={handleAddPost}>
        {addPost ? <AddPost user={user} token={token}/> : <h3 className='addPost-default'>What's on your mind, <em>{currentUser}</em>?</h3>}
      </div>
      <hr></hr>
    </div>
  )
}

export default Header