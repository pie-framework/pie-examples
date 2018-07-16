import React from 'react';
import Svg from 'react-svg-inline';
import styles from './Brand.scss';

const logoSvg =
  '<svg id="Layer_1" version="1.1" viewBox="0 0 512 512" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g><path d="M240,272V64C125.125,64,32,157.125,32,272s93.125,208,208,208s208-93.125,208-208H240z M240,432   c-88.227,0-160-71.781-160-160c0-71.516,47.148-132.219,112-152.641v199.047h200.648C372.211,383.25,311.508,432,240,432z M272,32   v208h208C480,125.125,386.875,32,272,32z"/></g></svg>';

export default class Brand extends React.PureComponent {
  render() {
    return (
      <div className={styles.brand}>
        <div className={styles.logo}>
          <Svg width="42" svg={logoSvg} className={styles.svg} />
        </div>
        <div className={styles.logoText}>Pie</div>
        <small>framework</small>
      </div>
    );
  }
}
