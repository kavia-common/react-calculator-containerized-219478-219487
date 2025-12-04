import React, { useState, useEffect } from 'react';
import './App.css';
import './index.css';
import Calculator from './components/Calculator';

// PUBLIC_INTERFACE
function App() {
  /**
   * The App component provides the Ocean Professional themed container
   * and preserves a theme toggle (light/dark) if the user prefers dark mode.
   */
  const [theme, setTheme] = useState('light');

  // Apply theme as data-theme to root for CSS variables
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    /** Toggle app theme between 'light' and 'dark' */
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="App">
      <header className="App-header">
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>

        <div className="calculator-page">
          <h1 className="app-title" aria-label="Calculator title">
            Ocean Calculator
          </h1>
          <Calculator />
        </div>
      </header>
    </div>
  );
}

export default App;
