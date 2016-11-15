import React, { Component } from 'react';
import ListContainer from './containers/ListContainer';
import ResultContainer from './containers/ResultContainer';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1>Faide's Trinket Comparison Generator</h1>
          <p>
            How to use: Add trinkets to the list on the left.  Copy the generated output on the right into SimulationCraft's <code>Overrides</code> tab.  
          </p>
        </div>
        <div className="column">
          <ListContainer />
        </div>
        <div className="column result">
          <ResultContainer />
        </div>
      </div>
    );
  }
}

export default App;
