import * as React from 'react';

import Chunk from 'components/Chunk';

const load = () => import('containers/Examples/Routes' /* webpackChunkName: "examples" */);  // eslint-disable-line prettier/prettier

export default class ExamplesRoute extends React.Component {
  render() {
    return <Chunk load={load} />;
  }
}
