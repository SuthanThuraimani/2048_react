import React from 'react';
import './App.css';

function App() {
  return (
      <div className="App">
          <header>        
            <h1>2048</h1>              
          </header>
          <div className="wrapper">
              <div className="inner">
                  <div className="cell">
                      <h2>8</h2>
                  </div>
                  <div className="cell">
                      <h2>4</h2>
                  </div>
                  <div className="cell">
                      <h2>2</h2>
                  </div>
                  <div className="cell">
                      <h2>6</h2>
                  </div>
              </div>
          </div>

    </div>
  );
}

export default App;
