import React from 'react';

import cx from 'classnames';
import { Link as RRLink } from 'react-router-dom';
import Link from '../Link';
import Brand from '../Brand';
import styles from './Header.scss';

export default class Header extends React.Component {
  render() {
    return (
      <header className={styles.root}>
        <div className={styles.navHolder}>
          <div className={cx(styles.brandHolder, styles.showBrand)}>
            <RRLink to="/">
              <Brand />
            </RRLink>
          </div>
          <nav className={styles.nav}>
            <div className={styles.links}>
              <Link to="/docs">Docs</Link>
              <Link to="/examples">Examples</Link>
            </div>
          </nav>
        </div>
      </header>
    );
  }
}
