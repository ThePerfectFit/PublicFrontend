import React from 'react';
import '../styles/button.css';

function CustomButton({ label, onClick }) {
  return (
    <button className="custom-button" onClick={onClick}>
      <span>{label}</span>
    </button>
  );
}

export default CustomButton;
