const parser = require('postcss-scss');

module.exports = ({ env }) => ({
  parser,
  plugins: {
    autoprefixer: {
      remove: false,
    },
    cssnano: env === 'production' ? {} : false,
  },
});
