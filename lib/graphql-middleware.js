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

            if (!outHeaders.get) {
              outHeaders = new Headers(outHeaders);
            }

            var outOptions = _extends({}, stateOptions, options, {
              headers: outHeaders
            });

            var outVars = _extends({}, stateVariables, vars);
            if (actionReady !== undefined) store.dispatch({
              type: actionReady,
              data: false
            });

            var finalServer = getServer(actionServer === undefined ? server : actionServer, state);

            var fetchMachine = (0, _graphqlFetch2.default)(finalServer);

            fetchMachine(query, outVars, outOptions).then(function () {
              var _ref4 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

              var data = _ref4.data;
              var errors = _ref4.errors;

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
            }).catch(function (error) {
              store.dispatch({
                type: actionError,
                error: errorTransform(error)
              });
              onComplete(errorTransform(error));
            }).then(function () {
              if (actionReady !== undefined) store.dispatch({
                type: actionReady,
                data: true
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9ncmFwaHFsLW1pZGRsZXdhcmUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7OztBQUVBLFNBQVMsU0FBVCxDQUFtQixNQUFuQixFQUEyQixLQUEzQixFQUFrQztBQUNoQyxNQUFJLGlCQUFFLFVBQUYsQ0FBYSxNQUFiLENBQUosRUFBMEI7QUFDeEIsV0FBTyxvQkFBVyxLQUFYLEVBQVA7QUFDRDtBQUNELFNBQU8sTUFBUDtBQUNEOztBQUVELFNBQVMsTUFBVCxHQVlRO0FBQUEsbUVBQUosRUFBSTs7QUFBQSxNQVhOLE1BV00sUUFYTixNQVdNO0FBQUEseUJBVk4sTUFVTTtBQUFBLE1BVkUsV0FVRiwrQkFWZ0IsT0FVaEI7QUFBQSxNQVRDLFVBU0QsUUFUTixLQVNNO0FBQUEsTUFSQSxTQVFBLFFBUk4sSUFRTTtBQUFBLE1BUEMsVUFPRCxRQVBOLEtBT007QUFBQSw2QkFOTixVQU1NO0FBQUEsTUFOTixVQU1NLG1DQU5PLGlCQUFFLElBTVQ7QUFBQSw2QkFMTixVQUtNO0FBQUEsTUFMTixVQUtNLG1DQUxPLGlCQUFFLElBS1Q7QUFBQSwrQkFKTixZQUlNO0FBQUEsTUFKTixZQUlNLHFDQUpTLGlCQUFFLElBSVg7QUFBQSw2QkFITixVQUdNO0FBQUEsTUFITSxnQkFHTixtQ0FIeUIsaUJBQUUsSUFHM0I7QUFBQSw0QkFGTixTQUVNO0FBQUEsTUFGSyxlQUVMLGtDQUZ1QixpQkFBRSxRQUV6QjtBQUFBLGlDQUROLGNBQ007QUFBQSxNQURVLG9CQUNWLHVDQURpQyxpQkFBRSxRQUNuQzs7O0FBR04sU0FBTyxpQkFBUztBQUNkLFdBQU8sVUFBQyxJQUFELEVBQVU7QUFDZixhQUFPLFVBQUMsTUFBRCxFQUFZO0FBQ2pCLFlBQUksT0FBTyxJQUFQLEtBQWdCLFdBQWhCLElBQStCLE9BQU8sT0FBMUMsRUFBbUQ7QUFBQTtBQUFBLHdCQUdrRCxPQUFPLElBQVAsSUFBZSxFQUhqRTs7QUFBQSxnQkFHbkMs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QUlBLHlCQUFXLGVBQWUsS0FBZixDQUFYO0FBQ0QsYUF4QkgsRUF5QkcsSUF6QkgsQ0F5QlEsWUFBTTtBQUNWLGtCQUFJLGdCQUFnQixTQUFwQixFQUNFLE1BQU0sUUFBTixDQUFlO0FBQ2Isc0JBQU0sV0FETztBQUViLHNCQUFNO0FBRk8sZUFBZjtBQUlMLGFBL0JEO0FBckRpRDtBQXFGbEQ7QUFDRCxlQUFPLEtBQUssTUFBTCxDQUFQO0FBQ0QsT0F4RkQ7QUF5RkQsS0ExRkQ7QUEyRkQsR0E1RkQ7QUE2RkQ7O2tCQUVjLE0iLCJmaWxlIjoiZ3JhcGhxbC1taWRkbGV3YXJlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGdyYXBoRmV0Y2hGYWN0b3J5IGZyb20gJy4vZ3JhcGhxbC1mZXRjaCc7XG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuXG5mdW5jdGlvbiBnZXRTZXJ2ZXIoc2VydmVyLCBzdGF0ZSkge1xuICBpZiAoXy5pc0Z1bmN0aW9uKHNlcnZlcikpIHtcbiAgICByZXR1cm4gc2VydmVyKHsuLi5zdGF0ZX0pO1xuICB9XG4gIHJldHVybiBzZXJ2ZXI7XG59XG5cbmZ1bmN0aW9uIGNvbmZpZyh7XG4gIHNlcnZlcixcbiAgYWN0aW9uOiBncmFwaEFjdGlvbiA9ICdHUkFQSCcsXG4gIHJlYWR5OiBncmFwaFJlYWR5LFxuICBkb25lOiBncmFwaERvbmUsXG4gIGVycm9yOiBncmFwaEVycm9yLFxuICBnZXRIZWFkZXJzID0gXy5ub29wLFxuICBnZXRPcHRpb25zID0gXy5ub29wLFxuICBnZXRWYXJpYWJsZXMgPSBfLm5vb3AsXG4gIG9uQ29tcGxldGU6IG9uQ29tcGxldGVDb25maWcgPSBfLm5vb3AsXG4gIHRyYW5zZm9ybTogdHJhbnNmb3JtQ29uZmlnID0gXy5pZGVudGl0eSxcbiAgZXJyb3JUcmFuc2Zvcm06IGVycm9yVHJhbnNmb3JtQ29uZmlnID0gXy5pZGVudGl0eVxufSA9IHt9KSB7XG5cblxuICByZXR1cm4gc3RvcmUgPT4ge1xuICAgIHJldHVybiAobmV4dCkgPT4ge1xuICAgICAgcmV0dXJuIChhY3Rpb24pID0+IHtcbiAgICAgICAgaWYgKGFjdGlvbi50eXBlID09PSBncmFwaEFjdGlvbiB8fCBhY3Rpb24uZ3JhcGhxbCkge1xuXG5cbiAgICAgICAgICBjb25zdCB7cXVlcnk6IHF1ZXJ5QXJnUmF3LCB2YXJzOiB2YXJzQXJnID0ge30sIG9wdGlvbnM6IG9wdGlvbnNBcmcgPSB7fSwgaGVhZGVycyA9IHt9LCAuLi5yZXN0fSA9IChhY3Rpb24uZGF0YSB8fCB7fSk7XG4gICAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgc2VydmVyOiBhY3Rpb25TZXJ2ZXIsXG4gICAgICAgICAgICB0cmFuc2Zvcm0gPSB0cmFuc2Zvcm1Db25maWcsXG4gICAgICAgICAgICBlcnJvclRyYW5zZm9ybSA9IGVycm9yVHJhbnNmb3JtQ29uZmlnLFxuICAgICAgICAgICAgb25Db21wbGV0ZSA9IG9uQ29tcGxldGVDb25maWcsXG4gICAgICAgICAgICByZWFkeTogYWN0aW9uUmVhZHkgPSBncmFwaFJlYWR5LFxuICAgICAgICAgICAgZG9uZTogYWN0aW9uRG9uZSA9IGdyYXBoRG9uZSxcbiAgICAgICAgICAgIGVycm9yOiBhY3Rpb25FcnJvciA9IGdyYXBoRXJyb3IsXG4gICAgICAgICAgfSA9IChhY3Rpb24uZ3JhcGhxbCB8fCB7fSk7XG4gICAgICAgICAgY29uc3QgcXVlcnlBcmcgPSByZXN0Lm11dGF0aW9uIHx8IHF1ZXJ5QXJnUmF3O1xuXG4gICAgICAgICAgY29uc3Qgc3RhdGUgPSBzdG9yZS5nZXRTdGF0ZSgpO1xuICAgICAgICAgIGNvbnN0IHF1ZXJ5ID0gXy5pc0Z1bmN0aW9uKHF1ZXJ5QXJnKSA/IHF1ZXJ5QXJnKHN0YXRlKSA6IHF1ZXJ5QXJnO1xuICAgICAgICAgIGNvbnN0IHZhcnMgPSBfLmlzRnVuY3Rpb24odmFyc0FyZykgPyB2YXJzQXJnKHN0YXRlKSA6IHZhcnNBcmc7XG4gICAgICAgICAgY29uc3Qgb3B0aW9ucyA9IF8uaXNGdW5jdGlvbihvcHRpb25zQXJnKSA/IG9wdGlvbnNBcmcoc3RhdGUpIDogb3B0aW9uc0FyZztcblxuICAgICAgICAgIGNvbnN0IHN0YXRlVmFyaWFibGVzID0gZ2V0VmFyaWFibGVzKHN0YXRlKSB8fCB7fTtcbiAgICAgICAgICBjb25zdCBzdGF0ZUhlYWRlcnMgPSBnZXRIZWFkZXJzKHN0YXRlKSB8fCB7fTtcbiAgICAgICAgICBjb25zdCBzdGF0ZU9wdGlvbnMgPSBnZXRPcHRpb25zKHN0YXRlKSB8fCB7fTtcblxuICAgICAgICAgIGxldCBvdXRIZWFkZXJzID0ge1xuICAgICAgICAgICAgLi4uc3RhdGVIZWFkZXJzLFxuICAgICAgICAgICAgaGVhZGVyc1xuICAgICAgICAgIH07XG5cbiAgICAgICAgICBpZiAoIW91dEhlYWRlcnMuZ2V0KSB7XG4gICAgICAgICAgICBvdXRIZWFkZXJzID0gbmV3IEhlYWRlcnMob3V0SGVhZGVycyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3Qgb3V0T3B0aW9ucyA9IHtcbiAgICAgICAgICAgIC4uLnN0YXRlT3B0aW9ucyxcbiAgICAgICAgICAgIC4uLm9wdGlvbnMsXG4gICAgICAgICAgICBoZWFkZXJzOiBvdXRIZWFkZXJzXG4gICAgICAgICAgfTtcblxuICAgICAgICAgIGNvbnN0IG91dFZhcnMgPSB7XG4gICAgICAgICAgICAuLi5zdGF0ZVZhcmlhYmxlcyxcbiAgICAgICAgICAgIC4uLnZhcnNcbiAgICAgICAgICB9O1xuICAgICAgICAgIGlmIChhY3Rpb25SZWFkeSAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goe1xuICAgICAgICAgICAgICB0eXBlOiBhY3Rpb25SZWFkeSxcbiAgICAgICAgICAgICAgZGF0YTogZmFsc2VcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgY29uc3QgZmluYWxTZXJ2ZXIgPSBnZXRTZXJ2ZXIoYWN0aW9uU2VydmVyID09PSB1bmRlZmluZWQgPyBzZXJ2ZXIgOiBhY3Rpb25TZXJ2ZXIsIHN0YXRlKTtcblxuICAgICAgICAgIGNvbnN0IGZldGNoTWFjaGluZSA9IGdyYXBoRmV0Y2hGYWN0b3J5KGZpbmFsU2VydmVyKTtcblxuICAgICAgICAgIGZldGNoTWFjaGluZShxdWVyeSxcbiAgICAgICAgICAgIG91dFZhcnMsXG4gICAgICAgICAgICBvdXRPcHRpb25zXG4gICAgICAgICAgKVxuICAgICAgICAgICAgLnRoZW4oKHtkYXRhLCBlcnJvcnN9ID0ge30pID0+IHtcbiAgICAgICAgICAgICAgaWYgKGVycm9ycykge1xuICAgICAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKHtcbiAgICAgICAgICAgICAgICAgIHR5cGU6IGdyYXBoRXJyb3IsXG4gICAgICAgICAgICAgICAgICBlcnJvcjogZXJyb3JUcmFuc2Zvcm0oZXJyb3JzKVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKHtcbiAgICAgICAgICAgICAgICAgIHR5cGU6IGFjdGlvbkRvbmUsXG4gICAgICAgICAgICAgICAgICBkYXRhOiB0cmFuc2Zvcm0oZGF0YSlcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBvbkNvbXBsZXRlKG51bGwsIHRyYW5zZm9ybShkYXRhKSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgICBzdG9yZS5kaXNwYXRjaCh7XG4gICAgICAgICAgICAgICAgdHlwZTogYWN0aW9uRXJyb3IsXG4gICAgICAgICAgICAgICAgZXJyb3I6IGVycm9yVHJhbnNmb3JtKGVycm9yKVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgb25Db21wbGV0ZShlcnJvclRyYW5zZm9ybShlcnJvcikpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgaWYgKGFjdGlvblJlYWR5ICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goe1xuICAgICAgICAgICAgICAgICAgdHlwZTogYWN0aW9uUmVhZHksXG4gICAgICAgICAgICAgICAgICBkYXRhOiB0cnVlXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5leHQoYWN0aW9uKTtcbiAgICAgIH1cbiAgICB9O1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBjb25maWc7XG5cblxuIl19