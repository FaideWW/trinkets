import React, { Component } from 'react';
import ImporterContainer from './containers/ImporterContainer';
import ListContainer from './containers/ListContainer';
import ResultContainer from './containers/ResultContainer';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1>Faide's Trinket Comparison Generator</h1>
          <hr />
          <p>
            How to use: add trinkets to the list on the left. Wowhead URLs will be auto-parsed into SimC strings, but you can also just paste in your own trinket strings.
          </p>
          <p>
            Copy the generated output on the right into SimulationCraft's <code>Overrides</code> tab. Use 'Pairs' to generate trinket combinations, or 'Single' to compare individual trinkets.
          </p>
          <p>
            <a href="https://github.com/FaideWW/trinkets/issues">Report issues/request features here.</a>
          </p>
        </div>
        <div className="column">
          <ImporterContainer />
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
