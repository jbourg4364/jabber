import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Home.css';
import { loginUser } from '../api-client/auth';


const Home = ({ setIsLoggedIn, setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const navigate = useNavigate();



  const handleSubmit = async (e) => {
    e.preventDefault();
    const usertoAuth = { username: username, password: password };
    const data = await loginUser(usertoAuth);
    
    if (data.token) {
      setIsLoggedIn(true);
      setUsername('');
      setPassword('');
      setUser(data.user);
      localStorage.setItem('id', data.user.id);

      setToken(data.token);
      localStorage.setItem('currentUser', data.user.username);
      localStorage.setItem('token', data.token);
      navigate('/me')
    }

    if (!data.token) {
      window.alert('Please register!');
      navigate('/register');
    }
  }

  return (
    <div className="home-banner-container">
      <div className='home-logo-container'>
        <h1 id='logo'>jabber</h1>
        <h2 id='logo-caption'>Connect with friends and the world around you on Jabber.</h2>
      </div>
      <form className='home-login-form' onSubmit={handleSubmit}>
        <div>
          <input 
            placeholder='Username'
            type='text'
            id='username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            placeholder='Password'
            type='password'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <button className='login-button' type='submit'>Log In</button>
        </div>
        <div>
          {/* <h4>Forgot password?</h4> */}
          <hr className='divider'/>
        </div>
        <div>
          <Link to='/register'>
            <button className='create-account-button'>Create new account</button>
          </Link>
          
        </div>
      </form>
      
    </div>
  );
};

export default Home;