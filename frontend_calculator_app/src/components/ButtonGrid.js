import React from 'react';
import Button from './Button';

/**
 * PUBLIC_INTERFACE
 * ButtonGrid renders calculator keys in a 4xN grid.
 */
function ButtonGrid({
  onDigit,
  onDot,
  onOperator,
  onClear,
  onDelete,
  onEquals,
  onToggleSign,
  onPercentage
}) {
  return (
    <div className="button-grid" role="group" aria-label="Calculator keyboard">
      <Button label="AC" ariaLabel="Clear all" className="accent" onClick={onClear} />
      <Button label="+/−" ariaLabel="Toggle sign" onClick={onToggleSign} />
      <Button label="%" ariaLabel="Percentage" onClick={onPercentage} />
      <Button label="÷" ariaLabel="Divide" className="operator" onClick={() => onOperator('/')} />

      <Button label="7" onClick={() => onDigit('7')} />
      <Button label="8" onClick={() => onDigit('8')} />
      <Button label="9" onClick={() => onDigit('9')} />
      <Button label="×" ariaLabel="Multiply" className="operator" onClick={() => onOperator('*')} />

      <Button label="4" onClick={() => onDigit('4')} />
      <Button label="5" onClick={() => onDigit('5')} />
      <Button label="6" onClick={() => onDigit('6')} />
      <Button label="−" ariaLabel="Subtract" className="operator" onClick={() => onOperator('-')} />

      <Button label="1" onClick={() => onDigit('1')} />
      <Button label="2" onClick={() => onDigit('2')} />
      <Button label="3" onClick={() => onDigit('3')} />
      <Button label="+" ariaLabel="Add" className="operator" onClick={() => onOperator('+')} />

      <Button label="0" className="span-2" onClick={() => onDigit('0')} />
      <Button label="." ariaLabel="Decimal point" onClick={onDot} />
      <Button label="=" ariaLabel="Equals" className="equals" onClick={onEquals} />

      <Button label="⌫" ariaLabel="Delete last" className="error span-2" onClick={onDelete} />
    </div>
  );
}

export default ButtonGrid;
