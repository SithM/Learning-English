import React, { Component } from "react";
import "./App.css";
import ListVocabulary from "./Views/Components/ListVocabulary";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <ListVocabulary />
        </header>
      </div>
    );
  }
}

export default App;
