import React from 'react';
import '../styles/whitecontainersmall.css';

const WhiteContainerSmall = ({ children, onClick, isSelected }) => {
  return (
    <div 
      className={`white-container-small ${isSelected ? 'selected' : ''}`} 
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default WhiteContainerSmall;
