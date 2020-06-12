import React from 'react';
import './App.css';
import SendTags from './SendTags';

function App() {
  return (
    <div className="App">
      <header className="App-header" style={{backgroundColor: "#153D5C"}}>
      <img alt="nr_beta_logo" 
          src="https://noterouter-staging.firebaseapp.com/static/media/logo.b10c9223.png" 
          style={{width: '30%'}} />
        <SendTags />
      </header>
    </div>
  );
}

export default App;
