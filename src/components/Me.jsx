import React from 'react';
import { Posts } from './';


const Me = ({setPosts, posts, newPost, user, likedPosts, setLikedPosts}) => {
  return (
    <div>
      <Posts setPosts={setPosts} posts={posts} newPost={newPost} setLikedPosts={setLikedPosts} likedPosts={likedPosts} user={user}/>
    </div>
  )
}

export default Me