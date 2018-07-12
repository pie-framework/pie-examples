import * as React from 'react';
import classNames from 'classnames/bind';
import s from './styles.scss';

const cx = classNames.bind(s);

const Grid = ({ className, ...rest }) => (
  <section {...rest} className={cx('grid', 'grid--hugged', className)} />
);

Grid.defaultProps = {
  className: '',
};

const Row = ({ className, ...rest }) => (
  <div {...rest} className={cx('grid__row', 'row', className)} />
);

Row.defaultProps = {
  className: '',
};

const Col = ({ xs, sm, md, lg, offsetXs, offsetSm, offsetMd, offsetLg, className, ...rest }) => {
  const colClassNames = cx(
    {
      [`grid__col--xs-${String(xs)}`]: !!xs,
      [`grid__col--sm-${String(sm)}`]: !!sm,
      [`grid__col--md-${String(md)}`]: !!md,
      [`grid__col--lg-${String(lg)}`]: !!lg,
      [`grid__col--xs-offset-${String(offsetXs)}`]: !!offsetXs,
      [`grid__col--sm-offset-${String(offsetSm)}`]: !!offsetSm,
      [`grid__col--md-offset-${String(offsetMd)}`]: !!offsetMd,
      [`grid__col--lg-offset-${String(offsetLg)}`]: !!offsetLg,
    },
    className,
    'col'
  );

  return <div {...rest} className={colClassNames} />;
};

Col.defaultProps = {
  xs: 0,
  sm: 0,
  md: 0,
  lg: 0,
  offsetXs: 0,
  offsetSm: 0,
  offsetMd: 0,
  offsetLg: 0,
  className: '',
};

export { Grid, Row, Col };
