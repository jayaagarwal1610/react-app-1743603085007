import React from 'react';
import ChessBoard from './components/ChessBoard';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="app">
      <h1>React Chess</h1>
      <ChessBoard />
    </div>
  );
};

export default App;