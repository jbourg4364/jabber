import React, { useEffect, useState } from "react";
import { getUserProfile, deletePost } from "../api-client";
import './Profile.css';

const Profile = ({ posts }) => {
  const [userProfile, setUserProfile] = useState([]);
  const [userPost, setUserPost] = useState([]);

  const user = localStorage.getItem("currentUser");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const getProfile = async () => {
      const profile = await getUserProfile(user, token);

      setUserProfile(profile);
    };
    getProfile();
  }, []);

  useEffect(() => {
    const filteredPosts = posts.filter(
      (post) => post.creatorId === userProfile.username
    );
    setUserPost(filteredPosts);
  }, [posts, userProfile.username]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric'};
    return date.toLocaleDateString(undefined, options)
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const options = { hour: 'numeric', minute: 'numeric'};
    return date.toLocaleTimeString(undefined, options);
  };

  const handleDelete = async (postId) => {
    try {
      await deletePost({postId, token});
      setUserPost((prevUserPosts) => prevUserPosts.filter((post) => post.id !== postId));
    } catch (error) {
      // Handle the error
      console.log(error);
    }
  };
  
  


  return (
    <div>
      <h2 className="author-profile">All Post by {userProfile.username}</h2>
      {userPost.map((post) => (
        <div className="ind-post" key={post.id}>
          <em>{`${formatDate(post.postdate)}`}</em>
          <br></br>
          <em>{`${formatTime(post.postdate)}`}</em>
          <p>{post.description}</p>
          <hr />
          <div className="profile-bottom-container">
            <i className="fa-solid fa-pen-to-square fa-2xl" id='profile-edit'></i>
            <i className="fa-solid fa-trash fa-2xl" id='profile-trash'  onClick={() => handleDelete(post.id)}></i>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Profile;
