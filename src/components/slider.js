import React, { useState } from 'react';
import '../styles/slider.css';

function ThreePointSlider({ onChange }) {
  const [value, setValue] = useState(2); // middle = 2

  const handleChange = (event) => {
    const newValue = parseInt(event.target.value);
    setValue(newValue);
    onChange(newValue);
  };

  return (
    <div className="slider-container">
      <input
        type="range"
        min="1"
        max="3"
        step="1"
        value={value}
        className="slider"
        onChange={handleChange}
      />
      <div className="slider-labels">
        {/* labels are optional for this part*/}
      </div>
    </div>
  );
}

export default ThreePointSlider;
