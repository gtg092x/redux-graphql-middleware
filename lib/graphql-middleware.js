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

            var outVars = _extends({}, stateVariables, vars, action.vars || {});
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9ncmFwaHFsLW1pZGRsZXdhcmUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7OztBQUVBLFNBQVMsU0FBVCxDQUFtQixNQUFuQixFQUEyQixLQUEzQixFQUFrQztBQUNoQyxNQUFJLGlCQUFFLFVBQUYsQ0FBYSxNQUFiLENBQUosRUFBMEI7QUFDeEIsV0FBTyxvQkFBVyxLQUFYLEVBQVA7QUFDRDtBQUNELFNBQU8sTUFBUDtBQUNEOztBQUVELFNBQVMsTUFBVCxHQWFRO0FBQUEsbUVBQUosRUFBSTs7QUFBQSxNQVpOLE1BWU0sUUFaTixNQVlNO0FBQUEsTUFYTixLQVdNLFFBWE4sS0FXTTtBQUFBLHlCQVZOLE1BVU07QUFBQSxNQVZFLFdBVUYsK0JBVmdCLE9BVWhCO0FBQUEsTUFUQyxVQVNELFFBVE4sS0FTTTtBQUFBLE1BUkEsU0FRQSxRQVJOLElBUU07QUFBQSxNQVBDLFVBT0QsUUFQTixLQU9NO0FBQUEsNkJBTk4sVUFNTTtBQUFBLE1BTk4sVUFNTSxtQ0FOTyxpQkFBRSxJQU1UO0FBQUEsNkJBTE4sVUFLTTtBQUFBLE1BTE4sVUFLTSxtQ0FMTyxpQkFBRSxJQUtUO0FBQUEsK0JBSk4sWUFJTTtBQUFBLE1BSk4sWUFJTSxxQ0FKUyxpQkFBRSxJQUlYO0FBQUEsNkJBSE4sVUFHTTtBQUFBLE1BSE0sZ0JBR04sbUNBSHlCLGlCQUFFLElBRzNCO0FBQUEsNEJBRk4sU0FFTTtBQUFBLE1BRkssZUFFTCxrQ0FGdUIsaUJBQUUsUUFFekI7QUFBQSxpQ0FETixjQUNNO0FBQUEsTUFEVSxvQkFDVix1Q0FEaUMsaUJBQUUsUUFDbkM7O0FBQ04sTUFBSSxVQUFVLFNBQWQsRUFBeUI7QUFDdkIsVUFBTSw0Q0FBTjtBQUNEOztBQUVELFNBQU8saUJBQVM7QUFDZCxXQUFPLFVBQUMsSUFBRCxFQUFVO0FBQ2YsYUFBTyxVQUFDLE1BQUQsRUFBWTtBQUNqQixZQUFJLE9BQU8sSUFBUCxLQUFnQixXQUFoQixJQUErQixPQUFPLE9BQTFDLEVBQW1EO0FBQUE7QUFBQSx3QkFHa0QsT0FBTyxJQUFQLElBQWUsRUFIakU7O0FBQUEsZ0JBR25DLFdBSG1DLFNBRzFDLEtBSDBDO0FBQUEsbUNBR3RCLElBSHNCO0FBQUEsZ0JBR2hCLE9BSGdCLDhCQUdOLEVBSE07QUFBQSxzQ0FHRixPQUhFO0FBQUEsZ0JBR08sVUFIUCxpQ0FHb0IsRUFIcEI7QUFBQSxzQ0FHd0IsT0FIeEI7QUFBQSxnQkFHd0IsT0FIeEIsaUNBR2tDLEVBSGxDOztBQUFBLGdCQUd5QyxJQUh6Qzs7QUFBQSx3QkFZNUMsT0FBTyxPQUFQLElBQWtCLEVBWjBCOztBQUFBLGdCQUt2QyxZQUx1QyxTQUsvQyxNQUwrQztBQUFBLHdDQU0vQyxTQU4rQztBQUFBLGdCQU0vQyxTQU4rQyxtQ0FNbkMsZUFObUM7QUFBQSw2Q0FPL0MsY0FQK0M7QUFBQSxnQkFPL0MsY0FQK0Msd0NBTzlCLG9CQVA4QjtBQUFBLHlDQVEvQyxVQVIrQztBQUFBLGdCQVEvQyxVQVIrQyxvQ0FRbEMsZ0JBUmtDO0FBQUEsb0NBUy9DLEtBVCtDO0FBQUEsZ0JBU3hDLFdBVHdDLCtCQVMxQixVQVQwQjtBQUFBLG1DQVUvQyxJQVYrQztBQUFBLGdCQVV6QyxVQVZ5Qyw4QkFVNUIsU0FWNEI7QUFBQSxvQ0FXL0MsS0FYK0M7QUFBQSxnQkFXeEMsV0FYd0MsK0JBVzFCLFVBWDBCOztBQWFqRCxnQkFBTSxXQUFXLEtBQUssUUFBTCxJQUFpQixXQUFsQzs7QUFFQSxnQkFBTSxRQUFRLE1BQU0sUUFBTixFQUFkO0FBQ0EsZ0JBQU0sUUFBUSxpQkFBRSxVQUFGLENBQWEsUUFBYixJQUF5QixTQUFTLEtBQVQsQ0FBekIsR0FBMkMsUUFBekQ7QUFDQSxnQkFBTSxPQUFPLGlCQUFFLFVBQUYsQ0FBYSxPQUFiLElBQXdCLFFBQVEsS0FBUixDQUF4QixHQUF5QyxPQUF0RDtBQUNBLGdCQUFNLFVBQVUsaUJBQUUsVUFBRixDQUFhLFVBQWIsSUFBMkIsV0FBVyxLQUFYLENBQTNCLEdBQStDLFVBQS9EOztBQUVBLGdCQUFNLGlCQUFpQixhQUFhLEtBQWIsS0FBdUIsRUFBOUM7QUFDQSxnQkFBTSxlQUFlLFdBQVcsS0FBWCxLQUFxQixFQUExQztBQUNBLGdCQUFNLGVBQWUsV0FBVyxLQUFYLEtBQXFCLEVBQTFDOztBQUVBLGdCQUFJLDBCQUNDLFlBREQ7QUFFRjtBQUZFLGNBQUo7O0FBS0EsZ0JBQUksQ0FBQyxVQUFMLEVBQWlCO0FBQ2YsMkJBQWEsRUFBYjtBQUNEOztBQUVELGdCQUFNLDBCQUNELFlBREMsRUFFRCxPQUZDO0FBR0osdUJBQVM7QUFITCxjQUFOOztBQU1BLGdCQUFNLHVCQUNELGNBREMsRUFFRCxJQUZDLEVBR0EsT0FBTyxJQUFQLElBQWUsRUFIZixDQUFOO0FBS0EsZ0JBQUksZ0JBQWdCLFNBQXBCLEVBQ0UsTUFBTSxRQUFOLENBQWU7QUFDYixvQkFBTSxXQURPO0FBRWIsb0JBQU0sS0FGTztBQUdiLG9CQUFNO0FBSE8sYUFBZjs7QUFNRixnQkFBTSxjQUFjLFVBQVUsaUJBQWlCLFNBQWpCLEdBQTZCLE1BQTdCLEdBQXNDLFlBQWhELEVBQThELEtBQTlELENBQXBCOztBQUVBLGdCQUFNLGVBQWUsNEJBQWtCLFdBQWxCLEVBQStCLEtBQS9CLENBQXJCOztBQUVBLHlCQUFhLEtBQWIsRUFDRSxPQURGLEVBRUUsVUFGRixFQUlHLElBSkgsQ0FJUSxZQUF5QjtBQUFBLGdGQUFQLEVBQU87O0FBQUEsa0JBQXZCLElBQXVCLFNBQXZCLElBQXVCO0FBQUEsa0JBQWpCLE1BQWlCLFNBQWpCLE1BQWlCOztBQUM3QixrQkFBSSxNQUFKLEVBQVk7QUFDVixzQkFBTSxRQUFOLENBQWU7QUFDYix3QkFBTSxXQURPO0FBRWIseUJBQU8sZUFBZSxNQUFmLENBRk07QUFHYix3QkFBTTtBQUhPLGlCQUFmO0FBS0QsZUFORCxNQU1PO0FBQ0wsc0JBQU0sUUFBTixDQUFlO0FBQ2Isd0JBQU0sVUFETztBQUViLHdCQUFNLFVBQVUsSUFBVixDQUZPO0FBR2Isd0JBQU07QUFITyxpQkFBZjtBQUtBLDJCQUFXLElBQVgsRUFBaUIsVUFBVSxJQUFWLENBQWpCLEVBQWtDLE9BQWxDO0FBQ0Q7QUFDRixhQW5CSCxFQW9CRyxLQXBCSCxDQW9CUyxpQkFBUztBQUNkLG9CQUFNLFFBQU4sQ0FBZTtBQUNiLHNCQUFNLFdBRE87QUFFYix1QkFBTyxlQUFlLEtBQWYsQ0FGTTtBQUdiLHNCQUFNO0FBSE8sZUFBZjtBQUtBLHlCQUFXLGVBQWUsS0FBZixDQUFYLEVBQWtDLElBQWxDLEVBQXdDLE9BQXhDO0FBQ0QsYUEzQkgsRUE0QkcsSUE1QkgsQ0E0QlEsWUFBTTtBQUNWLGtCQUFJLGdCQUFnQixTQUFwQixFQUNFLE1BQU0sUUFBTixDQUFlO0FBQ2Isc0JBQU0sV0FETztBQUViLHNCQUFNLElBRk87QUFHYixzQkFBTTtBQUhPLGVBQWY7QUFLTCxhQW5DRDtBQXZEaUQ7QUEyRmxEO0FBQ0QsZUFBTyxLQUFLLE1BQUwsQ0FBUDtBQUNELE9BOUZEO0FBK0ZELEtBaEdEO0FBaUdELEdBbEdEO0FBbUdEOztrQkFFYyxNIiwiZmlsZSI6ImdyYXBocWwtbWlkZGxld2FyZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBncmFwaEZldGNoRmFjdG9yeSBmcm9tICcuL2dyYXBocWwtZmV0Y2gnO1xuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcblxuZnVuY3Rpb24gZ2V0U2VydmVyKHNlcnZlciwgc3RhdGUpIHtcbiAgaWYgKF8uaXNGdW5jdGlvbihzZXJ2ZXIpKSB7XG4gICAgcmV0dXJuIHNlcnZlcih7Li4uc3RhdGV9KTtcbiAgfVxuICByZXR1cm4gc2VydmVyO1xufVxuXG5mdW5jdGlvbiBjb25maWcoe1xuICBzZXJ2ZXIsXG4gIGZldGNoLFxuICBhY3Rpb246IGdyYXBoQWN0aW9uID0gJ0dSQVBIJyxcbiAgcmVhZHk6IGdyYXBoUmVhZHksXG4gIGRvbmU6IGdyYXBoRG9uZSxcbiAgZXJyb3I6IGdyYXBoRXJyb3IsXG4gIGdldEhlYWRlcnMgPSBfLm5vb3AsXG4gIGdldE9wdGlvbnMgPSBfLm5vb3AsXG4gIGdldFZhcmlhYmxlcyA9IF8ubm9vcCxcbiAgb25Db21wbGV0ZTogb25Db21wbGV0ZUNvbmZpZyA9IF8ubm9vcCxcbiAgdHJhbnNmb3JtOiB0cmFuc2Zvcm1Db25maWcgPSBfLmlkZW50aXR5LFxuICBlcnJvclRyYW5zZm9ybTogZXJyb3JUcmFuc2Zvcm1Db25maWcgPSBfLmlkZW50aXR5XG59ID0ge30pIHtcbiAgaWYgKGZldGNoID09PSB1bmRlZmluZWQpIHtcbiAgICB0aHJvdyAnW0dyYXBoUUwgbWlkZGxld2FyZV0gXFwnZmV0Y2hcXCcgaXMgcmVxdWlyZWQnO1xuICB9XG5cbiAgcmV0dXJuIHN0b3JlID0+IHtcbiAgICByZXR1cm4gKG5leHQpID0+IHtcbiAgICAgIHJldHVybiAoYWN0aW9uKSA9PiB7XG4gICAgICAgIGlmIChhY3Rpb24udHlwZSA9PT0gZ3JhcGhBY3Rpb24gfHwgYWN0aW9uLmdyYXBocWwpIHtcblxuXG4gICAgICAgICAgY29uc3Qge3F1ZXJ5OiBxdWVyeUFyZ1JhdywgdmFyczogdmFyc0FyZyA9IHt9LCBvcHRpb25zOiBvcHRpb25zQXJnID0ge30sIGhlYWRlcnMgPSB7fSwgLi4ucmVzdH0gPSAoYWN0aW9uLmRhdGEgfHwge30pO1xuICAgICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgIHNlcnZlcjogYWN0aW9uU2VydmVyLFxuICAgICAgICAgICAgdHJhbnNmb3JtID0gdHJhbnNmb3JtQ29uZmlnLFxuICAgICAgICAgICAgZXJyb3JUcmFuc2Zvcm0gPSBlcnJvclRyYW5zZm9ybUNvbmZpZyxcbiAgICAgICAgICAgIG9uQ29tcGxldGUgPSBvbkNvbXBsZXRlQ29uZmlnLFxuICAgICAgICAgICAgcmVhZHk6IGFjdGlvblJlYWR5ID0gZ3JhcGhSZWFkeSxcbiAgICAgICAgICAgIGRvbmU6IGFjdGlvbkRvbmUgPSBncmFwaERvbmUsXG4gICAgICAgICAgICBlcnJvcjogYWN0aW9uRXJyb3IgPSBncmFwaEVycm9yLFxuICAgICAgICAgIH0gPSAoYWN0aW9uLmdyYXBocWwgfHwge30pO1xuICAgICAgICAgIGNvbnN0IHF1ZXJ5QXJnID0gcmVzdC5tdXRhdGlvbiB8fCBxdWVyeUFyZ1JhdztcblxuICAgICAgICAgIGNvbnN0IHN0YXRlID0gc3RvcmUuZ2V0U3RhdGUoKTtcbiAgICAgICAgICBjb25zdCBxdWVyeSA9IF8uaXNGdW5jdGlvbihxdWVyeUFyZykgPyBxdWVyeUFyZyhzdGF0ZSkgOiBxdWVyeUFyZztcbiAgICAgICAgICBjb25zdCB2YXJzID0gXy5pc0Z1bmN0aW9uKHZhcnNBcmcpID8gdmFyc0FyZyhzdGF0ZSkgOiB2YXJzQXJnO1xuICAgICAgICAgIGNvbnN0IG9wdGlvbnMgPSBfLmlzRnVuY3Rpb24ob3B0aW9uc0FyZykgPyBvcHRpb25zQXJnKHN0YXRlKSA6IG9wdGlvbnNBcmc7XG5cbiAgICAgICAgICBjb25zdCBzdGF0ZVZhcmlhYmxlcyA9IGdldFZhcmlhYmxlcyhzdGF0ZSkgfHwge307XG4gICAgICAgICAgY29uc3Qgc3RhdGVIZWFkZXJzID0gZ2V0SGVhZGVycyhzdGF0ZSkgfHwge307XG4gICAgICAgICAgY29uc3Qgc3RhdGVPcHRpb25zID0gZ2V0T3B0aW9ucyhzdGF0ZSkgfHwge307XG5cbiAgICAgICAgICBsZXQgb3V0SGVhZGVycyA9IHtcbiAgICAgICAgICAgIC4uLnN0YXRlSGVhZGVycyxcbiAgICAgICAgICAgIGhlYWRlcnNcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgaWYgKCFvdXRIZWFkZXJzKSB7XG4gICAgICAgICAgICBvdXRIZWFkZXJzID0ge307XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3Qgb3V0T3B0aW9ucyA9IHtcbiAgICAgICAgICAgIC4uLnN0YXRlT3B0aW9ucyxcbiAgICAgICAgICAgIC4uLm9wdGlvbnMsXG4gICAgICAgICAgICBoZWFkZXJzOiBvdXRIZWFkZXJzXG4gICAgICAgICAgfTtcblxuICAgICAgICAgIGNvbnN0IG91dFZhcnMgPSB7XG4gICAgICAgICAgICAuLi5zdGF0ZVZhcmlhYmxlcyxcbiAgICAgICAgICAgIC4uLnZhcnMsXG4gICAgICAgICAgICAuLi4oYWN0aW9uLnZhcnMgfHwge30pXG4gICAgICAgICAgfTtcbiAgICAgICAgICBpZiAoYWN0aW9uUmVhZHkgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKHtcbiAgICAgICAgICAgICAgdHlwZTogYWN0aW9uUmVhZHksXG4gICAgICAgICAgICAgIGRhdGE6IGZhbHNlLFxuICAgICAgICAgICAgICB2YXJzOiBvdXRWYXJzXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgIGNvbnN0IGZpbmFsU2VydmVyID0gZ2V0U2VydmVyKGFjdGlvblNlcnZlciA9PT0gdW5kZWZpbmVkID8gc2VydmVyIDogYWN0aW9uU2VydmVyLCBzdGF0ZSk7XG5cbiAgICAgICAgICBjb25zdCBmZXRjaE1hY2hpbmUgPSBncmFwaEZldGNoRmFjdG9yeShmaW5hbFNlcnZlciwgZmV0Y2gpO1xuXG4gICAgICAgICAgZmV0Y2hNYWNoaW5lKHF1ZXJ5LFxuICAgICAgICAgICAgb3V0VmFycyxcbiAgICAgICAgICAgIG91dE9wdGlvbnNcbiAgICAgICAgICApXG4gICAgICAgICAgICAudGhlbigoe2RhdGEsIGVycm9yc30gPSB7fSkgPT4ge1xuICAgICAgICAgICAgICBpZiAoZXJyb3JzKSB7XG4gICAgICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goe1xuICAgICAgICAgICAgICAgICAgdHlwZTogYWN0aW9uRXJyb3IsXG4gICAgICAgICAgICAgICAgICBlcnJvcjogZXJyb3JUcmFuc2Zvcm0oZXJyb3JzKSxcbiAgICAgICAgICAgICAgICAgIHZhcnM6IG91dFZhcnNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzdG9yZS5kaXNwYXRjaCh7XG4gICAgICAgICAgICAgICAgICB0eXBlOiBhY3Rpb25Eb25lLFxuICAgICAgICAgICAgICAgICAgZGF0YTogdHJhbnNmb3JtKGRhdGEpLFxuICAgICAgICAgICAgICAgICAgdmFyczogb3V0VmFyc1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIG9uQ29tcGxldGUobnVsbCwgdHJhbnNmb3JtKGRhdGEpLCBvdXRWYXJzKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKHtcbiAgICAgICAgICAgICAgICB0eXBlOiBhY3Rpb25FcnJvcixcbiAgICAgICAgICAgICAgICBlcnJvcjogZXJyb3JUcmFuc2Zvcm0oZXJyb3IpLFxuICAgICAgICAgICAgICAgIHZhcnM6IG91dFZhcnNcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIG9uQ29tcGxldGUoZXJyb3JUcmFuc2Zvcm0oZXJyb3IpLCBudWxsLCBvdXRWYXJzKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgIGlmIChhY3Rpb25SZWFkeSAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKHtcbiAgICAgICAgICAgICAgICAgIHR5cGU6IGFjdGlvblJlYWR5LFxuICAgICAgICAgICAgICAgICAgZGF0YTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgIHZhcnM6IG91dFZhcnNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV4dChhY3Rpb24pO1xuICAgICAgfVxuICAgIH07XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvbmZpZztcblxuXG4iXX0=