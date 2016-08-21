'use strict';

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
    opts.headers = opts.headers || {};

    // default headers
    var headers = opts.headers;
    if (!headers['content-type']) {
      opts.headers['content-type'] = 'application/json';
    }
    return fetch(graphqlUrl, opts).then(function (res) {
      return res.json();
    });
  };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9ncmFwaHFsLWZldGNoLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBOztBQUNBLFNBQVMsTUFBVCxDQUFpQixJQUFqQixFQUF1QixHQUF2QixFQUE0QjtBQUMxQixNQUFJLENBQUMsSUFBTCxFQUFXO0FBQ1QsVUFBTSxHQUFOO0FBQ0Q7QUFDRjs7QUFFRDs7Ozs7QUFLQSxPQUFPLE9BQVAsR0FBaUIsU0FBUyxPQUFULENBQWtCLFVBQWxCLEVBQThCLEtBQTlCLEVBQXFDOztBQUdwRDs7Ozs7OztBQU9BLFNBQU8sU0FBUyxZQUFULENBQXVCLEtBQXZCLEVBQThCLElBQTlCLEVBQW9DLElBQXBDLEVBQTBDO0FBQy9DLFdBQU8sS0FBUCxFQUFjLG1CQUFkO0FBQ0EsV0FBTyxRQUFRLEVBQWY7QUFDQSxXQUFPLFFBQVEsRUFBZjtBQUNBLFNBQUssSUFBTCxHQUFZLEtBQUssU0FBTCxDQUFlO0FBQ3pCLGFBQU8sS0FEa0I7QUFFekIsaUJBQVc7QUFGYyxLQUFmLENBQVo7QUFJQTtBQUNBLFNBQUssTUFBTCxHQUFjLEtBQUssTUFBTCxJQUFlLE1BQTdCO0FBQ0EsU0FBSyxPQUFMLEdBQWUsS0FBSyxPQUFMLElBQWdCLEVBQS9COztBQUVBO0FBQ0EsUUFBSSxVQUFVLEtBQUssT0FBbkI7QUFDQSxRQUFJLENBQUMsUUFBUSxjQUFSLENBQUwsRUFBOEI7QUFDNUIsV0FBSyxPQUFMLENBQWEsY0FBYixJQUErQixrQkFBL0I7QUFDRDtBQUNELFdBQU8sTUFBTSxVQUFOLEVBQWtCLElBQWxCLEVBQXdCLElBQXhCLENBQTZCLFVBQVUsR0FBVixFQUFlO0FBQ2pELGFBQU8sSUFBSSxJQUFKLEVBQVA7QUFDRCxLQUZNLENBQVA7QUFHRCxHQXBCRDtBQXFCRCxDQS9CRCIsImZpbGUiOiJncmFwaHFsLWZldGNoLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnXG5cbi8vIGFzc2VydCBzdHViXG5mdW5jdGlvbiBhc3NlcnQgKGlzT2ssIGVycikge1xuICBpZiAoIWlzT2spIHtcbiAgICB0aHJvdyBlcnI7XG4gIH1cbn1cblxuLyoqXG4gKiBjcmVhdGUgYSBncmFwaHFsLWZldGNoIGJvdW5kIHRvIGEgc3BlY2lmaWMgZ3JhcGhxbCB1cmxcbiAqIEBwYXJhbSAge1N0cmluZ30gZ3JhcGhxbFVybFxuICogQHJldHVybiB7RnVuY3Rpb259IGdyYXBocWxGZXRjaFxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGZhY3RvcnkgKGdyYXBocWxVcmwsIGZldGNoKSB7XG5cblxuICAvKipcbiAgICogZ3JhcGhxbCBmZXRjaCAtIGZldGNoIHcvIHNtYXJ0IGRlZmF1bHRzIGZvciBncmFwaHFsIHJlcXVlc3RzXG4gICAqIEBwYXJhbSAge1F1ZXJ5fSBxdWVyeSBncmFwaHFsIHF1ZXJ5XG4gICAqIEBwYXJhbSAge09iamVjdH0gdmFycyAgZ3JhcGhxbCBxdWVyeSBhcmdzXG4gICAqIEBwYXJhbSAge09iamVjdH0gb3B0cyAgZmV0Y2ggb3B0aW9uc1xuICAgKiBAcmV0dXJuIHtGZXRjaFByb21pc2V9IGZldGNoIHByb21pc2VcbiAgICovXG4gIHJldHVybiBmdW5jdGlvbiBncmFwaHFsRmV0Y2ggKHF1ZXJ5LCB2YXJzLCBvcHRzKSB7XG4gICAgYXNzZXJ0KHF1ZXJ5LCAncXVlcnkgaXMgcmVxdWlyZWQnKVxuICAgIHZhcnMgPSB2YXJzIHx8IHt9XG4gICAgb3B0cyA9IG9wdHMgfHwge31cbiAgICBvcHRzLmJvZHkgPSBKU09OLnN0cmluZ2lmeSh7XG4gICAgICBxdWVyeTogcXVlcnksXG4gICAgICB2YXJpYWJsZXM6IHZhcnNcbiAgICB9KVxuICAgIC8vIGRlZmF1bHQgb3B0c1xuICAgIG9wdHMubWV0aG9kID0gb3B0cy5tZXRob2QgfHwgJ1BPU1QnO1xuICAgIG9wdHMuaGVhZGVycyA9IG9wdHMuaGVhZGVycyB8fCB7fTtcblxuICAgIC8vIGRlZmF1bHQgaGVhZGVyc1xuICAgIHZhciBoZWFkZXJzID0gb3B0cy5oZWFkZXJzO1xuICAgIGlmICghaGVhZGVyc1snY29udGVudC10eXBlJ10pIHtcbiAgICAgIG9wdHMuaGVhZGVyc1snY29udGVudC10eXBlJ10gPSAnYXBwbGljYXRpb24vanNvbic7XG4gICAgfVxuICAgIHJldHVybiBmZXRjaChncmFwaHFsVXJsLCBvcHRzKS50aGVuKGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgIHJldHVybiByZXMuanNvbigpXG4gICAgfSlcbiAgfVxufVxuIl19