import React, { useEffect, useRef } from 'react';
import Display from './Display';
import ButtonGrid from './ButtonGrid';
import {
  createInitialState,
  inputDigit,
  inputDot,
  chooseOperator,
  clearAll,
  deleteLast,
  evaluate,
  toggleSign,
  percentage,
  formatForDisplay
} from '../utils/calcEngine';

/**
 * PUBLIC_INTERFACE
 * Calculator component renders the display and input grid, manages keyboard
 * interactions, and holds the calculation state via reducer-like local state.
 */
function Calculator() {
  const [state, setState] = React.useState(createInitialState());
  const containerRef = useRef(null);

  const onDigit = (d) => setState(s => inputDigit(s, d));
  const onDot = () => setState(s => inputDot(s));
  const onOperator = (op) => setState(s => chooseOperator(s, op));
  const onClear = () => setState(() => clearAll());
  const onDelete = () => setState(s => deleteLast(s));
  const onEquals = () => setState(s => evaluate(s));
  const onToggleSign = () => setState(s => toggleSign(s));
  const onPercentage = () => setState(s => percentage(s));

  // Keyboard accessibility
  useEffect(() => {
    const handler = (e) => {
      const key = e.key;
      if ((key >= '0' && key <= '9')) {
        e.preventDefault();
        onDigit(key);
      } else if (key === '.' || key === ',') {
        e.preventDefault();
        onDot();
      } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        e.preventDefault();
        onOperator(key);
      } else if (key === '%') {
        e.preventDefault();
        onPercentage();
      } else if (key === 'Enter' || key === '=') {
        e.preventDefault();
        onEquals();
      } else if (key === 'Escape') {
        e.preventDefault();
        onClear();
      } else if (key === 'Backspace') {
        e.preventDefault();
        onDelete();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const displayCurrent = formatForDisplay(state.current);
  const displayPrevious = state.previous && state.operator
    ? `${formatForDisplay(state.previous)} ${state.operator}`
    : '';

  return (
    <section
      className="calculator"
      aria-label="Calculator"
      ref={containerRef}
      role="application"
    >
      <Display
        previous={displayPrevious}
        current={displayCurrent}
      />
      <ButtonGrid
        onDigit={onDigit}
        onDot={onDot}
        onOperator={onOperator}
        onClear={onClear}
        onDelete={onDelete}
        onEquals={onEquals}
        onToggleSign={onToggleSign}
        onPercentage={onPercentage}
      />
    </section>
  );
}

export default Calculator;
