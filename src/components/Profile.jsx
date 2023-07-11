import React, { useEffect, useState } from "react";
import { getUserProfile, deletePost, editPost } from "../api-client";
import "./Profile.css";

const Profile = ({ posts }) => {
  const [userProfile, setUserProfile] = useState([]);
  const [userPost, setUserPost] = useState([]);
  const [editPostId, setEditPostId] = useState(null);
  const [newDescription, setNewDescription] = useState("");

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
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const options = { hour: "numeric", minute: "numeric" };
    return date.toLocaleTimeString(undefined, options);
  };

  const handleDelete = async (postId) => {
    try {
      await deletePost({ postId, token });
      setUserPost((prevUserPosts) =>
        prevUserPosts.filter((post) => post.id !== postId)
      );
    } catch (error) {
      // Handle the error
      console.log(error);
    }
  };

  const handleEdit = async (postId, newDescription) => {
    try {
      if(newDescription.trim() === '') {
        window.alert('Cannot leave post description blank. Please delete post if you wish not to update.');
        return;
      } else {
        const edit = await editPost(postId, token, {
        description: newDescription,
      });
      setEditPostId(null);
      setNewDescription("");
      setUserPost((prevUserPosts) =>
        prevUserPosts.map((post) => {
          if (post.id === postId) {
            return {
              ...post,
              description: newDescription,
            }
          }
          return post;
        }
      ));
      }
      
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    setEditPostId(null);
    setNewDescription('');
  };

  return (
    <div>
      <h2 className="author-profile">All Posts by {userProfile.username}</h2>
      <div>
        {userPost.map((post) => (
          <div className="ind-post" key={post.id}>
            {editPostId === post.id ? (
              <div>
                <textarea
                  className="edit-post"
                  autoFocus={true}
                  defaultValue={post.description}
                  onChange={(e) => setNewDescription(e.target.value)}
                ></textarea>
                <div className="edit-post-bottom">
                  <button onClick={() => handleEdit(post.id, newDescription)} className="edit-post-button">
                  Submit
                  </button>
                  <button className="cancel-post-button" onClick={handleCancel}>Cancel</button>
                </div>
                
              </div>
            ) : (
              <div>
                <em>{`${formatDate(post.postdate)}`}</em>
                <br />
                <em>{`${formatTime(post.postdate)}`}</em>
                <p>{post.description}</p>
                <hr />
                <div className="profile-bottom-container">
                  <i
                    className="fa-solid fa-pen-to-square fa-2xl"
                    id="profile-edit"
                    onClick={() => setEditPostId(post.id)}
                  ></i>
                  <i
                    className="fa-solid fa-trash fa-2xl"
                    id="profile-trash"
                    onClick={() => handleDelete(post.id)}
                  ></i>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
