import * as React from 'react';
import { connect } from 'react-redux';
import PageTemplate from 'components/PageTemplate';
import { Row, Col } from 'components/Grid';
// import s from './styles.scss';

const Footer = () => (
  <Row>
    <Col xs={12}>Footer Here.</Col>
  </Row>
);

@connect(
  null,
  {}
)
export default class Examples extends React.Component {
  render() {
    return (
      <PageTemplate footer={<Footer />}>
        <Row>
          <Col xs={12}>Examples Page.</Col>
        </Row>
      </PageTemplate>
    );
  }
}
