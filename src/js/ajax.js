// polyfill for fetch API
import 'whatwg-fetch';

/**
 * Wrapper for native `window.fetch()`
 */
const ajax = {
  sendRequest({body, method = 'GET', success, url}) {
    let options = {
      method: method,
      credentials: 'same-origin'
    };
    // Add additional values to request options if using POST
    if (method === 'POST') {
      options = {
        ...options,
        body,
        // Hard-coded to json for our specific use case
        headers: { 'Content-Type': 'application/json' }
      }
    }

    fetch(url, options).then((res) => {
      let contentType = res.headers.get('content-type');
      // check response is good
      if (
        res.ok &&
        contentType &&
        contentType.indexOf('application/json') > -1
      ) {
        success(res);
      } else {
        let error = new Error(res.statusText);
        error.response = res;
        throw error;
      }
    }).catch((err) => {
      // problem with request
      console.error(`fecth did not resolve: ${err.message}`);
    });
  }
};

export default ajax;
