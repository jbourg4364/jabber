import React, { useState } from 'react';
import { createPost } from '../api-client';
import './AddPost.css';

const AddPost = ({ user, posts, setPosts, showAddPost }) => {
  const [newPost, setNewPost] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const createdPost = await createPost(newPost, user);
    setPosts((prevPosts) => [...prevPosts, createdPost]);
    setNewPost('');
    showAddPost(false);
  };

  return (
    <form onSubmit={handleSubmit} className='post-container'>
      <input 
        placeholder='What is on your mind?'
        type='text'
        id='addPost-post'
        value={newPost}
        onChange={(e) => setNewPost(e.target.value)}
        required
        className='addPost-input'
      />
      <button className='postButton'>Post</button>
    </form>
  );
};

export default AddPost;
