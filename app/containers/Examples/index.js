import * as React from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import DemoLoader from 'components/DemoLoader';
import Header from 'components/Header';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
// import Divider from '@material-ui/core/Divider';
import pies from '../../../pies/pies.json';
import s from './Examples.scss';

@connect(
  null,
  {}
)
export default class Examples extends React.Component {
  state = {
    currentPie: null,
  };

  onClickPie(pie) {
    this.setState({
      currentPie: pie.name,
    });
  }

  render() {
    const { currentPie } = this.state;

    return (
      <div>
        <Header />
        <aside className={s.list}>
          <div className={s.subtitleContainer}>
            <h5 className={s.subtitleHeader}>Examples</h5>
            <div className={s.subtitle}>
              These are initial examples of some PIE interactions. A complete catalog of Open Source
              interactions and tools is under development.
            </div>
          </div>
          <List component="nav">
            {pies.map((p, index) => {
              const selected = currentPie === p.name;
              const onClick = this.onClickPie.bind(this, p);

              return (
                <ListItem button key={index} onClick={onClick}>
                  <ListItemText
                    classes={{ primary: cx({ [s.selected]: selected }) }}
                    primary={p.title}
                    secondary={p.description}
                  />
                </ListItem>
              );
            })}
          </List>
        </aside>
        <div className={s.examples}>
          <DemoLoader pies={pies} currentPie={currentPie} />
        </div>
      </div>
    );
  }
}
