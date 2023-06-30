import React, { useState } from 'react';
import { createPost } from '../api-client';


const AddPost = ({user}) => {
  const [newPost, addNewPost] = useState('');
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user.username)
    createPost(newPost, user.username);
    addNewPost('');
  };
  

  return (
    <form onSubmit={handleSubmit}>
        <input 
            placeholder='What is on your mind?'
            type='text'
            id='addPost-post'
            value={newPost}
            onChange={(e) => addNewPost(e.target.value)}
            required
            className='addPost-input'
          />
          <button className='postButton'>Post</button>
    </form>
  )
};

export default AddPost;