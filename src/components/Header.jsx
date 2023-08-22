import React, { useEffect, useState } from "react";
import "./Header.css";
import { NavLink } from "react-router-dom";
import { AddPost, Search } from "./";

const Header = ({
  setToken,
  setIsLoggedIn,
  user,
  token,
  setPosts,
  posts
}) => {
  const [currentUser, setCurrentUser] = useState("");
  const [addPost, showAddPost] = useState(false);
  const [showSearch, setShowSearch] = useState(false);


  
  const handleLogout = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("currentUser");
    setIsLoggedIn(false);
    setToken("");
  };

  const handleAddPost = async () => {
    showAddPost(true);
  };

  const handleSearch = () => {
    setShowSearch(true);
    showAddPost(false);
  }

  useEffect(() => {
    setCurrentUser(localStorage.getItem("currentUser"));
  }, []);

  return (
    <div>
      <header>
        <NavLink to="/me" className="nav-logo" onClick={() => showAddPost(false)}>
          <h1 className="logo-header">jabber</h1>
        </NavLink>
        <div className="left-nav">
          <NavLink className="nav" onClick={handleSearch}>
            <i className="fa-solid fa-magnifying-glass"></i>
          </NavLink>
          <NavLink to="/messages" className="nav" onClick={() => showAddPost(false)}>
            <i className="fa-solid fa-envelope"></i>
          </NavLink>
          <NavLink to="/profile" className="nav" onClick={() => showAddPost(false)}>
            <i className="fa-solid fa-user"></i>
          </NavLink>
          <NavLink to="/" className="nav" onClick={handleLogout}>
            Logout
          </NavLink>
        </div>
      </header>
      <div className="banner-post-container" onClick={handleAddPost}>
        {addPost && !showSearch? (
          <AddPost
            user={user}
            token={token}
            posts={posts}
            setPosts={setPosts}
            showAddPost={showAddPost}
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
          />
        ) : showSearch ? (
          <Search setShowSearch={setShowSearch} showAddPost={showAddPost} posts={posts} setPosts={setPosts}/>
        ) : (
          <h3 className="addPost-default">
            What's on your mind, {currentUser}?
          </h3>
        )}
      </div>
    </div>
  );
};

export default Header;
