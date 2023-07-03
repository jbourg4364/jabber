import React, { useEffect, useState } from 'react';
import './Header.css';
import { NavLink } from 'react-router-dom';
import { AddPost } from './'
import { getMe } from '../api-client/auth';


const Header = ({setToken, setIsLoggedIn, user, token, setPosts, posts, setUser}) => {
  const [currentUser, setCurrentUser] = useState('');
  const [addPost, showAddPost] = useState(false);
  

  const handleLogout = async () => {
    localStorage.removeItem('token');
    setCurrentUser('');
    setIsLoggedIn(false);
    setToken('');
  };
  

  const handleAddPost = async () => {
    showAddPost(true);
  }

  useEffect(() => {
    setCurrentUser(localStorage.getItem("currentUser"));
  }, [])
  
  

  return (
    <div>
      <header>
        <NavLink to='/me' className='nav-logo'>
          <h1 className='logo-header'>jabber</h1>
        </NavLink>
        <div className='left-nav'>
          <NavLink className='nav'>
            <i className="fa-solid fa-magnifying-glass"></i>
          </NavLink>
          <NavLink className='nav'>
          <i className="fa-solid fa-envelope"></i>
          </NavLink>
          <NavLink className='nav'>
            <i className="fa-solid fa-user"></i>
          </NavLink>
          <NavLink to='/' className='nav' onClick={handleLogout}>
            Logout
          </NavLink>
        </div>
      </header>
      <div className='banner-post-container' onClick={handleAddPost}>
        {addPost ? <AddPost user={user} token={token} posts={posts} setPosts={setPosts} showAddPost={showAddPost} currentUser={currentUser} setCurrentUser={setCurrentUser}/> : <h3 className='addPost-default'>What's on your mind, {currentUser}?</h3>}
      </div>
    </div>
  )
}

export default Header