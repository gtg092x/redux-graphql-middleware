'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _graphqlFetch = require('graphql-fetch');

var _graphqlFetch2 = _interopRequireDefault(_graphqlFetch);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

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


  var graphFetch = (0, _graphqlFetch2.default)(server);

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

            var fetchMachine = actionServer === undefined ? graphFetch : (0, _graphqlFetch2.default)(actionServer);

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9ncmFwaHFsLW1pZGRsZXdhcmUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7OztBQUVBLFNBQVMsTUFBVCxHQVlRO0FBQUEsbUVBQUosRUFBSTs7QUFBQSxNQVhOLE1BV00sUUFYTixNQVdNO0FBQUEseUJBVk4sTUFVTTtBQUFBLE1BVkUsV0FVRiwrQkFWZ0IsT0FVaEI7QUFBQSxNQVRDLFVBU0QsUUFUTixLQVNNO0FBQUEsTUFSQSxTQVFBLFFBUk4sSUFRTTtBQUFBLE1BUEMsVUFPRCxRQVBOLEtBT007QUFBQSw2QkFOTixVQU1NO0FBQUEsTUFOTixVQU1NLG1DQU5PLGlCQUFFLElBTVQ7QUFBQSw2QkFMTixVQUtNO0FBQUEsTUFMTixVQUtNLG1DQUxPLGlCQUFFLElBS1Q7QUFBQSwrQkFKTixZQUlNO0FBQUEsTUFKTixZQUlNLHFDQUpTLGlCQUFFLElBSVg7QUFBQSw2QkFITixVQUdNO0FBQUEsTUFITSxnQkFHTixtQ0FIeUIsaUJBQUUsSUFHM0I7QUFBQSw0QkFGTixTQUVNO0FBQUEsTUFGSyxlQUVMLGtDQUZ1QixpQkFBRSxRQUV6QjtBQUFBLGlDQUROLGNBQ007QUFBQSxNQURVLG9CQUNWLHVDQURpQyxpQkFBRSxRQUNuQzs7O0FBRU4sTUFBTSxhQUFhLDRCQUFrQixNQUFsQixDQUFuQjs7QUFFQSxTQUFPLGlCQUFTO0FBQ2QsV0FBTyxVQUFDLElBQUQsRUFBVTtBQUNmLGFBQU8sVUFBQyxNQUFELEVBQVk7QUFDakIsWUFBSSxPQUFPLElBQVAsS0FBZ0IsV0FBaEIsSUFBK0IsT0FBTyxPQUExQyxFQUFtRDtBQUFBO0FBQUEsd0JBR2tELE9BQU8sSUFBUCxJQUFlLEVBSGpFOztBQUFBLGdCQUduQyxXQUhtQyxTQUcxQyxLQUgwQztBQUFBLG1DQUd0QixJQUhzQjtBQUFBLGdCQUdoQixPQUhnQiw4QkFHTixFQUhNO0FBQUEsc0NBR0YsT0FIRTtBQUFBLGdCQUdPLFVBSFAsaUNBR29CLEVB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QW5EaUQ7QUFtRmxEO0FBQ0QsZUFBTyxLQUFLLE1BQUwsQ0FBUDtBQUNELE9BdEZEO0FBdUZELEtBeEZEO0FBeUZELEdBMUZEO0FBMkZEOztrQkFFYyxNIiwiZmlsZSI6ImdyYXBocWwtbWlkZGxld2FyZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBncmFwaEZldGNoRmFjdG9yeSBmcm9tICdncmFwaHFsLWZldGNoJztcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5cbmZ1bmN0aW9uIGNvbmZpZyh7XG4gIHNlcnZlcixcbiAgYWN0aW9uOiBncmFwaEFjdGlvbiA9ICdHUkFQSCcsXG4gIHJlYWR5OiBncmFwaFJlYWR5LFxuICBkb25lOiBncmFwaERvbmUsXG4gIGVycm9yOiBncmFwaEVycm9yLFxuICBnZXRIZWFkZXJzID0gXy5ub29wLFxuICBnZXRPcHRpb25zID0gXy5ub29wLFxuICBnZXRWYXJpYWJsZXMgPSBfLm5vb3AsXG4gIG9uQ29tcGxldGU6IG9uQ29tcGxldGVDb25maWcgPSBfLm5vb3AsXG4gIHRyYW5zZm9ybTogdHJhbnNmb3JtQ29uZmlnID0gXy5pZGVudGl0eSxcbiAgZXJyb3JUcmFuc2Zvcm06IGVycm9yVHJhbnNmb3JtQ29uZmlnID0gXy5pZGVudGl0eVxufSA9IHt9KSB7XG5cbiAgY29uc3QgZ3JhcGhGZXRjaCA9IGdyYXBoRmV0Y2hGYWN0b3J5KHNlcnZlcik7XG5cbiAgcmV0dXJuIHN0b3JlID0+IHtcbiAgICByZXR1cm4gKG5leHQpID0+IHtcbiAgICAgIHJldHVybiAoYWN0aW9uKSA9PiB7XG4gICAgICAgIGlmIChhY3Rpb24udHlwZSA9PT0gZ3JhcGhBY3Rpb24gfHwgYWN0aW9uLmdyYXBocWwpIHtcblxuXG4gICAgICAgICAgY29uc3Qge3F1ZXJ5OiBxdWVyeUFyZ1JhdywgdmFyczogdmFyc0FyZyA9IHt9LCBvcHRpb25zOiBvcHRpb25zQXJnID0ge30sIGhlYWRlcnMgPSB7fSwgLi4ucmVzdH0gPSAoYWN0aW9uLmRhdGEgfHwge30pO1xuICAgICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgIHNlcnZlcjogYWN0aW9uU2VydmVyLFxuICAgICAgICAgICAgdHJhbnNmb3JtID0gdHJhbnNmb3JtQ29uZmlnLFxuICAgICAgICAgICAgZXJyb3JUcmFuc2Zvcm0gPSBlcnJvclRyYW5zZm9ybUNvbmZpZyxcbiAgICAgICAgICAgIG9uQ29tcGxldGUgPSBvbkNvbXBsZXRlQ29uZmlnLFxuICAgICAgICAgICAgcmVhZHk6IGFjdGlvblJlYWR5ID0gZ3JhcGhSZWFkeSxcbiAgICAgICAgICAgIGRvbmU6IGFjdGlvbkRvbmUgPSBncmFwaERvbmUsXG4gICAgICAgICAgICBlcnJvcjogYWN0aW9uRXJyb3IgPSBncmFwaEVycm9yLFxuICAgICAgICAgIH0gPSAoYWN0aW9uLmdyYXBocWwgfHwge30pO1xuICAgICAgICAgIGNvbnN0IHF1ZXJ5QXJnID0gcmVzdC5tdXRhdGlvbiB8fCBxdWVyeUFyZ1JhdztcblxuICAgICAgICAgIGNvbnN0IHN0YXRlID0gc3RvcmUuZ2V0U3RhdGUoKTtcbiAgICAgICAgICBjb25zdCBxdWVyeSA9IF8uaXNGdW5jdGlvbihxdWVyeUFyZykgPyBxdWVyeUFyZyhzdGF0ZSkgOiBxdWVyeUFyZztcbiAgICAgICAgICBjb25zdCB2YXJzID0gXy5pc0Z1bmN0aW9uKHZhcnNBcmcpID8gdmFyc0FyZyhzdGF0ZSkgOiB2YXJzQXJnO1xuICAgICAgICAgIGNvbnN0IG9wdGlvbnMgPSBfLmlzRnVuY3Rpb24ob3B0aW9uc0FyZykgPyBvcHRpb25zQXJnKHN0YXRlKSA6IG9wdGlvbnNBcmc7XG5cbiAgICAgICAgICBjb25zdCBzdGF0ZVZhcmlhYmxlcyA9IGdldFZhcmlhYmxlcyhzdGF0ZSkgfHwge307XG4gICAgICAgICAgY29uc3Qgc3RhdGVIZWFkZXJzID0gZ2V0SGVhZGVycyhzdGF0ZSkgfHwge307XG4gICAgICAgICAgY29uc3Qgc3RhdGVPcHRpb25zID0gZ2V0T3B0aW9ucyhzdGF0ZSkgfHwge307XG5cbiAgICAgICAgICBsZXQgb3V0SGVhZGVycyA9IHtcbiAgICAgICAgICAgIC4uLnN0YXRlSGVhZGVycyxcbiAgICAgICAgICAgIGhlYWRlcnNcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgaWYgKCFvdXRIZWFkZXJzLmdldCkge1xuICAgICAgICAgICAgb3V0SGVhZGVycyA9IG5ldyBIZWFkZXJzKG91dEhlYWRlcnMpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IG91dE9wdGlvbnMgPSB7XG4gICAgICAgICAgICAuLi5zdGF0ZU9wdGlvbnMsXG4gICAgICAgICAgICAuLi5vcHRpb25zLFxuICAgICAgICAgICAgaGVhZGVyczogb3V0SGVhZGVyc1xuICAgICAgICAgIH07XG5cbiAgICAgICAgICBjb25zdCBvdXRWYXJzID0ge1xuICAgICAgICAgICAgLi4uc3RhdGVWYXJpYWJsZXMsXG4gICAgICAgICAgICAuLi52YXJzXG4gICAgICAgICAgfTtcbiAgICAgICAgICBpZiAoYWN0aW9uUmVhZHkgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKHtcbiAgICAgICAgICAgICAgdHlwZTogYWN0aW9uUmVhZHksXG4gICAgICAgICAgICAgIGRhdGE6IGZhbHNlXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgIGNvbnN0IGZldGNoTWFjaGluZSA9IGFjdGlvblNlcnZlciA9PT0gdW5kZWZpbmVkID8gZ3JhcGhGZXRjaCA6IGdyYXBoRmV0Y2hGYWN0b3J5KGFjdGlvblNlcnZlcik7XG5cbiAgICAgICAgICBmZXRjaE1hY2hpbmUocXVlcnksXG4gICAgICAgICAgICBvdXRWYXJzLFxuICAgICAgICAgICAgb3V0T3B0aW9uc1xuICAgICAgICAgIClcbiAgICAgICAgICAgIC50aGVuKCh7ZGF0YSwgZXJyb3JzfSA9IHt9KSA9PiB7XG4gICAgICAgICAgICAgIGlmIChlcnJvcnMpIHtcbiAgICAgICAgICAgICAgICBzdG9yZS5kaXNwYXRjaCh7XG4gICAgICAgICAgICAgICAgICB0eXBlOiBncmFwaEVycm9yLFxuICAgICAgICAgICAgICAgICAgZXJyb3I6IGVycm9yVHJhbnNmb3JtKGVycm9ycylcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzdG9yZS5kaXNwYXRjaCh7XG4gICAgICAgICAgICAgICAgICB0eXBlOiBhY3Rpb25Eb25lLFxuICAgICAgICAgICAgICAgICAgZGF0YTogdHJhbnNmb3JtKGRhdGEpXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgb25Db21wbGV0ZShudWxsLCB0cmFuc2Zvcm0oZGF0YSkpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goe1xuICAgICAgICAgICAgICAgIHR5cGU6IGFjdGlvbkVycm9yLFxuICAgICAgICAgICAgICAgIGVycm9yOiBlcnJvclRyYW5zZm9ybShlcnJvcilcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIG9uQ29tcGxldGUoZXJyb3JUcmFuc2Zvcm0oZXJyb3IpKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgIGlmIChhY3Rpb25SZWFkeSAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKHtcbiAgICAgICAgICAgICAgICAgIHR5cGU6IGFjdGlvblJlYWR5LFxuICAgICAgICAgICAgICAgICAgZGF0YTogdHJ1ZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXh0KGFjdGlvbik7XG4gICAgICB9XG4gICAgfTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY29uZmlnO1xuXG5cbiJdfQ==