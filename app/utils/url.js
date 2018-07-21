import noop from 'utils/noop';

let history = {
  location: { pathname: window.location.pathname },
  push: () => {},
  replace: () => {},
  goBack: noop,
};

export function setHistory(newHistory) {
  history = newHistory;
}

/**
 * Parse string to RelativeConfig
 * Match ../../foo locations and common url parts
 *
 * @param {string} str
 * @param {string} pathname
 * @returns RelativeConfig without location
 */
function parseStringConfig(str, pathname) {
  // parse ../../foo links
  const backPlacesMatch = str.match(/\.\.\//g);
  const backPlaces = backPlacesMatch ? backPlacesMatch.length : 0;

  // try to find the matching part
  // e.g. if pathname is /foo/bar/zoo
  // and requested string is bar/doo
  // then we should try to figure that out
  const strParts = str.split('/');
  const firstRequestedPart = strParts[0];
  const rootPart = pathname.split('/').find(part => part === firstRequestedPart);

  // remove root part and .. from the appended path
  const shouldNotInclude = ['..', 'undefined', undefined].concat([rootPart]);
  const append = strParts.filter(part => !shouldNotInclude.includes(part));

  return { backPlaces, rootPart, append };
}

/**
 * Relative URL parsing utility
 *
 * Usage:
 *  Current pathname: /something/level1/level2/foo
 *
 *  relative('alpha');           // --> /something/level1/level2/foo/alpha
 *  relative('../list');         // --> /something/level1/level2/list
 *  relative('beta/charlie');    // --> /something/beta/charlie
 *
 * @export
 * @param {(Object | string)} config
 * @returns
 */
export function relative(config) {
  const defaults = {
    location: history.location,
    backPlaces: 0,
    append: [],
    rootPart: '',
  };

  const args =
    typeof config === 'string' ? parseStringConfig(config, history.location.pathname) : config;

  const cfg = Object.assign({}, defaults, args);

  // make everything an array so it's easier to work with the URL
  const parts = cfg.location.pathname.split('/').filter(Boolean);

  // we're gonna start from the root Part or we take the entire url
  let startPosition = cfg.rootPart
    ? parts.findIndex(part => part === cfg.rootPart)
    : parts.length - 1;

  // if we need to move back, this is the time
  startPosition -= cfg.backPlaces;

  // start the new path, but mind the initial slash
  const startPath = [''].concat(parts.slice(0, startPosition + 1));

  // full new path
  const newPath = startPath.concat(cfg.append);

  // find position of first empty part of the path and break there
  //  to avoid duplicate slashes //
  let breakPosition = newPath.findIndex((part, index) => index > 0 && !part);

  if (breakPosition === -1) {
    breakPosition = newPath.length;
  }

  // return final part
  return newPath.slice(0, breakPosition).join('/');
}

export function push(url) {
  history.push(url);
}

export function replace(url) {
  history.replace(url);
}

export function relativePush(relativeCfg) {
  const url = relative(relativeCfg);
  push(url);
}

export function back() {
  history.goBack();
}

export function getPrefixedRoute(route) {
  return PATH_PREFIX + route;
}
