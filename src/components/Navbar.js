// top nav
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar() {
  const location = useLocation();
  const isActive = (path) => (location.pathname === path ? 'active' : '');

  return (
    <nav className="navbar">
      <div className="nav-logo">Perfect Fit</div>
      <ul className="nav-links">
        <li><Link className={isActive('/home')} to="/home">Home</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
