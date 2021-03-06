import * as React from 'react';
import Demo from 'components/Demo';
import ProgressBar from 'react-toolbox/lib/progress_bar';
import { getPrefixedPath } from 'utils/url';
import classNames from 'classnames';
import progressBarTheme from './ProgressBar.scss';
import styles from './DemoLoader.scss';

function loadScript(src, done) {
  const script = document.createElement('script');
  script.src = src;
  script.async = true;

  script.onload = function() {
    done();
  };

  script.onerror = done.bind(null, new Error(`script load failed for ${src}`));
  document.head.appendChild(script);
}

function loadScriptPromise(src) {
  return new Promise((resolve, reject) => {
    loadScript(src, err => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

function loadScripts(scripts) {
  return Promise.all(scripts.map(s => loadScriptPromise(s)));
}

export default class DemoLoader extends React.Component {
  constructor(props) {
    super(props);

    this.loadedPies = [];

    this.state = {
      loading: [],
      loaded: [],
      configs: {},
    };
  }

  isLoaded(pie) {
    return this.loadedPies.find(p => `${p.name}` === `${pie}`) !== undefined;
  }

  loadConfig = pie => {
    const configPath = `${pie}/config.json`;
    return fetch(getPrefixedPath(configPath))
      .then(r => r.json())
      .catch(e => {
        console.error('error loading config: ', e.message);
      });
  };

  loadPie(pie) {
    const scripts = ['pie-view.js', 'pie-configure.js', 'pie-controllers.js'].map(
      s => `${pie}/${s}`
    );
    const paths = scripts.map(s => getPrefixedPath(s));
    const state = this.state;

    loadScripts(paths)
      .then(() => this.loadConfig(pie))
      .then(config => {
        console.log(this);
        const loading = state.loading.filter(p => p !== pie);
        const loaded = state.loaded.indexOf(pie) === -1 ? state.loaded.concat([pie]) : state.loaded;
        const configs = { ...state.configs, [pie]: config };
        this.setState({ loading, loaded, configs });
      })
      .catch(e => {
        console.error(e);
      });
  }

  componentWillReceiveProps(next) {
    if (next.currentPie && this.state.loaded.indexOf(next.currentPie) === -1) {
      const nextPie = next.currentPie;
      const loading = this.state.loading;
      const update = loading.indexOf(next.currentPie) === -1 ? loading.concat([nextPie]) : loading;
      this.setState({ loading: update });
      this.loadPie(nextPie);
    }
  }

  render() {
    const { currentPie } = this.props;

    const loading = this.state.loaded.find(n => n === currentPie) === undefined;
    const config = this.state.configs[currentPie];
    const show = !loading && currentPie;

    const progressBarClassNames = classNames(
      { [styles.active]: currentPie && loading },
      styles.progressBar
    );

    return (
      <div>
        <ProgressBar
          className={progressBarClassNames}
          theme={progressBarTheme}
          mode="indeterminate"
        />
        {show && (
          <div className={styles.demo}>
            <Demo config={config} tag={currentPie} />
          </div>
        )}
      </div>
    );
  }
}
