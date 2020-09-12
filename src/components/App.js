import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Layout from './Layout';
import Home from '../pages/Home';
import Badges from '../pages/Badges';
import BadgeNew from '../pages/BadgeNew';
import NotFound from '../pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path="fercc1097.github.io/platzi-badges-challenge/" component={Home} />
          <Route exact path="fercc1097.github.io/platzi-badges-challenge/badges" component={Badges} />
          <Route exact path="fercc1097.github.io/platzi-badges-challenge/badges/new" component={BadgeNew} />
          <Route component={NotFound} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
