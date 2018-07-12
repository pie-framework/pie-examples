/* eslint-disable global-require */

if (typeof Promise === 'undefined') {
  require('promise/lib/rejection-tracking').enable();

  // maybe use core-js instead?
  window.Promise = require('promise/lib/es6-extensions.js');
}

require('whatwg-fetch');

// core-js ES.next polyfills
require('core-js/fn/array/fill');
require('core-js/fn/array/filter');
require('core-js/fn/array/find');
require('core-js/fn/array/find-index');
require('core-js/fn/array/from');
require('core-js/fn/array/includes');
require('core-js/fn/array/some');
require('core-js/fn/array/is-array');
require('core-js/fn/array/index-of');
require('core-js/fn/map');
require('core-js/fn/set');
require('core-js/fn/object/assign');
require('core-js/fn/object/entries');
require('core-js/fn/object/keys');
require('core-js/fn/object/values');
require('core-js/fn/string/includes');
require('core-js/fn/string/ends-with');

// async polyfill
require('regenerator-runtime/runtime');
