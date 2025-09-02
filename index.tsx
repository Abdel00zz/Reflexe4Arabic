/**
 * @file This is the main entry point for the Arabic Learning Adventure application.
 * It uses ReactDOM to render the main App component into the HTML root element.
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Find the root element in the HTML where the React app will be mounted.
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

// Create a React root and render the App component.
// React.StrictMode is used to highlight potential problems in an application.
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);