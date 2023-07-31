import React, { useEffect, useState } from 'react';
import './Search.css';
import { searchPosts } from '../api-client';


const Search = ({ setShowSearch, showAddPost, posts, setPosts }) => {
  const [newSearch, setNewSearch] = useState('');
  const [searchedPost, setSearchedPost] = useState([]);

  const handleX = () => {
    showAddPost(false);
    setShowSearch(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const posts = await searchPosts(newSearch);
    if(posts) {
      setPosts(posts);
    } if(!posts) {
      window.alert(`No posts containing ${newSearch}`);
      showAddPost(false);
      setShowSearch(false);
    }
  };


  return (
    <div>
        <form className='search-field' onSubmit={handleSubmit}>
          <input 
            placeholder='Search Jabber'
            className='search-input'
            value={newSearch}
            onChange={(e) => setNewSearch(e.target.value)}
            autoFocus
          />
          <i id="exit-search" className="fa-solid fa-x fa-xl" onClick={handleX}></i>
        </form>
    </div>
    
  )
};

export default Search;