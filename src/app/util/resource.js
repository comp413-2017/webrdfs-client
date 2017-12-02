const stringifyQs = (qs) => Object.keys(qs).map((key) => `${key}=${qs[key]}`).join('&');

/**
 * Make a client-side request to a server-side endpoint.
 *
 * @param {string} endpoint Endpoint path.
 * @param {string} method HTTP verb for the request.
 * @param {Object} data Optional JSON request payload.
 * @param {Function} cb Callback function to invoke on completion.
 */
const resource = ({ endpoint, method, qs = {}, body = null }, cb) =>
  fetch(`${endpoint}?${stringifyQs(qs)}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    ...body && { body },
  })
    .then((resp) => resp.text().then((respBody) => cb(null, {
      headers: resp.headers,
      status: resp.status,
      statusText: resp.statusText,
      body: respBody,
    })))
    .catch((err) => cb(err));

export default resource;
