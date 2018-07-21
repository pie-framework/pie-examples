import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import Examples from 'containers/Examples';
import { getPrefixedPath } from 'utils/url';

const ExamplesRoutes = () => (
  <Switch>
    <Route path={getPrefixedPath('examples')} component={Examples} />
  </Switch>
);

export default ExamplesRoutes;
