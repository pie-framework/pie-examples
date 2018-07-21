import * as React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import ScrollHere from 'components/ScrollHere';
import ExamplesRoute from 'routes/Examples';
import { getPrefixedRoute } from 'utils/url';
import s from './style.scss';

@withRouter
@connect(
  null,
  {}
)
export default class Anonymous extends React.Component {
  render() {
    return (
      <div className={s.app}>
        <ScrollHere key="scrollHere" />
        <main className={s.main}>
          <Switch key="route">
            <Redirect exact from="/" to={getPrefixedRoute('examples')} />
            <Redirect exact from={getPrefixedRoute()} to={getPrefixedRoute('examples')} />
            <Route path={getPrefixedRoute('examples')} component={ExamplesRoute} />
          </Switch>
        </main>
      </div>
    );
  }
}
