import React from 'react';
import { Posts } from './';
import { Profile } from './'


const Me = ({setPosts, posts, newPost, user, likedPosts, setLikedPosts, token}) => {
  return (
    <div>
      <Posts setPosts={setPosts} posts={posts} newPost={newPost} setLikedPosts={setLikedPosts} likedPosts={likedPosts} user={user} token={token}/>
    </div>
  )
}

export default Me;