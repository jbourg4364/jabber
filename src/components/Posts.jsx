import React, { useEffect } from 'react';
import './Posts.css';
import { getAllPosts, increaseLikes } from '../api-client';


const Posts = ({ posts, setPosts, userLikedPosts, setUserLikedPosts }) => {

  useEffect(() => {
    const fetchData = async () => {
      const updatedPosts = await getAllPosts();
      setPosts(updatedPosts);
    };
    fetchData();
  }, [setPosts]);


  const handleLikes = async (id) => {
    if (!userLikedPosts.includes(id)) {
      setUserLikedPosts([...userLikedPosts, id]);

      const updatedPosts = posts.map((post) => {
        if (post.id === id) {
          return { ...post, likes: post.likes + 1 };
        }
        return post;
      });
      
      setPosts(updatedPosts);

      await increaseLikes(id, localStorage.getItem('id'));
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric'};
    return date.toLocaleDateString(undefined, options)
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const options = { hour: 'numeric', minute: 'numeric'};
    return date.toLocaleTimeString(undefined, options);
  }


  return (
    <div>
      {Array.isArray(posts) && posts.length > 0 ? (
        posts.map((post) => (
          <div key={post.id} className="ind-post">
            <h3 className="author">{post.creatorId}</h3>
            <em>{`${formatDate(post.postdate)}`}</em> 
            <br />
            <em>{` ${formatTime(post.postdate)}`}</em>
            <p>{post.description}</p>
            <hr />
            <div className="posts-bottom-container">
              <h3>
                <i
                  className={
                    userLikedPosts &&
                    Array.isArray(userLikedPosts) &&
                    userLikedPosts.includes(post.id)
                      ? "fa-solid fa-heart"
                      : "fa-regular fa-heart"
                  }
                  onClick={() => handleLikes(post.id)}
                />{" "}
                {post.likes}
              </h3>
              <h3>Comments: {post.comments}</h3>
            </div>
          </div>
        ))
      ) : (
        <p>No posts available</p>
      )}
    </div>
  );
};

export default Posts;