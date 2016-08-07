import graphFetchFactory from 'graphql-fetch';
import _ from 'lodash';

function config({
  server,
  action: graphAction = 'GRAPH',
  ready: graphReady,
  done: graphDone,
  error: graphError,
  getHeaders = _.noop,
  getOptions = _.noop,
  getVariables = _.noop
} = {}) {

  const graphFetch = graphFetchFactory(server);

  return store => {
    return (next) => {
      return (action) => {
        if (action.type === graphAction) {


          const {query: queryArgRaw, vars: varsArg = {}, options: optionsArg = {}, headers = {}, ...rest} = (action.data || {});
          const queryArg = rest.mutation || queryArgRaw;

          const state = store.getState();
          const query = _.isFunction(queryArg) ? queryArg(state) : queryArg;
          const vars = _.isFunction(varsArg) ? varsArg(state) : varsArg;
          const options = _.isFunction(optionsArg) ? optionsArg(state) : optionsArg;

          const stateVariables = getVariables(state) || {};
          const stateHeaders = getHeaders(state) || {};
          const stateOptions = getOptions(state) || {};

          let outHeaders = {
            ...stateHeaders,
            headers
          };

          if (!outHeaders.get) {
            outHeaders = new Headers(outHeaders);
          }

          const outOptions = {
            ...stateOptions,
            ...options,
            headers: outHeaders
          };

          const outVars = {
            ...stateVariables,
            ...vars
          };
          store.dispatch({
            type: graphReady,
            data: false
          });

          graphFetch(query,
            outVars,
            outOptions
          )
            .then(({data, errors} = {}) => {
              if (errors) {
                store.dispatch({
                  type: graphError,
                  error: errors
                });
              } else {
                store.dispatch({
                  type: graphDone,
                  data
                });
              }
            })
            .catch(err => store.dispatch({
              type: graphError,
              error: error
            }))
            .then(() => store.dispatch({
              type: graphReady,
              data: true
            }));
        }
        return next(action);
      }
    };
  };
}

export default config;


