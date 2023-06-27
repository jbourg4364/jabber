import React, { useEffect, useState } from 'react';
import { getAllPosts } from '../api-client';
import './Posts.css';

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await getAllPosts();
      setPosts(response);
      console.log(response);
    } catch (error) {
      console.error('Error loading all posts');
    }
  };


  return (
    <div>
      {posts.map((post) => 
      <div key={post.id} className='ind-post'>
        <p>{post.description}</p>
        <h3>Likes: {post.likes}</h3>
        <h3>Comments: {post.comments}</h3>
      </div>)}
    </div>
  )
}

export default Posts;