import React, { Component } from 'react';
import logo from './logo.svg';
import ListContainer from './containers/ListContainer';
import ResultContainer from './containers/ResultContainer';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
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
