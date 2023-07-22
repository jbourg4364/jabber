import React, { useState } from 'react';
import './Search.css';


const Search = ({ setShowSearch, showAddPost }) => {
  const [newSearch, setNewSearch] = useState('');

  const handleX = () => {
    showAddPost(false);
    setShowSearch(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    showAddPost(false);
    setShowSearch(false);
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