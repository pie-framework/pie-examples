import config from 'config/index';

function getFetchUrl(path, host) {
  return `${config.hosts[host]}${path}`;
}

const methods = ['get', 'post', 'put', 'patch', 'delete', 'file'];

export default class ApiClient {
  headers = {
    'Content-Type': 'application/json',
  };

  constructor() {
    methods.forEach(method => {
      this[method] = (path, { headers, data, params } = {}, host = 'local') =>
        fetch(getFetchUrl(path, host, config), {
          method: method === 'file' ? 'POST' : method.toUpperCase(),
          headers: this.getHeaders(headers),
          body:
            data &&
            JSON.stringify({
              ...data,
            }),
          ...params,
        })
          .then(response => {
            if (response.status > 500) {
              return Promise.reject(response);
            }

            return response.json();
          })
          .then(json => {
            if (Array.isArray(json.errors)) {
              return Promise.reject({
                ...json,
                requestData: { ...data },
                requestParams: { ...params },
              });
            }

            if (json.message && json.message.code !== 200) {
              return Promise.reject({
                error: json.message,
                requestData: { ...data },
                requestParams: { ...params },
              });
            }

            return Promise.resolve(json);
          });
    });
  }

  getHeaders(additionalHeaders = {}) {
    return { ...this.headers, ...additionalHeaders };
  }
}
