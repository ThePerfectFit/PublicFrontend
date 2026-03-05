// bottom nav
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/BottomNavbar.css';

function BottomNavbar() {
  const location = useLocation();

  const isActive = (path) => (location.pathname === path ? 'active' : '');

  return (
    <nav className="bottom-navbar">
      <ul className="bottom-links">
      </ul>
    </nav>
  );
}

export default BottomNavbar;
