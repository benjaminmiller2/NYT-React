import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NoMatch from './Pages/NoMatch';
import Home from './Pages/Home';

const App = () => (
    <Router>
      <div>
        {/* the Switch marks what changes. Place constants - header, footer, etc - around the Switch */}
        <Switch>
          <Route exact path="/" component={Home} />
          <Route component={NoMatch} />
          </Switch>
        </div>
      </Router>
);

export default App;
