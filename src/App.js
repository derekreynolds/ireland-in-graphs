import React from 'react';
import logo from './logo.svg';
import './App.scss';
import Temperature from './temperature/Temperature';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div></div>
        <div>Ireland in graphs</div>
        <div></div>
      </header>
      <Temperature/>      
    </div>
  );
}

export default App;
