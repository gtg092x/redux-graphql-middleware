import graphFetchFactory from './graphql-fetch';
import _ from 'lodash';

function getServer(server, state) {
  if (_.isFunction(server)) {
    return server({...state});
  }
  return server;
}

function config({
  server,
  fetch,
  action: graphAction = 'GRAPH',
  ready: graphReady,
  done: graphDone,
  error: graphError,
  getHeaders = _.noop,
  getOptions = _.noop,
  getVariables = _.noop,
  onComplete: onCompleteConfig = _.noop,
  transform: transformConfig = _.identity,
  errorTransform: errorTransformConfig = _.identity
} = {}) {


  return store => {
    return (next) => {
      return (action) => {
        if (action.type === graphAction || action.graphql) {


          const {query: queryArgRaw, vars: varsArg = {}, options: optionsArg = {}, headers = {}, ...rest} = (action.data || {});
          const {
            server: actionServer,
            transform = transformConfig,
            errorTransform = errorTransformConfig,
            onComplete = onCompleteConfig,
            ready: actionReady = graphReady,
            done: actionDone = graphDone,
            error: actionError = graphError,
          } = (action.graphql || {});
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
          if (actionReady !== undefined)
            store.dispatch({
              type: actionReady,
              data: false
            });

          const finalServer = getServer(actionServer === undefined ? server : actionServer, state);

          const fetchMachine = graphFetchFactory(finalServer, fetch);

          fetchMachine(query,
            outVars,
            outOptions
          )
            .then(({data, errors} = {}) => {
              if (errors) {
                store.dispatch({
                  type: graphError,
                  error: errorTransform(errors)
                });
              } else {
                store.dispatch({
                  type: actionDone,
                  data: transform(data)
                });
                onComplete(null, transform(data));
              }
            })
            .catch(error => {
              store.dispatch({
                type: actionError,
                error: errorTransform(error)
              });
              onComplete(errorTransform(error));
            })
            .then(() => {
              if (actionReady !== undefined)
                store.dispatch({
                  type: actionReady,
                  data: true
                });
          });
        }
        return next(action);
      }
    };
  };
}

export default config;


