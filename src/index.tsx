import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

const App = () => {
  return <div className='border'>Hello, React with TypeScript and Webpack!</div>;
};

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<App />);