import * as React from 'react';
import { connect } from 'react-redux';
import DemoLoader from 'components/DemoLoader';
import PageTemplate from 'components/PageTemplate';
import { Row, Col } from 'components/Grid';
import { List, ListDivider, ListItem, ListSubHeader } from 'react-toolbox/lib/list';
import selectedListItem from './selectedListItem.scss';
import styles from './Examples.scss';
// import s from './styles.scss';

const pies = [
  {
    name: 'function-entry',
    path: 'pies/function-entry',
    title: 'Function Entry',
    description: 'temporary',
  },
];

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
  onClickPie(pie) {
    this.setState({
      currentPie: pie.name,
    });
  }

  componentWillMount() {
    this.setState({ currentPie: pies[0].name });
  }

  render() {
    const { currentPie } = this.state;

    return (
      <PageTemplate>
        <div className={styles.panes}>
          <aside className={styles.list}>
            <List selectable ripple>
              <ListSubHeader caption="Examples" />
              <li className={styles.subtitle}>
                <span>
                  These are initial examples of some PIE interactions. A complete catalog of Open
                  Source interactions and tools is under development.
                </span>
              </li>
              <ListDivider />
              {pies.map((p, index) => {
                const selected = currentPie === p.name;
                const onClick = this.onClickPie.bind(this, p);
                return (
                  <ListItem
                    theme={selected ? selectedListItem : undefined}
                    key={index}
                    caption={p.title}
                    legend={p.description}
                    onClick={onClick}
                  />
                );
              })}
            </List>
          </aside>
          <div className={styles.examples}>
            <DemoLoader pies={pies} currentPie={currentPie} />
          </div>
        </div>
      </PageTemplate>
    );
  }
}
