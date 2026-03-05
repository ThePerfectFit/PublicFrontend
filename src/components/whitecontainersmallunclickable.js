import React from 'react';
import '../styles/whitecontainersmallunclickable.css';

const WhiteContainerSmallUnclickable = ({ children, isSelected }) => {
  return (
    <div className={`white-container-small-unclickable ${isSelected ? 'selected' : ''}`}>
      {children}
    </div>
  );
};

export default WhiteContainerSmallUnclickable;
