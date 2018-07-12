import * as React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from 'components/App';
import store from 'store';

const renderApp = Component =>
  render(
    <Provider store={store}>
      <Router>
        <AppContainer>
          <Component />
        </AppContainer>
      </Router>
    </Provider>,
    document.getElementById('root')
  );

renderApp(App);

if (module.hot) {
  module.hot.accept('components/App', () => renderApp(App));
}
