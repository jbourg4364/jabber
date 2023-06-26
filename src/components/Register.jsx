import React, { useState, useRef } from 'react';
import './Register.css';
import { registerUser } from '../api-client/auth';
import { useNavigate } from 'react-router';



const Register = ({setIsLoggedIn, setToken}) => {
  const [username, setUsername] = useState('');
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const inputElement = useRef();
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 8) {
      window.alert('Please use a password that is at least 8 characters.')
    } else if (password !== passwordConfirm) {
      window.alert('Please make sure your passwords are the same.')
    } else {
      const result = await registerUser({ firstname, lastname, email, username, password });

      console.log(result);

      if (result.token) {
        setToken(result.token);
        setIsLoggedIn(true);
        localStorage.setItem('currentUser', result.username);
        localStorage.setItem('token', result.token);
        window.alert(`Congratulations! You're registered with jabber!`);
        navigate('/')
      }
    }
  };

  return (
    <div className='register-container'>
      <h1>Sign Up</h1>
      <h3>It's quick and easy.</h3>
      <hr />
      <div className='register-form-container'>
        <form ref={inputElement} onSubmit={handleSubmit}>
          <input 
            placeholder='First name'
            type='text'
            id='register-fname'
            value={firstname}
            onChange={(e) => setFirstName(e.target.value)}
            required
            className='register-input'
          />
          <input 
            placeholder='Last name'
            type='text'
            id='register-lname'
            value={lastname}
            onChange={(e) => setLastName(e.target.value)}
            required
            className='register-input'
          />
          <input 
            placeholder='Email'
            type='email'
            id='register-email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className='register-input'
          />
          <input 
            placeholder='Username'
            type='text'
            id='register-username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className='register-input'
          />
          <input 
            placeholder='Password'
            type='password'
            id='register-password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className='register-input'
          />
          <input 
            placeholder='Confirm Password'
            type='password'
            id='register-password-confirm'
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            required
            className='register-input'
          />
          <div>
            <button className='register-button'>Register</button>
          </div>
        </form>
        <div>
          <h3>Already have an account?</h3>
        </div>
      </div>
    </div>
  )
};

export default Register;