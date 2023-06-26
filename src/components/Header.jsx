import React from 'react';
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <header>
        <NavLink to='/'>
          Logout
        </NavLink>
      </header>
    </div>
  )
}

export default Header