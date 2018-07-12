const webpack = require('webpack');
const path = require('path');

const outputPath = path.resolve('dll');
const sourcePath = path.resolve('app');

module.exports = {
  devtool: 'source-map',
  entry: {
    all: [
      'core-js',
      'sockjs-client',
      'classnames',
      'react',
      'react-dom',
      'react-hot-loader',
      'react-redux',
      'react-router',
      'react-router-dom',
      'redux',
      'redux-thunk',
      'whatwg-fetch',
      'smoothscroll-polyfill',
      'webpack-dev-server/client',
      'react-loadable',
      'react-transition-group',
      'query-string',
      'prop-types',
    ],
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: sourcePath,
        use: 'babel-loader',
      },
      {
        test: /\.(svg|png|jpg|gif)$/,
        loader: 'url-loader',
      },
    ],
  },

  resolve: {
    modules: [path.resolve(__dirname, 'node_modules'), sourcePath],
  },

  output: {
    filename: '[name].dll.js',
    path: outputPath,
    library: '[name]_dll',
  },

  plugins: [
    new webpack.DllPlugin({
      path: 'dll/[name]-manifest.json',
      name: '[name]_dll',
    }),
  ],
};
