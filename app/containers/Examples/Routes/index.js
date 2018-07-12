import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import Examples from 'containers/Examples';

const ExamplesRoutes = () => (
  <Switch>
    <Route path="/examples" component={Examples} />
  </Switch>
);

export default ExamplesRoutes;
