import React from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { Home, Register, Me, Header, Posts, AddPost, Profile, Messages, Search } from "./";
import { useEffect, useState } from "react";
import { getMe } from "../api-client/auth";
import { getAllPosts, getAllUsers } from "../api-client";
import "./Main.css";

const Main = () => {
  const [user, setUser] = useState({});
  const [token, setToken] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [newPost, addNewPost] = useState([]);


  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          const fetchedUser = await getMe(token);
          if (fetchedUser) {
            setUser(fetchedUser.username);
            setIsLoggedIn(true);
            if (location.pathname === "/")
              navigate("/me");
          }
          
        } catch (error) {
          // Handle any errors that occur during the API call
          console.error("Error fetching user:", error);
        }
      }
    };

    fetchUser();
  }, [navigate]);

  useEffect(() => {
    fetchPosts();
    fetchUsers();
  }, []);

  const fetchPosts = async () => {
    const updatedPosts = await getAllPosts();
    const sortedPosts = updatedPosts.sort((a, b) => new Date(b.postdate) - new Date(a.postdate));
    setPosts(sortedPosts);
  };

  const fetchUsers = async () => {
    try {
      const response = await getAllUsers();
      setUsers(response);
    } catch (error) {
      console.error("Error loading all users", error);
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
            <AddPost
            posts={posts}
            setPosts={setPosts}
            user={user}
            setUser={setUser}
            token={token}
          />
          <Search />
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
              setToken={setToken}
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
              setPosts={setPosts}>
              </Me>
          }
        />
        <Route
          path='/profile'
          element={
            <Profile user={user} token={token} setUser={setUser} setToken={setToken} posts={posts}/>
          }
        />
        <Route 
        path="/messages"
        element={<Messages user={user} token={token} users={users}/>}
        />
      </Routes>
      {location.pathname !== "/" && location.pathname !== "/register" && location.pathname !== "/profile" && location.pathname !== "/messages" && (
        <Posts
          posts={posts}
          setPosts={setPosts}
          users={users}
          setUsers={setUsers}
          newPost={newPost}
          addNewPost={addNewPost}
          user={user}
          token={token}
          setToken={setToken}
        />
      )}
    </div>
  );
};

export default Main;
