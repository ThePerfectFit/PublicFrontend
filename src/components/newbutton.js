import React from 'react';
import '../styles/newbutton.css';

function SecondaryButton({ label, onClick, isActive }) {
  return (
    <button
      className={`secondary-button ${isActive ? 'active' : ''}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

export default SecondaryButton;
