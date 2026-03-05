import React, { useState } from 'react';
import '../styles/textbox.css';

function TextBox({ placeholder, value, onChange }) {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleKeyPress = (event) => {
    // numbers only
    const charCode = event.which ? event.which : event.keyCode;
    if ((charCode < 48 || charCode > 57) && charCode !== 8) {
      event.preventDefault();
    }
  };

  const handlePaste = (event) => {
    // To prevent pasting
    event.preventDefault();
  };

  return (
    <input
      type="text"
      className="text-box"
      placeholder={isFocused ? '' : placeholder}
      value={value}
      onChange={onChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onKeyPress={handleKeyPress}
      onPaste={handlePaste}
    />
  );
}

export default TextBox;
