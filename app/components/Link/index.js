import * as React from 'react';
import { Link } from 'react-router-dom';
import styles from './Link.scss';

export default class AppLink extends React.PureComponent {
  render() {
    const { to, children } = this.props;

    return (
      <div className={styles.root}>
        <Link className={styles.link} to={to}>
          {children}
        </Link>
      </div>
    );
  }
}
