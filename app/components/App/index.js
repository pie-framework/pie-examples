import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { setHistory } from 'utils/url';
import AppRoutes from './AppRoutes';

@withRouter
@connect(
  null,
  {}
)
export default class App extends React.Component {
  static defaultProps = {
    history: {},
    location: {
      pathname: '',
    },
  };

  componentWillMount() {
    const { history } = this.props;

    setHistory(history);
  }

  render() {
    return <AppRoutes />;
  }
}
