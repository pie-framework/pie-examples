import * as React from 'react';

export default class Chunk extends React.Component {
  state = {
    mod: null,
  };

  componentWillMount() {
    this.load(this.props);
  }

  componentWillReceiveProps(nextProps) {
    const { load } = this.props;

    if (nextProps.load !== load) {
      this.load(nextProps);
    }
  }

  load(props) {
    this.setState({
      mod: null,
    });

    props.load().then(mod => {
      this.setState({
        mod: mod.default,
      });
    });
  }

  render() {
    const { mod: Cmp } = this.state;

    return Cmp ? <Cmp {...this.props} /> : null;
  }
}
