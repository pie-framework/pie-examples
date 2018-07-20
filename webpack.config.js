/* eslint-disable global-require */

const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const ProgressBar = require('progress-bar-webpack-plugin');
const HappyPack = require('happypack');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const defaults = require('./defaults.js');

const host = process.env.HOST || defaults.HOST;
const port = process.env.PORT || defaults.PORT;
const sourcePath = path.join(__dirname, './app');
const buildDirectory = path.join(__dirname, './build');

const stats = {
  assets: false,
  children: false,
  chunks: false,
  hash: false,
  modules: false,
  publicPath: false,
  timings: true,
  version: false,
  warnings: true,
  excludeAssets: /jpe?g|png|svg|xml|pdf|map|ico|txt|json/,
  colors: {
    green: '\u001b[32m',
  },
};

const iconPath = path.resolve(__dirname, 'app', 'theme', 'icons');

const iconFiles = [
  path.join(iconPath, '/favicon.ico'),
  path.join(iconPath, '/favicon-16x16.png'),
  path.join(iconPath, '/favicon-32x32.png'),
  path.join(iconPath, '/favicon-96x96.png'),
  path.join(iconPath, '/manifest.json'),
  path.join(iconPath, '/android-icon-36x36.png'),
  path.join(iconPath, '/android-icon-48x48.png'),
  path.join(iconPath, '/android-icon-72x72.png'),
  path.join(iconPath, '/android-icon-96x96.png'),
  path.join(iconPath, '/android-icon-144x144.png'),
  path.join(iconPath, '/android-icon-192x192.png'),
  path.join(iconPath, '/apple-icon.png'),
  path.join(iconPath, '/apple-icon-precomposed.png'),
  path.join(iconPath, '/apple-icon-57x57.png'),
  path.join(iconPath, '/apple-icon-60x60.png'),
  path.join(iconPath, '/apple-icon-72x72.png'),
  path.join(iconPath, '/apple-icon-76x76.png'),
  path.join(iconPath, '/apple-icon-114x114.png'),
  path.join(iconPath, '/apple-icon-120x120.png'),
  path.join(iconPath, '/apple-icon-144x144.png'),
  path.join(iconPath, '/apple-icon-152x152.png'),
  path.join(iconPath, '/apple-icon-180x180.png'),
  path.join(iconPath, '/ms-icon-70x70.png'),
  path.join(iconPath, '/ms-icon-144x144.png'),
  path.join(iconPath, '/ms-icon-150x150.png'),
  path.join(iconPath, '/ms-icon-310x310.png'),
  path.join(iconPath, '/browserconfig.xml'),
];

module.exports = function(env) {
  const nodeEnv = env && env.prod ? 'production' : 'development';
  const isProd = nodeEnv === 'production';
  const htmlTemplate = isProd ? 'index.prod.ejs' : 'index.dev.ejs';
  const cacheIdentifier = isProd ? '.cache-loader-prod' : '.cache-loader-dev';

  const cacheLoader = {
    loader: 'cache-loader',
    options: { cacheIdentifier },
  };

  let cssLoader = [
    cacheLoader,
    {
      loader: 'style-loader',
    },
    {
      loader: 'css-loader',
      options: {
        modules: true,
        localIdentName: '[path][name]-[local]',
        importLoaders: 1,
      },
    },
    {
      loader: 'postcss-loader',
      options: {
        sourceMap: false,
      },
    },
    {
      loader: 'sass-loader',
      options: {
        outputStyle: 'expanded',
        sourceMap: false,
        includePaths: [sourcePath],
      },
    },
  ];

  const plugins = [
    new ProgressBar(),
    new webpack.PrefetchPlugin(path.join(sourcePath, '/components/App/index.js')),
    // new webpack.PrefetchPlugin(path.join(sourcePath, '../node_modules/something/index.js')),

    // vendors found in the main entry point
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function(module) {
        if (module.resource && /^.*\.(css|scss)$/.test(module.resource)) {
          return false;
        }
        return module.context && module.context.includes('node_modules');
      },
    }),

    new webpack.optimize.CommonsChunkPlugin({
      minChunks: 3,
      async: 'common',
      children: true,
    }),

    new HappyPack({
      id: 'jsx',
      threads: 4,
      loaders: [
        {
          loader: 'babel-loader',
          options: {
            cacheDirectory: path.join(__dirname, '.babel-cache', isProd ? 'prod' : 'dev'),
          },
        },
      ],
    }),

    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(nodeEnv) },
    }),

    new ExtractTextPlugin({ filename: 'style-[contenthash:5].css' }),

    new HtmlWebpackPlugin({
      template: htmlTemplate,
      inject: true,
      production: isProd,
      minify: isProd && {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),

    new ScriptExtHtmlWebpackPlugin({
      sync: 'vendor',
      defaultAttribute: 'async',
      preload: {
        test: /common-main|^main|^style-.*$/,
        chunks: 'all',
      },
    }),
  ];

  if (isProd) {
    plugins.push(
      new ParallelUglifyPlugin({
        uglifyJS: {
          compress: {
            warnings: false,
            conditionals: true,
            unused: true,
            comparisons: true,
            sequences: true,
            dead_code: true,
            evaluate: true,
            if_return: true,
            join_vars: true,
          },
          output: {
            comments: false,
          },
        },
      }),
      CopyWebpackPlugin([
        // { from: path.resolve(__dirname, './pies'), to: 'pies' },
        path.resolve(__dirname, 'robots.txt'),
        ...iconFiles,
      ]),

      // parallelize css
      new HappyPack({
        id: 'scss',
        threads: 2,
        loaders: [
          {
            loader: 'css-loader',
            options: {
              module: true,
              localIdentName: '[hash:base64:8]',
              importLoaders: 2,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              outputStyle: 'collapsed',
              sourceMap: true,
              includePaths: [sourcePath],
            },
          },
        ],
      })
    );

    cssLoader = ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: [cacheLoader, 'happypack/loader?id=scss'],
    });
  } else {
    plugins.push(
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.DllReferencePlugin({
        context: __dirname,
        manifest: require('./dll/all-manifest.json'),
      }),
      new HappyPack({
        id: 'scss',
        threads: 2,
        loaders: [...cssLoader],
      }),
      CopyWebpackPlugin([
        // { from: path.resolve(__dirname, './pies'), to: 'pies' },
        path.resolve(__dirname, 'dll', 'all.dll.js'),
        ...iconFiles,
      ])
    );

    cssLoader = 'happypack/loader?id=scss';
  }

  /* eslint-disable indent */
  const entryPoint = isProd
    ? [require.resolve('./polyfills'), './index.js']
    : [
        'react-hot-loader/patch',
        `webpack-dev-server/client?http://${host}:${port}`,
        'webpack/hot/only-dev-server',
        require.resolve('./polyfills'),
        // the entry point of our app
        './index.js',
      ];
  /* eslint-enable indent */

  return {
    devtool: isProd ? 'cheap-source-map' : 'eval-cheap-module-source-map',
    context: sourcePath,
    entry: {
      main: entryPoint,
    },
    output: {
      path: buildDirectory,
      publicPath: isProd ? '/pie-examples/' : '/',
      filename: isProd ? '[name].[hash:5].js' : '[name].js',
      chunkFilename: isProd ? 'pie-web.[name].[chunkhash:5].js' : 'pie-web.[name].js',
    },
    module: {
      rules: [
        {
          test: /\.(html|json|svg|png|jpg|gif|ttf|pdf|woff?)$/,
          include: [sourcePath],
          use: [
            {
              loader: 'file-loader',
              query: {
                name: isProd ? 'static/[name]-[hash:5].[ext]' : 'static/[name].[ext]',
              },
            },
          ],
        },
        {
          test: /\.css$/,
          include: path.resolve(__dirname, './node_modules/react-toolbox/lib'),
          use: isProd
            ? ExtractTextPlugin.extract({
                fallback: 'style-loader', // eslint-disable-line indent
                use: ['css-loader', 'postcss-loader'], // eslint-disable-line indent
              }) // eslint-disable-line indent
            : [cacheLoader, 'style-loader', 'css-loader', 'postcss-loader'],
        },
        {
          test: /\.scss$/,
          include: sourcePath,
          use: cssLoader,
        },
        {
          test: /\.(js|jsx)$/,
          include: sourcePath,
          use: ['happypack/loader?id=jsx'],
        },
      ],
    },
    resolve: {
      extensions: ['.webpack-loader.js', '.web-loader.js', '.loader.js', '.js', '.jsx'],
      modules: [path.resolve(__dirname, 'node_modules'), sourcePath],
      symlinks: false,
    },

    plugins,

    performance: isProd && {
      maxAssetSize: 750000,
      maxEntrypointSize: 850000,
      hints: 'warning',
    },

    stats: stats,

    devServer: {
      contentBase: [path.resolve(__dirname, 'build'), path.resolve(__dirname, 'pies')],
      disableHostCheck: true,
      publicPath: '/',
      historyApiFallback: {
        disableDotRule: true,
      },
      port: port,
      host: host,
      hot: !isProd,
      compress: isProd,
      stats: stats,
      after: function(app) {
        app.get('/*', (req, res, next) => {
          if (req.url.indexOf('/static') === 0 || req.url.indexOf(/svg$/i) > 1) {
            res.setHeader('Cache-Control', 'public, s-max-age=2592000');
            res.setHeader('Expires', new Date(Date.now() + 2592000000).toUTCString());
          }
          next();
        });
      },
      watchOptions: {
        ignored: ['node_modules', '*.svg'],
      },
    },

    watchOptions: {
      poll: !!process.env.WEBPACK_POLL,
    },
  };
};
