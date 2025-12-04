import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Button is an accessible calculator button.
 */
function Button({ label, ariaLabel, className = '', onClick }) {
  return (
    <button
      type="button"
      className={`btn ${className}`.trim()}
      onClick={onClick}
      aria-label={ariaLabel || label}
    >
      {label}
    </button>
  );
}

export default Button;
