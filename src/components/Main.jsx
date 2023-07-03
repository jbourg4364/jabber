import React from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { Home, Register, Me, Header, Posts, AddPost } from './';
import { useEffect, useState } from 'react';
import { getMe } from '../api-client/auth';
import { getAllPosts, getAllUsers } from '../api-client';
import './Main.css';

const Main = () => {
  const [user, setUser] = useState('');
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [newPost, addNewPost] = useState([]);


  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        const fetchedUser = await getMe(token);
        if (fetchedUser) {
          setUser(fetchedUser);
          setIsLoggedIn(true);
          localStorage.setItem("currentUser", fetchedUser.username);
          navigate("/me");
        }
      }
    };
    fetchUser();
  }, [token, navigate]);

  useEffect(() => {
    fetchPosts();
    fetchUsers();
    
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await getAllPosts();
      setPosts(response);
    } catch (error) {
      console.error("Error loading all posts");
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await getAllUsers();
      setUsers(response);
    } catch (error) {
      console.error("Error loading all users");
    }
  };



  return (
    <div>
      {location.pathname !== "/" && location.pathname !== "/register" && (
        <Header
          user={user}
          setUser={setUser}
          setIsLoggedIn={setIsLoggedIn}
          isLoggedIn={isLoggedIn}
          token={token}
          setToken={setToken}
          posts={posts}
          setPosts={setPosts}
       
        >
          <AddPost posts={posts} setPosts={setPosts} user={user} setUser={setUser} token={token}/>
        </Header>
      )}
      <Routes>
        <Route
          path="/"
          element={
            <Home
              user={user}
              isLoggedIn={isLoggedIn}
              token={token}
              setIsLoggedIn={setIsLoggedIn}
              setUser={setUser}
            />
          }
        />
        <Route
          path="/register"
          element={
            <Register
              setIsLoggedIn={setIsLoggedIn}
              setToken={setToken}
              token={token}
              user={user}
              setUser={setUser}
            />
          }
        />
        <Route
          path="/me"
          element={
            <Me
              setIsLoggedIn={setIsLoggedIn}
              setToken={setToken}
              token={token}
              user={user}
              isLoggedIn={isLoggedIn}
              setUser={setUser}
              posts={posts}
              setPosts={setPosts}
            
            >
              
            </Me>
          }
        />
      </Routes>
      {location.pathname !== "/" && location.pathname !== "/register" && (
      <Posts
        posts={posts}
        setPosts={setPosts}
        users={users}
        setUsers={setUsers}
        newPost={newPost}
        addNewPost={addNewPost}
        user={user}
       
      />)}
    </div>
  );
};

export default Main;
