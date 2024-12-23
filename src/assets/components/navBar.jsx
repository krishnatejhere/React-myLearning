import React from 'react';
import { Link } from 'react-router-dom';
import '../css/navBar.css';

const NavBar = () => {
  return (
    <nav>
      <Link to="/" className="navLinks-left">
        <img src="src/assets/icons/light.ico" alt="Logo" />
        <span>My Learning</span>
      </Link>
      <ul className="navLinks-right">
        <li>
          <span role="img" aria-label="Browse">🔍</span> Browse
        </li>
        <Link to="/add">
          <li>
            <span role="img" aria-label="Add">📝</span> Add
          </li>
        </Link>
      </ul>
    </nav>
  );
};

export default NavBar;