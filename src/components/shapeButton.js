// shape option button
import React from 'react';
import '../styles/newbutton.css';

function ShapeButton({ label, onClick, selected }) {
  return (
    <button className={`shape-button ${selected ? 'selected' : ''}`} onClick={onClick}>
      {label}
    </button>
  );
}

export default ShapeButton;
