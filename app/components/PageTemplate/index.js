import * as React from 'react';
import cx from 'classnames';
import { Row, Col } from 'components/Grid';

import s from './styles.scss';

export default class PageTemplate extends React.PureComponent {
  componentWillMount() {
    const { left, right, hasQuickLinks } = this.props;

    if (left && right) {
      this.contentSize.left = {
        xs: 12,
        sm: 4,
        md: 3,
      };
      this.contentSize.center = {
        xs: 12,
        sm: 4,
        md: 6,
      };
      this.contentSize.right = {
        xs: 12,
        sm: 4,
        md: 3,
      };
    } else if (!left && !right) {
      this.contentSize.center = {
        xs: 12,
      };
    } else {
      this.contentSize.left = {
        xs: 12,
        sm: hasQuickLinks ? 12 : 4,
        md: 3,
      };
      this.contentSize.center = {
        xs: 12,
        sm: hasQuickLinks ? 12 : 8,
        md: 9,
      };
      this.contentSize.right = {
        xs: 12,
        sm: 4,
        md: 3,
      };
    }
  }

  contentSize = {
    left: {},
    center: {},
    right: {},
  };

  render() {
    const { children, left, right, className, contentClassName, footer, customHeader } = this.props;

    return (
      <div className={cx(s.pageContent, className)}>
        {customHeader}
        <article className={s.contentWrapper}>
          <Row className={contentClassName}>
            {left && <Col {...this.contentSize.left}>{left}</Col>}
            <Col {...this.contentSize.center}>{children}</Col>
            {right && <Col {...this.contentSize.right}>{right}</Col>}
          </Row>
        </article>
        {footer || null}
      </div>
    );
  }
}
