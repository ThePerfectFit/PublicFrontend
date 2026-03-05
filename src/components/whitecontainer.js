import React from 'react';
import '../styles/whitecontainer.css';

const WhiteContainer = ({ children, onClick, isSelected }) => {
  return (
    <div 
      className={`white-container ${isSelected ? 'selected' : ''}`} 
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default WhiteContainer;
