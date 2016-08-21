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

            var fetchMachine = (0, _graphqlFetch2.default)(finalServer, fetch);

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9ncmFwaHFsLW1pZGRsZXdhcmUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7OztBQUVBLFNBQVMsU0FBVCxDQUFtQixNQUFuQixFQUEyQixLQUEzQixFQUFrQztBQUNoQyxNQUFJLGlCQUFFLFVBQUYsQ0FBYSxNQUFiLENBQUosRUFBMEI7QUFDeEIsV0FBTyxvQkFBVyxLQUFYLEVBQVA7QUFDRDtBQUNELFNBQU8sTUFBUDtBQUNEOztBQUVELFNBQVMsTUFBVCxHQWFRO0FBQUEsbUVBQUosRUFBSTs7QUFBQSxNQVpOLE1BWU0sUUFaTixNQVlNO0FBQUEsTUFYTixLQVdNLFFBWE4sS0FXTTtBQUFBLHlCQVZOLE1BVU07QUFBQSxNQVZFLFdBVUYsK0JBVmdCLE9BVWhCO0FBQUEsTUFUQyxVQVNELFFBVE4sS0FTTTtBQUFBLE1BUkEsU0FRQSxRQVJOLElBUU07QUFBQSxNQVBDLFVBT0QsUUFQTixLQU9NO0FBQUEsNkJBTk4sVUFNTTtBQUFBLE1BTk4sVUFNTSxtQ0FOTyxpQkFBRSxJQU1UO0FBQUEsNkJBTE4sVUFLTTtBQUFBLE1BTE4sVUFLTSxtQ0FMTyxpQkFBRSxJQUtUO0FBQUEsK0JBSk4sWUFJTTtBQUFBLE1BSk4sWUFJTSxxQ0FKUyxpQkFBRSxJQUlYO0FBQUEsNkJBSE4sVUFHTTtBQUFBLE1BSE0sZ0JBR04sbUNBSHlCLGlCQUFFLElBRzNCO0FBQUEsNEJBRk4sU0FFTTtBQUFBLE1BRkssZUFFTCxrQ0FGdUIsaUJBQUUsUUFFekI7QUFBQSxpQ0FETixjQUNNO0FBQUEsTUFEVSxvQkFDVix1Q0FEaUMsaUJBQUUsUUFDbkM7OztBQUdOLFNBQU8saUJBQVM7QUFDZCxXQUFPLFVBQUMsSUFBRCxFQUFVO0FBQ2YsYUFBTyxVQUFDLE1BQUQsRUFBWTtBQUNqQixZQUFJLE9BQU8sSUFBUCxLQUFnQixXQUFoQixJQUErQixPQUFPLE9BQTFDLEVBQW1EO0FBQUE7QUFBQSx3QkFHa0QsT0FBTyxJQUFQ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V0FETztBQUViLHVCQUFPLGVBQWUsS0FBZjtBQUZNLGVBQWY7QUFJQSx5QkFBVyxlQUFlLEtBQWYsQ0FBWDtBQUNELGFBeEJILEVBeUJHLElBekJILENBeUJRLFlBQU07QUFDVixrQkFBSSxnQkFBZ0IsU0FBcEIsRUFDRSxNQUFNLFFBQU4sQ0FBZTtBQUNiLHNCQUFNLFdBRE87QUFFYixzQkFBTTtBQUZPLGVBQWY7QUFJTCxhQS9CRDtBQXJEaUQ7QUFxRmxEO0FBQ0QsZUFBTyxLQUFLLE1BQUwsQ0FBUDtBQUNELE9BeEZEO0FBeUZELEtBMUZEO0FBMkZELEdBNUZEO0FBNkZEOztrQkFFYyxNIiwiZmlsZSI6ImdyYXBocWwtbWlkZGxld2FyZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBncmFwaEZldGNoRmFjdG9yeSBmcm9tICcuL2dyYXBocWwtZmV0Y2gnO1xuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcblxuZnVuY3Rpb24gZ2V0U2VydmVyKHNlcnZlciwgc3RhdGUpIHtcbiAgaWYgKF8uaXNGdW5jdGlvbihzZXJ2ZXIpKSB7XG4gICAgcmV0dXJuIHNlcnZlcih7Li4uc3RhdGV9KTtcbiAgfVxuICByZXR1cm4gc2VydmVyO1xufVxuXG5mdW5jdGlvbiBjb25maWcoe1xuICBzZXJ2ZXIsXG4gIGZldGNoLFxuICBhY3Rpb246IGdyYXBoQWN0aW9uID0gJ0dSQVBIJyxcbiAgcmVhZHk6IGdyYXBoUmVhZHksXG4gIGRvbmU6IGdyYXBoRG9uZSxcbiAgZXJyb3I6IGdyYXBoRXJyb3IsXG4gIGdldEhlYWRlcnMgPSBfLm5vb3AsXG4gIGdldE9wdGlvbnMgPSBfLm5vb3AsXG4gIGdldFZhcmlhYmxlcyA9IF8ubm9vcCxcbiAgb25Db21wbGV0ZTogb25Db21wbGV0ZUNvbmZpZyA9IF8ubm9vcCxcbiAgdHJhbnNmb3JtOiB0cmFuc2Zvcm1Db25maWcgPSBfLmlkZW50aXR5LFxuICBlcnJvclRyYW5zZm9ybTogZXJyb3JUcmFuc2Zvcm1Db25maWcgPSBfLmlkZW50aXR5XG59ID0ge30pIHtcblxuXG4gIHJldHVybiBzdG9yZSA9PiB7XG4gICAgcmV0dXJuIChuZXh0KSA9PiB7XG4gICAgICByZXR1cm4gKGFjdGlvbikgPT4ge1xuICAgICAgICBpZiAoYWN0aW9uLnR5cGUgPT09IGdyYXBoQWN0aW9uIHx8IGFjdGlvbi5ncmFwaHFsKSB7XG5cblxuICAgICAgICAgIGNvbnN0IHtxdWVyeTogcXVlcnlBcmdSYXcsIHZhcnM6IHZhcnNBcmcgPSB7fSwgb3B0aW9uczogb3B0aW9uc0FyZyA9IHt9LCBoZWFkZXJzID0ge30sIC4uLnJlc3R9ID0gKGFjdGlvbi5kYXRhIHx8IHt9KTtcbiAgICAgICAgICBjb25zdCB7XG4gICAgICAgICAgICBzZXJ2ZXI6IGFjdGlvblNlcnZlcixcbiAgICAgICAgICAgIHRyYW5zZm9ybSA9IHRyYW5zZm9ybUNvbmZpZyxcbiAgICAgICAgICAgIGVycm9yVHJhbnNmb3JtID0gZXJyb3JUcmFuc2Zvcm1Db25maWcsXG4gICAgICAgICAgICBvbkNvbXBsZXRlID0gb25Db21wbGV0ZUNvbmZpZyxcbiAgICAgICAgICAgIHJlYWR5OiBhY3Rpb25SZWFkeSA9IGdyYXBoUmVhZHksXG4gICAgICAgICAgICBkb25lOiBhY3Rpb25Eb25lID0gZ3JhcGhEb25lLFxuICAgICAgICAgICAgZXJyb3I6IGFjdGlvbkVycm9yID0gZ3JhcGhFcnJvcixcbiAgICAgICAgICB9ID0gKGFjdGlvbi5ncmFwaHFsIHx8IHt9KTtcbiAgICAgICAgICBjb25zdCBxdWVyeUFyZyA9IHJlc3QubXV0YXRpb24gfHwgcXVlcnlBcmdSYXc7XG5cbiAgICAgICAgICBjb25zdCBzdGF0ZSA9IHN0b3JlLmdldFN0YXRlKCk7XG4gICAgICAgICAgY29uc3QgcXVlcnkgPSBfLmlzRnVuY3Rpb24ocXVlcnlBcmcpID8gcXVlcnlBcmcoc3RhdGUpIDogcXVlcnlBcmc7XG4gICAgICAgICAgY29uc3QgdmFycyA9IF8uaXNGdW5jdGlvbih2YXJzQXJnKSA/IHZhcnNBcmcoc3RhdGUpIDogdmFyc0FyZztcbiAgICAgICAgICBjb25zdCBvcHRpb25zID0gXy5pc0Z1bmN0aW9uKG9wdGlvbnNBcmcpID8gb3B0aW9uc0FyZyhzdGF0ZSkgOiBvcHRpb25zQXJnO1xuXG4gICAgICAgICAgY29uc3Qgc3RhdGVWYXJpYWJsZXMgPSBnZXRWYXJpYWJsZXMoc3RhdGUpIHx8IHt9O1xuICAgICAgICAgIGNvbnN0IHN0YXRlSGVhZGVycyA9IGdldEhlYWRlcnMoc3RhdGUpIHx8IHt9O1xuICAgICAgICAgIGNvbnN0IHN0YXRlT3B0aW9ucyA9IGdldE9wdGlvbnMoc3RhdGUpIHx8IHt9O1xuXG4gICAgICAgICAgbGV0IG91dEhlYWRlcnMgPSB7XG4gICAgICAgICAgICAuLi5zdGF0ZUhlYWRlcnMsXG4gICAgICAgICAgICBoZWFkZXJzXG4gICAgICAgICAgfTtcblxuICAgICAgICAgIGlmICghb3V0SGVhZGVycy5nZXQpIHtcbiAgICAgICAgICAgIG91dEhlYWRlcnMgPSBuZXcgSGVhZGVycyhvdXRIZWFkZXJzKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zdCBvdXRPcHRpb25zID0ge1xuICAgICAgICAgICAgLi4uc3RhdGVPcHRpb25zLFxuICAgICAgICAgICAgLi4ub3B0aW9ucyxcbiAgICAgICAgICAgIGhlYWRlcnM6IG91dEhlYWRlcnNcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgY29uc3Qgb3V0VmFycyA9IHtcbiAgICAgICAgICAgIC4uLnN0YXRlVmFyaWFibGVzLFxuICAgICAgICAgICAgLi4udmFyc1xuICAgICAgICAgIH07XG4gICAgICAgICAgaWYgKGFjdGlvblJlYWR5ICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICBzdG9yZS5kaXNwYXRjaCh7XG4gICAgICAgICAgICAgIHR5cGU6IGFjdGlvblJlYWR5LFxuICAgICAgICAgICAgICBkYXRhOiBmYWxzZVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICBjb25zdCBmaW5hbFNlcnZlciA9IGdldFNlcnZlcihhY3Rpb25TZXJ2ZXIgPT09IHVuZGVmaW5lZCA/IHNlcnZlciA6IGFjdGlvblNlcnZlciwgc3RhdGUpO1xuXG4gICAgICAgICAgY29uc3QgZmV0Y2hNYWNoaW5lID0gZ3JhcGhGZXRjaEZhY3RvcnkoZmluYWxTZXJ2ZXIsIGZldGNoKTtcblxuICAgICAgICAgIGZldGNoTWFjaGluZShxdWVyeSxcbiAgICAgICAgICAgIG91dFZhcnMsXG4gICAgICAgICAgICBvdXRPcHRpb25zXG4gICAgICAgICAgKVxuICAgICAgICAgICAgLnRoZW4oKHtkYXRhLCBlcnJvcnN9ID0ge30pID0+IHtcbiAgICAgICAgICAgICAgaWYgKGVycm9ycykge1xuICAgICAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKHtcbiAgICAgICAgICAgICAgICAgIHR5cGU6IGdyYXBoRXJyb3IsXG4gICAgICAgICAgICAgICAgICBlcnJvcjogZXJyb3JUcmFuc2Zvcm0oZXJyb3JzKVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKHtcbiAgICAgICAgICAgICAgICAgIHR5cGU6IGFjdGlvbkRvbmUsXG4gICAgICAgICAgICAgICAgICBkYXRhOiB0cmFuc2Zvcm0oZGF0YSlcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBvbkNvbXBsZXRlKG51bGwsIHRyYW5zZm9ybShkYXRhKSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgICBzdG9yZS5kaXNwYXRjaCh7XG4gICAgICAgICAgICAgICAgdHlwZTogYWN0aW9uRXJyb3IsXG4gICAgICAgICAgICAgICAgZXJyb3I6IGVycm9yVHJhbnNmb3JtKGVycm9yKVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgb25Db21wbGV0ZShlcnJvclRyYW5zZm9ybShlcnJvcikpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgaWYgKGFjdGlvblJlYWR5ICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goe1xuICAgICAgICAgICAgICAgICAgdHlwZTogYWN0aW9uUmVhZHksXG4gICAgICAgICAgICAgICAgICBkYXRhOiB0cnVlXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5leHQoYWN0aW9uKTtcbiAgICAgIH1cbiAgICB9O1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBjb25maWc7XG5cblxuIl19