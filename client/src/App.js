import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Join from './components/Join'
import Chat from './components/Chat'

const App = () => (
  <Router basename="chat">
    <Switch>
      <Route path="/" exact>
        <Join />
      </Route>
      <Route path="/chat">
        <Chat />
      </Route>
    </Switch>
  </Router>
)

export default App
