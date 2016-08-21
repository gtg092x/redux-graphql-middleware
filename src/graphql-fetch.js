'use strict'

// assert stub
function assert (isOk, err) {
  if (!isOk) {
    throw err;
  }
}

/**
 * create a graphql-fetch bound to a specific graphql url
 * @param  {String} graphqlUrl
 * @return {Function} graphqlFetch
 */
module.exports = function factory (graphqlUrl, fetch) {


  /**
   * graphql fetch - fetch w/ smart defaults for graphql requests
   * @param  {Query} query graphql query
   * @param  {Object} vars  graphql query args
   * @param  {Object} opts  fetch options
   * @return {FetchPromise} fetch promise
   */
  return function graphqlFetch (query, vars, opts) {
    assert(query, 'query is required')
    vars = vars || {}
    opts = opts || {}
    opts.body = JSON.stringify({
      query: query,
      variables: vars
    })
    // default opts
    opts.method = opts.method || 'POST';
    opts.headers = opts.headers || {};

    // default headers
    var headers = opts.headers;
    if (!headers['content-type']) {
      opts.headers['content-type'] = 'application/json';
    }
    return fetch(graphqlUrl, opts).then(function (res) {
      return res.json()
    })
  }
}
