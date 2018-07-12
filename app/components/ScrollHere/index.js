import * as React from 'react';

let queue = 0;

function isScrolledIntoView(el, fullscreen = false) {
  if (!el) return true;

  const height = window.innerHeight;

  const rect = el.getBoundingClientRect();
  const minTop = fullscreen ? -1 : height * 0.02;
  const maxBottom = height * 0.7;

  queue += 1;

  return rect.top >= minTop && rect.bottom <= maxBottom;
}

export default class ScrollHere extends React.Component {
  static defaultProps = {
    timeout: 10,
  };

  componentDidMount() {
    this.asyncScrollIntoView();
  }

  componentDidUpdate() {
    const { location } = this.props;

    // don't scroll if there is a hash fragment
    if (location && location.hash) {
      return;
    }

    this.asyncScrollIntoView();
  }

  asyncScrollIntoView = () => setTimeout(() => this.scrollIntoView(), this.props.timeout);

  scrollIntoView = (lazyCheck = false) => {
    if (!lazyCheck) {
      queue = 0;
    }

    if (this.el && !isScrolledIntoView(this.el) && (queue === 1 || lazyCheck)) {
      this.el.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => !isScrolledIntoView(this.el, true) && this.scrollIntoView(true), 500);
    }
  };

  render() {
    return <div style={{ height: 0, width: 0 }} ref={el => (this.el = el)} />;
  }
}
