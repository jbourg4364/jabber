import React, { useEffect, useState } from 'react';
import { getAllPosts, getAllUsers } from '../api-client';
import './Posts.css';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchPosts();
    fetchUsers();

  }, []);

  const fetchPosts = async () => {
    try {
      const response = await getAllPosts();
      const sortedPosts = response.sort((a, b) => (b.postdate) - (a.postdate));
      setPosts(sortedPosts);
    } catch (error) {
      console.error('Error loading all posts');
    }
  };
  

  const fetchUsers = async () => {
    try {
      const response = await getAllUsers();
      setUsers(response)
    } catch (error) {
      console.error('Error loading all users')
    }
  };


  return (
    <div>
      {posts.map((post) => (
        <div key={post.id} className="ind-post">
          <h3>{post.creatorId}</h3>
          <p>{post.description}</p>
          <hr></hr>
          <div className='posts-bottom-container'>
            <h3><i className="fa-solid fa-heart"></i> {post.likes}</h3>
            <h3>Comments: {post.comments}</h3>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Posts;