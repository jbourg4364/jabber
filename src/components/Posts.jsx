import React, {useState, useEffect} from 'react';
import './Posts.css';
import { getAllPosts, getAllUsers, increaseLikes } from '../api-client';


const Posts = ({ posts, setPosts }) => {
  const [likedPosts, setLikedPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const updatedPosts = await getAllPosts();
      const sortedPosts = updatedPosts.sort((a, b) => new Date(b.postdate) - new Date(a.postdate));
      setPosts(sortedPosts);
    };
    fetchPosts();
  }, [])

  const handleLikes = async (id) => {
    if (!likedPosts.includes(id)) { // Check if the post has not been liked
      setLikedPosts([...likedPosts, id]);
      await increaseLikes(id);
  
      const updatedPosts = await getAllPosts();
      const sortedPosts = updatedPosts.sort((a, b) => new Date(b.postdate) - new Date(a.postdate));
      setPosts(sortedPosts);
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
                    likedPosts &&
                    Array.isArray(likedPosts) &&
                    likedPosts.includes(post.id)
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

