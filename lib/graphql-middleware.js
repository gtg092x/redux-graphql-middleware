'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _graphqlFetch = require('./graphql-fetch');

var _graphqlFetch2 = _interopRequireDefault(_graphqlFetch);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function getServer(server, state) {
  if (_lodash2.default.isFunction(server)) {
    return server(_extends({}, state));
  }
  return server;
}

function config() {
  var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var server = _ref.server;
  var fetch = _ref.fetch;
  var _ref$action = _ref.action;
  var graphAction = _ref$action === undefined ? 'GRAPH' : _ref$action;
  var graphReady = _ref.ready;
  var graphDone = _ref.done;
  var graphError = _ref.error;
  var _ref$getHeaders = _ref.getHeaders;
  var getHeaders = _ref$getHeaders === undefined ? _lodash2.default.noop : _ref$getHeaders;
  var _ref$getOptions = _ref.getOptions;
  var getOptions = _ref$getOptions === undefined ? _lodash2.default.noop : _ref$getOptions;
  var _ref$getVariables = _ref.getVariables;
  var getVariables = _ref$getVariables === undefined ? _lodash2.default.noop : _ref$getVariables;
  var _ref$onComplete = _ref.onComplete;
  var onCompleteConfig = _ref$onComplete === undefined ? _lodash2.default.noop : _ref$onComplete;
  var _ref$transform = _ref.transform;
  var transformConfig = _ref$transform === undefined ? _lodash2.default.identity : _ref$transform;
  var _ref$errorTransform = _ref.errorTransform;
  var errorTransformConfig = _ref$errorTransform === undefined ? _lodash2.default.identity : _ref$errorTransform;

  if (fetch === undefined) {
    throw '[GraphQL middleware] \'fetch\' is required';
  }

  return function (store) {
    return function (next) {
      return function (action) {
        if (action.type === graphAction || action.graphql) {
          (function () {
            var _ref2 = action.data || {};

            var queryArgRaw = _ref2.query;
            var _ref2$vars = _ref2.vars;
            var varsArg = _ref2$vars === undefined ? {} : _ref2$vars;
            var _ref2$options = _ref2.options;
            var optionsArg = _ref2$options === undefined ? {} : _ref2$options;
            var _ref2$headers = _ref2.headers;
            var headers = _ref2$headers === undefined ? {} : _ref2$headers;

            var rest = _objectWithoutProperties(_ref2, ['query', 'vars', 'options', 'headers']);

            var _ref3 = action.graphql || {};

            var actionServer = _ref3.server;
            var _ref3$transform = _ref3.transform;
            var transform = _ref3$transform === undefined ? transformConfig : _ref3$transform;
            var _ref3$errorTransform = _ref3.errorTransform;
            var errorTransform = _ref3$errorTransform === undefined ? errorTransformConfig : _ref3$errorTransform;
            var _ref3$onComplete = _ref3.onComplete;
            var onComplete = _ref3$onComplete === undefined ? onCompleteConfig : _ref3$onComplete;
            var _ref3$ready = _ref3.ready;
            var actionReady = _ref3$ready === undefined ? graphReady : _ref3$ready;
            var _ref3$done = _ref3.done;
            var actionDone = _ref3$done === undefined ? graphDone : _ref3$done;
            var _ref3$error = _ref3.error;
            var actionError = _ref3$error === undefined ? graphError : _ref3$error;

            var queryArg = rest.mutation || queryArgRaw;

            var state = store.getState();
            var query = _lodash2.default.isFunction(queryArg) ? queryArg(state) : queryArg;
            var vars = _lodash2.default.isFunction(varsArg) ? varsArg(state) : varsArg;
            var options = _lodash2.default.isFunction(optionsArg) ? optionsArg(state) : optionsArg;

            var stateVariables = getVariables(state) || {};
            var stateHeaders = getHeaders(state) || {};
            var stateOptions = getOptions(state) || {};

            var outHeaders = _extends({}, stateHeaders, {
              headers: headers
            });

            if (!outHeaders) {
              outHeaders = {};
            }

            var outOptions = _extends({}, stateOptions, options, {
              headers: outHeaders
            });

            var outVars = _extends({}, stateVariables, vars);
            if (actionReady !== undefined) store.dispatch({
              type: actionReady,
              data: false,
              vars: outVars
            });

            var finalServer = getServer(actionServer === undefined ? server : actionServer, state);

            var fetchMachine = (0, _graphqlFetch2.default)(finalServer, fetch);

            fetchMachine(query, outVars, outOptions).then(function () {
              var _ref4 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

              var data = _ref4.data;
              var errors = _ref4.errors;

              if (errors) {
                store.dispatch({
                  type: actionError,
                  error: errorTransform(errors),
                  vars: outVars
                });
              } else {
                store.dispatch({
                  type: actionDone,
                  data: transform(data),
                  vars: outVars
                });
                onComplete(null, transform(data), outVars);
              }
            }).catch(function (error) {
              store.dispatch({
                type: actionError,
                error: errorTransform(error),
                vars: outVars
              });
              onComplete(errorTransform(error), null, outVars);
            }).then(function () {
              if (actionReady !== undefined) store.dispatch({
                type: actionReady,
                data: true,
                vars: outVars
              });
            });
          })();
        }
        return next(action);
      };
    };
  };
}

exports.default = config;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9ncmFwaHFsLW1pZGRsZXdhcmUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7OztBQUVBLFNBQVMsU0FBVCxDQUFtQixNQUFuQixFQUEyQixLQUEzQixFQUFrQztBQUNoQyxNQUFJLGlCQUFFLFVBQUYsQ0FBYSxNQUFiLENBQUosRUFBMEI7QUFDeEIsV0FBTyxvQkFBVyxLQUFYLEVBQVA7QUFDRDtBQUNELFNBQU8sTUFBUDtBQUNEOztBQUVELFNBQVMsTUFBVCxHQWFRO0FBQUEsbUVBQUosRUFBSTs7QUFBQSxNQVpOLE1BWU0sUUFaTixNQVlNO0FBQUEsTUFYTixLQVdNLFFBWE4sS0FXTTtBQUFBLHlCQVZOLE1BVU07QUFBQSxNQVZFLFdBVUYsK0JBVmdCLE9BVWhCO0FBQUEsTUFUQyxVQVNELFFBVE4sS0FTTTtBQUFBLE1BUkEsU0FRQSxRQVJOLElBUU07QUFBQSxNQVBDLFVBT0QsUUFQTixLQU9NO0FBQUEsNkJBTk4sVUFNTTtBQUFBLE1BTk4sVUFNTSxtQ0FOTyxpQkFBRSxJQU1UO0FBQUEsNkJBTE4sVUFLTTtBQUFBLE1BTE4sVUFLTSxtQ0FMTyxpQkFBRSxJQUtUO0FBQUEsK0JBSk4sWUFJTTtBQUFBLE1BSk4sWUFJTSxxQ0FKUyxpQkFBRSxJQUlYO0FBQUEsNkJBSE4sVUFHTTtBQUFBLE1BSE0sZ0JBR04sbUNBSHlCLGlCQUFFLElBRzNCO0FBQUEsNEJBRk4sU0FFTTtBQUFBLE1BRkssZUFFTCxrQ0FGdUIsaUJBQUUsUUFFekI7QUFBQSxpQ0FETixjQUNNO0FBQUEsTUFEVSxvQkFDVix1Q0FEaUMsaUJBQUUsUUFDbkM7O0FBQ04sTUFBSSxVQUFVLFNBQWQsRUFBeUI7QUFDdkIsVUFBTSw0Q0FBTjtBQUNEOztBQUVELFNBQU8saUJBQVM7QUFDZCxXQUFPLFVBQUMsSUFBRCxFQUFVO0FBQ2YsYUFBTyxVQUFDLE1BQUQsRUFBWTtBQUNqQixZQUFJLE9BQU8sSUFBUCxLQUFnQixXQUFoQixJ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a0MsT0FBbEM7QUFDRDtBQUNGLGFBbkJILEVBb0JHLEtBcEJILENBb0JTLGlCQUFTO0FBQ2Qsb0JBQU0sUUFBTixDQUFlO0FBQ2Isc0JBQU0sV0FETztBQUViLHVCQUFPLGVBQWUsS0FBZixDQUZNO0FBR2Isc0JBQU07QUFITyxlQUFmO0FBS0EseUJBQVcsZUFBZSxLQUFmLENBQVgsRUFBa0MsSUFBbEMsRUFBd0MsT0FBeEM7QUFDRCxhQTNCSCxFQTRCRyxJQTVCSCxDQTRCUSxZQUFNO0FBQ1Ysa0JBQUksZ0JBQWdCLFNBQXBCLEVBQ0UsTUFBTSxRQUFOLENBQWU7QUFDYixzQkFBTSxXQURPO0FBRWIsc0JBQU0sSUFGTztBQUdiLHNCQUFNO0FBSE8sZUFBZjtBQUtMLGFBbkNEO0FBdERpRDtBQTBGbEQ7QUFDRCxlQUFPLEtBQUssTUFBTCxDQUFQO0FBQ0QsT0E3RkQ7QUE4RkQsS0EvRkQ7QUFnR0QsR0FqR0Q7QUFrR0Q7O2tCQUVjLE0iLCJmaWxlIjoiZ3JhcGhxbC1taWRkbGV3YXJlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGdyYXBoRmV0Y2hGYWN0b3J5IGZyb20gJy4vZ3JhcGhxbC1mZXRjaCc7XG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuXG5mdW5jdGlvbiBnZXRTZXJ2ZXIoc2VydmVyLCBzdGF0ZSkge1xuICBpZiAoXy5pc0Z1bmN0aW9uKHNlcnZlcikpIHtcbiAgICByZXR1cm4gc2VydmVyKHsuLi5zdGF0ZX0pO1xuICB9XG4gIHJldHVybiBzZXJ2ZXI7XG59XG5cbmZ1bmN0aW9uIGNvbmZpZyh7XG4gIHNlcnZlcixcbiAgZmV0Y2gsXG4gIGFjdGlvbjogZ3JhcGhBY3Rpb24gPSAnR1JBUEgnLFxuICByZWFkeTogZ3JhcGhSZWFkeSxcbiAgZG9uZTogZ3JhcGhEb25lLFxuICBlcnJvcjogZ3JhcGhFcnJvcixcbiAgZ2V0SGVhZGVycyA9IF8ubm9vcCxcbiAgZ2V0T3B0aW9ucyA9IF8ubm9vcCxcbiAgZ2V0VmFyaWFibGVzID0gXy5ub29wLFxuICBvbkNvbXBsZXRlOiBvbkNvbXBsZXRlQ29uZmlnID0gXy5ub29wLFxuICB0cmFuc2Zvcm06IHRyYW5zZm9ybUNvbmZpZyA9IF8uaWRlbnRpdHksXG4gIGVycm9yVHJhbnNmb3JtOiBlcnJvclRyYW5zZm9ybUNvbmZpZyA9IF8uaWRlbnRpdHlcbn0gPSB7fSkge1xuICBpZiAoZmV0Y2ggPT09IHVuZGVmaW5lZCkge1xuICAgIHRocm93ICdbR3JhcGhRTCBtaWRkbGV3YXJlXSBcXCdmZXRjaFxcJyBpcyByZXF1aXJlZCc7XG4gIH1cblxuICByZXR1cm4gc3RvcmUgPT4ge1xuICAgIHJldHVybiAobmV4dCkgPT4ge1xuICAgICAgcmV0dXJuIChhY3Rpb24pID0+IHtcbiAgICAgICAgaWYgKGFjdGlvbi50eXBlID09PSBncmFwaEFjdGlvbiB8fCBhY3Rpb24uZ3JhcGhxbCkge1xuXG5cbiAgICAgICAgICBjb25zdCB7cXVlcnk6IHF1ZXJ5QXJnUmF3LCB2YXJzOiB2YXJzQXJnID0ge30sIG9wdGlvbnM6IG9wdGlvbnNBcmcgPSB7fSwgaGVhZGVycyA9IHt9LCAuLi5yZXN0fSA9IChhY3Rpb24uZGF0YSB8fCB7fSk7XG4gICAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgc2VydmVyOiBhY3Rpb25TZXJ2ZXIsXG4gICAgICAgICAgICB0cmFuc2Zvcm0gPSB0cmFuc2Zvcm1Db25maWcsXG4gICAgICAgICAgICBlcnJvclRyYW5zZm9ybSA9IGVycm9yVHJhbnNmb3JtQ29uZmlnLFxuICAgICAgICAgICAgb25Db21wbGV0ZSA9IG9uQ29tcGxldGVDb25maWcsXG4gICAgICAgICAgICByZWFkeTogYWN0aW9uUmVhZHkgPSBncmFwaFJlYWR5LFxuICAgICAgICAgICAgZG9uZTogYWN0aW9uRG9uZSA9IGdyYXBoRG9uZSxcbiAgICAgICAgICAgIGVycm9yOiBhY3Rpb25FcnJvciA9IGdyYXBoRXJyb3IsXG4gICAgICAgICAgfSA9IChhY3Rpb24uZ3JhcGhxbCB8fCB7fSk7XG4gICAgICAgICAgY29uc3QgcXVlcnlBcmcgPSByZXN0Lm11dGF0aW9uIHx8IHF1ZXJ5QXJnUmF3O1xuXG4gICAgICAgICAgY29uc3Qgc3RhdGUgPSBzdG9yZS5nZXRTdGF0ZSgpO1xuICAgICAgICAgIGNvbnN0IHF1ZXJ5ID0gXy5pc0Z1bmN0aW9uKHF1ZXJ5QXJnKSA/IHF1ZXJ5QXJnKHN0YXRlKSA6IHF1ZXJ5QXJnO1xuICAgICAgICAgIGNvbnN0IHZhcnMgPSBfLmlzRnVuY3Rpb24odmFyc0FyZykgPyB2YXJzQXJnKHN0YXRlKSA6IHZhcnNBcmc7XG4gICAgICAgICAgY29uc3Qgb3B0aW9ucyA9IF8uaXNGdW5jdGlvbihvcHRpb25zQXJnKSA/IG9wdGlvbnNBcmcoc3RhdGUpIDogb3B0aW9uc0FyZztcblxuICAgICAgICAgIGNvbnN0IHN0YXRlVmFyaWFibGVzID0gZ2V0VmFyaWFibGVzKHN0YXRlKSB8fCB7fTtcbiAgICAgICAgICBjb25zdCBzdGF0ZUhlYWRlcnMgPSBnZXRIZWFkZXJzKHN0YXRlKSB8fCB7fTtcbiAgICAgICAgICBjb25zdCBzdGF0ZU9wdGlvbnMgPSBnZXRPcHRpb25zKHN0YXRlKSB8fCB7fTtcblxuICAgICAgICAgIGxldCBvdXRIZWFkZXJzID0ge1xuICAgICAgICAgICAgLi4uc3RhdGVIZWFkZXJzLFxuICAgICAgICAgICAgaGVhZGVyc1xuICAgICAgICAgIH07XG5cbiAgICAgICAgICBpZiAoIW91dEhlYWRlcnMpIHtcbiAgICAgICAgICAgIG91dEhlYWRlcnMgPSB7fTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zdCBvdXRPcHRpb25zID0ge1xuICAgICAgICAgICAgLi4uc3RhdGVPcHRpb25zLFxuICAgICAgICAgICAgLi4ub3B0aW9ucyxcbiAgICAgICAgICAgIGhlYWRlcnM6IG91dEhlYWRlcnNcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgY29uc3Qgb3V0VmFycyA9IHtcbiAgICAgICAgICAgIC4uLnN0YXRlVmFyaWFibGVzLFxuICAgICAgICAgICAgLi4udmFyc1xuICAgICAgICAgIH07XG4gICAgICAgICAgaWYgKGFjdGlvblJlYWR5ICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaCh7XG4gICAgICAgICAgICAgIHR5cGU6IGFjdGlvblJlYWR5LFxuICAgICAgICAgICAgICBkYXRhOiBmYWxzZSxcbiAgICAgICAgICAgICAgdmFyczogb3V0VmFyc1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICBjb25zdCBmaW5hbFNlcnZlciA9IGdldFNlcnZlcihhY3Rpb25TZXJ2ZXIgPT09IHVuZGVmaW5lZCA/IHNlcnZlciA6IGFjdGlvblNlcnZlciwgc3RhdGUpO1xuXG4gICAgICAgICAgY29uc3QgZmV0Y2hNYWNoaW5lID0gZ3JhcGhGZXRjaEZhY3RvcnkoZmluYWxTZXJ2ZXIsIGZldGNoKTtcblxuICAgICAgICAgIGZldGNoTWFjaGluZShxdWVyeSxcbiAgICAgICAgICAgIG91dFZhcnMsXG4gICAgICAgICAgICBvdXRPcHRpb25zXG4gICAgICAgICAgKVxuICAgICAgICAgICAgLnRoZW4oKHtkYXRhLCBlcnJvcnN9ID0ge30pID0+IHtcbiAgICAgICAgICAgICAgaWYgKGVycm9ycykge1xuICAgICAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKHtcbiAgICAgICAgICAgICAgICAgIHR5cGU6IGFjdGlvbkVycm9yLFxuICAgICAgICAgICAgICAgICAgZXJyb3I6IGVycm9yVHJhbnNmb3JtKGVycm9ycyksXG4gICAgICAgICAgICAgICAgICB2YXJzOiBvdXRWYXJzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goe1xuICAgICAgICAgICAgICAgICAgdHlwZTogYWN0aW9uRG9uZSxcbiAgICAgICAgICAgICAgICAgIGRhdGE6IHRyYW5zZm9ybShkYXRhKSxcbiAgICAgICAgICAgICAgICAgIHZhcnM6IG91dFZhcnNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBvbkNvbXBsZXRlKG51bGwsIHRyYW5zZm9ybShkYXRhKSwgb3V0VmFycyk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgICBzdG9yZS5kaXNwYXRjaCh7XG4gICAgICAgICAgICAgICAgdHlwZTogYWN0aW9uRXJyb3IsXG4gICAgICAgICAgICAgICAgZXJyb3I6IGVycm9yVHJhbnNmb3JtKGVycm9yKSxcbiAgICAgICAgICAgICAgICB2YXJzOiBvdXRWYXJzXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICBvbkNvbXBsZXRlKGVycm9yVHJhbnNmb3JtKGVycm9yKSwgbnVsbCwgb3V0VmFycyk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICBpZiAoYWN0aW9uUmVhZHkgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgICAgICBzdG9yZS5kaXNwYXRjaCh7XG4gICAgICAgICAgICAgICAgICB0eXBlOiBhY3Rpb25SZWFkeSxcbiAgICAgICAgICAgICAgICAgIGRhdGE6IHRydWUsXG4gICAgICAgICAgICAgICAgICB2YXJzOiBvdXRWYXJzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5leHQoYWN0aW9uKTtcbiAgICAgIH1cbiAgICB9O1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBjb25maWc7XG5cblxuIl19