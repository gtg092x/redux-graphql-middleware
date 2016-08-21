'use strict';

require('whatwg-fetch');

// assert stub
function assert(isOk, err) {
  if (!isOk) {
    throw err;
  }
}

/**
 * create a graphql-fetch bound to a specific graphql url
 * @param  {String} graphqlUrl
 * @return {Function} graphqlFetch
 */
module.exports = function factory(graphqlUrl, fetch) {

  if (fetch === undefined) {
    require('isomorphic-fetch'); // injects globals: fetch, Headers, Request, Response
  }

  /**
   * graphql fetch - fetch w/ smart defaults for graphql requests
   * @param  {Query} query graphql query
   * @param  {Object} vars  graphql query args
   * @param  {Object} opts  fetch options
   * @return {FetchPromise} fetch promise
   */
  return function graphqlFetch(query, vars, opts) {
    assert(query, 'query is required');
    vars = vars || {};
    opts = opts || {};
    opts.body = JSON.stringify({
      query: query,
      variables: vars
    });
    // default opts
    opts.method = opts.method || 'POST';
    opts.headers = opts.headers || new Headers();

    // default headers
    var headers = opts.headers;
    if (!headers.get('content-type')) {
      opts.headers.append('content-type', 'application/json');
    }
    return fetch(graphqlUrl, opts).then(function (res) {
      return res.json();
    });
  };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9ncmFwaHFsLWZldGNoLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOztBQUNBOztBQUVBO0FBQ0EsU0FBUyxNQUFULENBQWlCLElBQWpCLEVBQXVCLEdBQXZCLEVBQTRCO0FBQzFCLE1BQUksQ0FBQyxJQUFMLEVBQVc7QUFDVCxVQUFNLEdBQU47QUFDRDtBQUNGOztBQUVEOzs7OztBQUtBLE9BQU8sT0FBUCxHQUFpQixTQUFTLE9BQVQsQ0FBa0IsVUFBbEIsRUFBOEIsS0FBOUIsRUFBcUM7O0FBRXBELE1BQUksVUFBVSxTQUFkLEVBQXlCO0FBQ3ZCLFlBQVEsa0JBQVIsRUFEdUIsQ0FDTTtBQUM5Qjs7QUFFRDs7Ozs7OztBQU9BLFNBQU8sU0FBUyxZQUFULENBQXVCLEtBQXZCLEVBQThCLElBQTlCLEVBQW9DLElBQXBDLEVBQTBDO0FBQy9DLFdBQU8sS0FBUCxFQUFjLG1CQUFkO0FBQ0EsV0FBTyxRQUFRLEVBQWY7QUFDQSxXQUFPLFFBQVEsRUFBZjtBQUNBLFNBQUssSUFBTCxHQUFZLEtBQUssU0FBTCxDQUFlO0FBQ3pCLGFBQU8sS0FEa0I7QUFFekIsaUJBQVc7QUFGYyxLQUFmLENBQVo7QUFJQTtBQUNBLFNBQUssTUFBTCxHQUFjLEtBQUssTUFBTCxJQUFlLE1BQTdCO0FBQ0EsU0FBSyxPQUFMLEdBQWUsS0FBSyxPQUFMLElBQWdCLElBQUksT0FBSixFQUEvQjs7QUFFQTtBQUNBLFFBQUksVUFBVSxLQUFLLE9BQW5CO0FBQ0EsUUFBSSxDQUFDLFFBQVEsR0FBUixDQUFZLGNBQVosQ0FBTCxFQUFrQztBQUNoQyxXQUFLLE9BQUwsQ0FBYSxNQUFiLENBQW9CLGNBQXBCLEVBQW9DLGtCQUFwQztBQUNEO0FBQ0QsV0FBTyxNQUFNLFVBQU4sRUFBa0IsSUFBbEIsRUFBd0IsSUFBeEIsQ0FBNkIsVUFBVSxHQUFWLEVBQWU7QUFDakQsYUFBTyxJQUFJLElBQUosRUFBUDtBQUNELEtBRk0sQ0FBUDtBQUdELEdBcEJEO0FBcUJELENBbENEIiwiZmlsZSI6ImdyYXBocWwtZmV0Y2guanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCdcbmltcG9ydCAnd2hhdHdnLWZldGNoJztcblxuLy8gYXNzZXJ0IHN0dWJcbmZ1bmN0aW9uIGFzc2VydCAoaXNPaywgZXJyKSB7XG4gIGlmICghaXNPaykge1xuICAgIHRocm93IGVycjtcbiAgfVxufVxuXG4vKipcbiAqIGNyZWF0ZSBhIGdyYXBocWwtZmV0Y2ggYm91bmQgdG8gYSBzcGVjaWZpYyBncmFwaHFsIHVybFxuICogQHBhcmFtICB7U3RyaW5nfSBncmFwaHFsVXJsXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn0gZ3JhcGhxbEZldGNoXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZmFjdG9yeSAoZ3JhcGhxbFVybCwgZmV0Y2gpIHtcblxuICBpZiAoZmV0Y2ggPT09IHVuZGVmaW5lZCkge1xuICAgIHJlcXVpcmUoJ2lzb21vcnBoaWMtZmV0Y2gnKTsgLy8gaW5qZWN0cyBnbG9iYWxzOiBmZXRjaCwgSGVhZGVycywgUmVxdWVzdCwgUmVzcG9uc2VcbiAgfVxuXG4gIC8qKlxuICAgKiBncmFwaHFsIGZldGNoIC0gZmV0Y2ggdy8gc21hcnQgZGVmYXVsdHMgZm9yIGdyYXBocWwgcmVxdWVzdHNcbiAgICogQHBhcmFtICB7UXVlcnl9IHF1ZXJ5IGdyYXBocWwgcXVlcnlcbiAgICogQHBhcmFtICB7T2JqZWN0fSB2YXJzICBncmFwaHFsIHF1ZXJ5IGFyZ3NcbiAgICogQHBhcmFtICB7T2JqZWN0fSBvcHRzICBmZXRjaCBvcHRpb25zXG4gICAqIEByZXR1cm4ge0ZldGNoUHJvbWlzZX0gZmV0Y2ggcHJvbWlzZVxuICAgKi9cbiAgcmV0dXJuIGZ1bmN0aW9uIGdyYXBocWxGZXRjaCAocXVlcnksIHZhcnMsIG9wdHMpIHtcbiAgICBhc3NlcnQocXVlcnksICdxdWVyeSBpcyByZXF1aXJlZCcpXG4gICAgdmFycyA9IHZhcnMgfHwge31cbiAgICBvcHRzID0gb3B0cyB8fCB7fVxuICAgIG9wdHMuYm9keSA9IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgIHF1ZXJ5OiBxdWVyeSxcbiAgICAgIHZhcmlhYmxlczogdmFyc1xuICAgIH0pXG4gICAgLy8gZGVmYXVsdCBvcHRzXG4gICAgb3B0cy5tZXRob2QgPSBvcHRzLm1ldGhvZCB8fCAnUE9TVCdcbiAgICBvcHRzLmhlYWRlcnMgPSBvcHRzLmhlYWRlcnMgfHwgbmV3IEhlYWRlcnMoKVxuXG4gICAgLy8gZGVmYXVsdCBoZWFkZXJzXG4gICAgdmFyIGhlYWRlcnMgPSBvcHRzLmhlYWRlcnNcbiAgICBpZiAoIWhlYWRlcnMuZ2V0KCdjb250ZW50LXR5cGUnKSkge1xuICAgICAgb3B0cy5oZWFkZXJzLmFwcGVuZCgnY29udGVudC10eXBlJywgJ2FwcGxpY2F0aW9uL2pzb24nKVxuICAgIH1cbiAgICByZXR1cm4gZmV0Y2goZ3JhcGhxbFVybCwgb3B0cykudGhlbihmdW5jdGlvbiAocmVzKSB7XG4gICAgICByZXR1cm4gcmVzLmpzb24oKVxuICAgIH0pXG4gIH1cbn1cbiJdfQ==