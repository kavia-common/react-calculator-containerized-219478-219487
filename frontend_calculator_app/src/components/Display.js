import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Display shows previous operation and current value for the calculator.
 */
function Display({ previous, current }) {
  return (
    <div className="display" aria-live="polite" aria-atomic="true">
      <div className="previous" aria-label="previous expression">
        {previous}
      </div>
      <div className="current" aria-label="current value" data-testid="display">
        {current}
      </div>
    </div>
  );
}

export default Display;
