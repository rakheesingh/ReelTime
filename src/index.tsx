import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';

const App = () => {
  return <h1>Hello, React with TypeScript and Webpack!</h1>;
};

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<App />);