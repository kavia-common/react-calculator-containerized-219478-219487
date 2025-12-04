const MAX_LENGTH = 16;

/**
 * Normalize precision, trim trailing zeros and dots.
 */
function normalize(numStr) {
  if (numStr === 'Error') return numStr;
  if (!isFiniteSafe(numStr)) return 'Error';
  // limit display precision
  let str = numStr;
  if (str.includes('e') || str.includes('E')) return str;
  if (str.includes('.')) {
    // Round to 12 decimal places to reduce floating errors
    const n = Number(str);
    str = n.toFixed(12);
    str = str.replace(/\.?0+$/, '');
  }
  if (str.length > MAX_LENGTH) {
    // Use exponential if too long
    const n = Number(str);
    if (!isFinite(n)) return 'Error';
    str = n.toExponential(6);
  }
  return str;
}

function isFiniteSafe(v) {
  const n = Number(v);
  return Number.isFinite(n);
}

function operate(aStr, bStr, operator) {
  const a = Number(aStr);
  const b = Number(bStr);

  if (!Number.isFinite(a) || !Number.isFinite(b)) return 'Error';

  let result;
  switch (operator) {
    case '+':
      result = a + b;
      break;
    case '-':
      result = a - b;
      break;
    case '*':
      result = a * b;
      break;
    case '/':
      if (b === 0) return 'Error';
      result = a / b;
      break;
    default:
      return bStr;
  }
  return normalize(String(result));
}

// PUBLIC_INTERFACE
export function createInitialState() {
  /** Create the initial calculation state */
  return { current: '0', previous: null, operator: null, overwrite: false, lastEvaluatedWith: null };
}

// PUBLIC_INTERFACE
export function inputDigit(state, digit) {
  /** Handle digit input (0-9) */
  if (state.overwrite) {
    return { ...state, current: digit === '0' ? '0' : digit, overwrite: false };
  }

  if (state.current === '0') {
    return { ...state, current: digit };
  }

  if (state.current.length >= MAX_LENGTH) return state;

  return { ...state, current: state.current + digit };
}

// PUBLIC_INTERFACE
export function inputDot(state) {
  /** Handle decimal point input */
  if (state.overwrite) {
    return { ...state, current: '0.', overwrite: false };
  }
  if (state.current.includes('.')) return state;
  return { ...state, current: `${state.current}.` };
}

// PUBLIC_INTERFACE
export function chooseOperator(state, op) {
  /** Choose an operator and handle chaining operations */
  if (state.operator && !state.overwrite) {
    // Evaluate chain
    const evaluated = evaluate({ ...state, overwrite: false });
    return { ...evaluated, operator: op, previous: evaluated.current, overwrite: true, lastEvaluatedWith: null };
  }

  return {
    ...state,
    operator: op,
    previous: state.current,
    overwrite: true,
    lastEvaluatedWith: null
  };
}

// PUBLIC_INTERFACE
export function clearAll() {
  /** Clear the calculator to initial state */
  return createInitialState();
}

// PUBLIC_INTERFACE
export function deleteLast(state) {
  /** Delete the last character of current unless overwriting */
  if (state.overwrite) {
    return { ...state, current: '0', overwrite: false };
  }
  if (state.current.length <= 1) {
    return { ...state, current: '0' };
  }
  return { ...state, current: state.current.slice(0, -1) };
}

// PUBLIC_INTERFACE
export function evaluate(state) {
  /**
   * Evaluate current expression.
   * Supports repeated equals by reusing lastEvaluatedWith (operator, operand).
   */
  if (state.operator && state.previous != null) {
    const result = operate(state.previous, state.current, state.operator);
    if (result === 'Error') {
      return { current: 'Error', previous: null, operator: null, overwrite: true, lastEvaluatedWith: null };
    }
    return {
      current: result,
      previous: null,
      operator: null,
      overwrite: true,
      lastEvaluatedWith: { operator: state.operator, operand: state.current }
    };
  }

  // Repeat equals: use lastEvaluatedWith with current as base
  if (state.lastEvaluatedWith && state.current != null && state.current !== 'Error') {
    const { operator, operand } = state.lastEvaluatedWith;
    const result = operate(state.current, operand, operator);
    if (result === 'Error') {
      return { current: 'Error', previous: null, operator: null, overwrite: true, lastEvaluatedWith: null };
    }
    return {
      ...state,
      current: result,
      overwrite: true
    };
  }

  return { ...state, overwrite: true };
}

// PUBLIC_INTERFACE
export function toggleSign(state) {
  /** Toggle the sign of the current value */
  if (state.current === '0' || state.current === 'Error') return state;
  if (state.current.startsWith('-')) {
    return { ...state, current: state.current.slice(1) };
  }
  return { ...state, current: '-' + state.current };
}

// PUBLIC_INTERFACE
export function percentage(state) {
  /** Convert current to percentage (divide by 100) */
  if (state.current === 'Error') return state;
  const n = Number(state.current);
  const result = normalize(String(n / 100));
  return { ...state, current: result, overwrite: true };
}

// PUBLIC_INTERFACE
export function formatForDisplay(value) {
  /** Format value for display, keeping 'Error' intact */
  if (value === 'Error') return value;
  // Avoid localizing to keep tests simple
  return value;
}
