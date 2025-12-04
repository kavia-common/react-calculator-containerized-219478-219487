import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

function click(btnTextOrLabel) {
  const btn =
    screen.queryByRole('button', { name: btnTextOrLabel }) ||
    screen.getByText(btnTextOrLabel);
  fireEvent.click(btn);
}

function getDisplay() {
  return screen.getByTestId('display');
}

test('renders calculator UI with display and core buttons', () => {
  render(<App />);
  expect(getDisplay()).toHaveTextContent('0');

  // Core buttons present
  expect(screen.getByRole('button', { name: /clear all/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /add/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /equals/i })).toBeInTheDocument();
});

test('2 + 3 = 5', () => {
  render(<App />);
  click('2');
  click('+');
  click('3');
  click('=');
  expect(getDisplay()).toHaveTextContent('5');
});

test('decimal handling: 0.1 + 0.2 ≈ 0.3', () => {
  render(<App />);
  click('0');
  click('.');
  click('1');
  click('+');
  click('0');
  click('.');
  click('2');
  click('=');
  expect(getDisplay().textContent === '0.3' || getDisplay().textContent.startsWith('0.3')).toBeTruthy();
});

test('clear and delete behaviors', () => {
  render(<App />);
  click('1');
  click('2');
  click('3');
  // Delete last -> "12"
  click('⌫');
  expect(getDisplay()).toHaveTextContent('12');

  // Clear -> "0"
  click('AC');
  expect(getDisplay()).toHaveTextContent('0');
});

test('keyboard input works: 9 * 9 = 81', () => {
  render(<App />);
  const root = getDisplay();
  fireEvent.keyDown(window, { key: '9' });
  fireEvent.keyDown(window, { key: '*' });
  fireEvent.keyDown(window, { key: '9' });
  fireEvent.keyDown(window, { key: 'Enter' });

  expect(root).toHaveTextContent('81');
});
