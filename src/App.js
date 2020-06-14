import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Navigation from './Components/Navigation';
import SendTags from './Components/SendTags';

function App() {
  return (
    <>
      <Navigation />
      <main>
          <Switch>
              <Route exact path='/' component={SendTags} />
          </Switch>
      </main>
  </>
  )
}

export default App;
