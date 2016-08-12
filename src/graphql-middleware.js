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
        if (action.type === graphAction || action.graphql) {


          const {query: queryArgRaw, vars: varsArg = {}, options: optionsArg = {}, headers = {}, ...rest} = (action.data || {});
          const {server: actionServer, ready: actionReady = graphReady, done: actionDone = graphDone, error: actionError = graphError, } = (action.graphql || {});
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
            type: actionReady,
            data: false
          });

          const fetchMachine = actionServer === undefined ? graphFetch : graphFetchFactory(actionServer);

          fetchMachine(query,
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
                  type: actionDone,
                  data
                });
              }
            })
            .catch(err => store.dispatch({
              type: actionError,
              error: error
            }))
            .then(() => store.dispatch({
              type: actionReady,
              data: true
            }));
        }
        return next(action);
      }
    };
  };
}

export default config;


