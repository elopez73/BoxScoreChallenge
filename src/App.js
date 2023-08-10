
import React from 'react';
import Nba from './components/Nba';
import Mlb from './components/Mlb';

import './App.css';
function App() {
  return (
    <div className="App">
      <Mlb />
      <Nba sport="nba" />
    </div>
  );
}

export default App;
