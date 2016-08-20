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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9ncmFwaHFsLW1pZGRsZXdhcmUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7OztBQUVBLFNBQVMsU0FBVCxDQUFtQixNQUFuQixFQUEyQixLQUEzQixFQUFrQztBQUNoQyxNQUFJLGlCQUFFLFVBQUYsQ0FBYSxNQUFiLENBQUosRUFBMEI7QUFDeEIsV0FBTyxvQkFBVyxLQUFYLEVBQVA7QUFDRDtBQUNELFNBQU8sTUFBUDtBQUNEOztBQUVELFNBQVMsTUFBVCxHQVlRO0FBQUEsbUVBQUosRUFBSTs7QUFBQSxNQVhOLE1BV00sUUFYTixNQVdNO0FBQUEseUJBVk4sTUFVTTtBQUFBLE1BVkUsV0FVRiwrQkFWZ0IsT0FVaEI7QUFBQSxNQVRDLFVBU0QsUUFUTixLQVNNO0FBQUEsTUFSQSxTQVFBLFFBUk4sSUFRTTtBQUFBLE1BUEMsVUFPRCxRQVBOLEtBT007QUFBQSw2QkFOTixVQU1NO0FBQUEsTUFOTixVQU1NLG1DQU5PLGlCQUFFLElBTVQ7QUFBQSw2QkFMTixVQUtNO0FBQUEsTUFMTixVQUtNLG1DQUxPLGlCQUFFLElBS1Q7QUFBQSwrQkFKTixZQUlNO0FBQUEsTUFKTixZQUlNLHFDQUpTLGlCQUFFLElBSVg7QUFBQSw2QkFITixVQUdNO0FBQUEsTUFITSxnQkFHTixtQ0FIeUIsaUJBQUUsSUFHM0I7QUFBQSw0QkFGTixTQUVNO0FBQUEsTUFGSyxlQUVMLGtDQUZ1QixpQkFBRSxRQUV6QjtBQUFBLGlDQUROLGNBQ007QUFBQSxNQURVLG9CQUNWLHVDQURpQyxpQkFBRSxRQUNuQzs7O0FBR04sU0FBTyxpQkFBUztBQUNkLFdBQU8sVUFBQyxJQUFELEVBQVU7QUFDZixhQUFPLFVBQUMsTUFBRCxFQUFZO0FBQ2pCLFlBQUksT0FBTyxJQUFQLEtBQWdCLFdBQWhCLElBQStCLE9BQU8sT0FBMUMsRUFBbUQ7QUFBQTtBQUFBLHdCQUdrRCxPQUFPLElBQVAsSUFBZSxFQUhqRTs7QUFBQSxnQkFHbkMs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QUlBLHlCQUFXLGVBQWUsS0FBZixDQUFYO0FBQ0QsYUF4QkgsRUF5QkcsSUF6QkgsQ0F5QlEsWUFBTTtBQUNWLGtCQUFJLGdCQUFnQixTQUFwQixFQUNFLE1BQU0sUUFBTixDQUFlO0FBQ2Isc0JBQU0sV0FETztBQUViLHNCQUFNO0FBRk8sZUFBZjtBQUlMLGFBL0JEO0FBckRpRDtBQXFGbEQ7QUFDRCxlQUFPLEtBQUssTUFBTCxDQUFQO0FBQ0QsT0F4RkQ7QUF5RkQsS0ExRkQ7QUEyRkQsR0E1RkQ7QUE2RkQ7O2tCQUVjLE0iLCJmaWxlIjoiZ3JhcGhxbC1taWRkbGV3YXJlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGdyYXBoRmV0Y2hGYWN0b3J5IGZyb20gJ2dyYXBocWwtZmV0Y2gnO1xuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcblxuZnVuY3Rpb24gZ2V0U2VydmVyKHNlcnZlciwgc3RhdGUpIHtcbiAgaWYgKF8uaXNGdW5jdGlvbihzZXJ2ZXIpKSB7XG4gICAgcmV0dXJuIHNlcnZlcih7Li4uc3RhdGV9KTtcbiAgfVxuICByZXR1cm4gc2VydmVyO1xufVxuXG5mdW5jdGlvbiBjb25maWcoe1xuICBzZXJ2ZXIsXG4gIGFjdGlvbjogZ3JhcGhBY3Rpb24gPSAnR1JBUEgnLFxuICByZWFkeTogZ3JhcGhSZWFkeSxcbiAgZG9uZTogZ3JhcGhEb25lLFxuICBlcnJvcjogZ3JhcGhFcnJvcixcbiAgZ2V0SGVhZGVycyA9IF8ubm9vcCxcbiAgZ2V0T3B0aW9ucyA9IF8ubm9vcCxcbiAgZ2V0VmFyaWFibGVzID0gXy5ub29wLFxuICBvbkNvbXBsZXRlOiBvbkNvbXBsZXRlQ29uZmlnID0gXy5ub29wLFxuICB0cmFuc2Zvcm06IHRyYW5zZm9ybUNvbmZpZyA9IF8uaWRlbnRpdHksXG4gIGVycm9yVHJhbnNmb3JtOiBlcnJvclRyYW5zZm9ybUNvbmZpZyA9IF8uaWRlbnRpdHlcbn0gPSB7fSkge1xuXG5cbiAgcmV0dXJuIHN0b3JlID0+IHtcbiAgICByZXR1cm4gKG5leHQpID0+IHtcbiAgICAgIHJldHVybiAoYWN0aW9uKSA9PiB7XG4gICAgICAgIGlmIChhY3Rpb24udHlwZSA9PT0gZ3JhcGhBY3Rpb24gfHwgYWN0aW9uLmdyYXBocWwpIHtcblxuXG4gICAgICAgICAgY29uc3Qge3F1ZXJ5OiBxdWVyeUFyZ1JhdywgdmFyczogdmFyc0FyZyA9IHt9LCBvcHRpb25zOiBvcHRpb25zQXJnID0ge30sIGhlYWRlcnMgPSB7fSwgLi4ucmVzdH0gPSAoYWN0aW9uLmRhdGEgfHwge30pO1xuICAgICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgIHNlcnZlcjogYWN0aW9uU2VydmVyLFxuICAgICAgICAgICAgdHJhbnNmb3JtID0gdHJhbnNmb3JtQ29uZmlnLFxuICAgICAgICAgICAgZXJyb3JUcmFuc2Zvcm0gPSBlcnJvclRyYW5zZm9ybUNvbmZpZyxcbiAgICAgICAgICAgIG9uQ29tcGxldGUgPSBvbkNvbXBsZXRlQ29uZmlnLFxuICAgICAgICAgICAgcmVhZHk6IGFjdGlvblJlYWR5ID0gZ3JhcGhSZWFkeSxcbiAgICAgICAgICAgIGRvbmU6IGFjdGlvbkRvbmUgPSBncmFwaERvbmUsXG4gICAgICAgICAgICBlcnJvcjogYWN0aW9uRXJyb3IgPSBncmFwaEVycm9yLFxuICAgICAgICAgIH0gPSAoYWN0aW9uLmdyYXBocWwgfHwge30pO1xuICAgICAgICAgIGNvbnN0IHF1ZXJ5QXJnID0gcmVzdC5tdXRhdGlvbiB8fCBxdWVyeUFyZ1JhdztcblxuICAgICAgICAgIGNvbnN0IHN0YXRlID0gc3RvcmUuZ2V0U3RhdGUoKTtcbiAgICAgICAgICBjb25zdCBxdWVyeSA9IF8uaXNGdW5jdGlvbihxdWVyeUFyZykgPyBxdWVyeUFyZyhzdGF0ZSkgOiBxdWVyeUFyZztcbiAgICAgICAgICBjb25zdCB2YXJzID0gXy5pc0Z1bmN0aW9uKHZhcnNBcmcpID8gdmFyc0FyZyhzdGF0ZSkgOiB2YXJzQXJnO1xuICAgICAgICAgIGNvbnN0IG9wdGlvbnMgPSBfLmlzRnVuY3Rpb24ob3B0aW9uc0FyZykgPyBvcHRpb25zQXJnKHN0YXRlKSA6IG9wdGlvbnNBcmc7XG5cbiAgICAgICAgICBjb25zdCBzdGF0ZVZhcmlhYmxlcyA9IGdldFZhcmlhYmxlcyhzdGF0ZSkgfHwge307XG4gICAgICAgICAgY29uc3Qgc3RhdGVIZWFkZXJzID0gZ2V0SGVhZGVycyhzdGF0ZSkgfHwge307XG4gICAgICAgICAgY29uc3Qgc3RhdGVPcHRpb25zID0gZ2V0T3B0aW9ucyhzdGF0ZSkgfHwge307XG5cbiAgICAgICAgICBsZXQgb3V0SGVhZGVycyA9IHtcbiAgICAgICAgICAgIC4uLnN0YXRlSGVhZGVycyxcbiAgICAgICAgICAgIGhlYWRlcnNcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgaWYgKCFvdXRIZWFkZXJzLmdldCkge1xuICAgICAgICAgICAgb3V0SGVhZGVycyA9IG5ldyBIZWFkZXJzKG91dEhlYWRlcnMpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IG91dE9wdGlvbnMgPSB7XG4gICAgICAgICAgICAuLi5zdGF0ZU9wdGlvbnMsXG4gICAgICAgICAgICAuLi5vcHRpb25zLFxuICAgICAgICAgICAgaGVhZGVyczogb3V0SGVhZGVyc1xuICAgICAgICAgIH07XG5cbiAgICAgICAgICBjb25zdCBvdXRWYXJzID0ge1xuICAgICAgICAgICAgLi4uc3RhdGVWYXJpYWJsZXMsXG4gICAgICAgICAgICAuLi52YXJzXG4gICAgICAgICAgfTtcbiAgICAgICAgICBpZiAoYWN0aW9uUmVhZHkgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKHtcbiAgICAgICAgICAgICAgdHlwZTogYWN0aW9uUmVhZHksXG4gICAgICAgICAgICAgIGRhdGE6IGZhbHNlXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgIGNvbnN0IGZpbmFsU2VydmVyID0gZ2V0U2VydmVyKGFjdGlvblNlcnZlciA9PT0gdW5kZWZpbmVkID8gc2VydmVyIDogYWN0aW9uU2VydmVyLCBzdGF0ZSk7XG5cbiAgICAgICAgICBjb25zdCBmZXRjaE1hY2hpbmUgPSBncmFwaEZldGNoRmFjdG9yeShmaW5hbFNlcnZlcik7XG5cbiAgICAgICAgICBmZXRjaE1hY2hpbmUocXVlcnksXG4gICAgICAgICAgICBvdXRWYXJzLFxuICAgICAgICAgICAgb3V0T3B0aW9uc1xuICAgICAgICAgIClcbiAgICAgICAgICAgIC50aGVuKCh7ZGF0YSwgZXJyb3JzfSA9IHt9KSA9PiB7XG4gICAgICAgICAgICAgIGlmIChlcnJvcnMpIHtcbiAgICAgICAgICAgICAgICBzdG9yZS5kaXNwYXRjaCh7XG4gICAgICAgICAgICAgICAgICB0eXBlOiBncmFwaEVycm9yLFxuICAgICAgICAgICAgICAgICAgZXJyb3I6IGVycm9yVHJhbnNmb3JtKGVycm9ycylcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzdG9yZS5kaXNwYXRjaCh7XG4gICAgICAgICAgICAgICAgICB0eXBlOiBhY3Rpb25Eb25lLFxuICAgICAgICAgICAgICAgICAgZGF0YTogdHJhbnNmb3JtKGRhdGEpXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgb25Db21wbGV0ZShudWxsLCB0cmFuc2Zvcm0oZGF0YSkpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goe1xuICAgICAgICAgICAgICAgIHR5cGU6IGFjdGlvbkVycm9yLFxuICAgICAgICAgICAgICAgIGVycm9yOiBlcnJvclRyYW5zZm9ybShlcnJvcilcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIG9uQ29tcGxldGUoZXJyb3JUcmFuc2Zvcm0oZXJyb3IpKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgIGlmIChhY3Rpb25SZWFkeSAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKHtcbiAgICAgICAgICAgICAgICAgIHR5cGU6IGFjdGlvblJlYWR5LFxuICAgICAgICAgICAgICAgICAgZGF0YTogdHJ1ZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXh0KGFjdGlvbik7XG4gICAgICB9XG4gICAgfTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY29uZmlnO1xuXG5cbiJdfQ==