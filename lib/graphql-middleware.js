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
            store.dispatch({
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
              return store.dispatch({
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9ncmFwaHFsLW1pZGRsZXdhcmUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7OztBQUVBLFNBQVMsTUFBVCxHQVlRO0FBQUEsbUVBQUosRUFBSTs7QUFBQSxNQVhOLE1BV00sUUFYTixNQVdNO0FBQUEseUJBVk4sTUFVTTtBQUFBLE1BVkUsV0FVRiwrQkFWZ0IsT0FVaEI7QUFBQSxNQVRDLFVBU0QsUUFUTixLQVNNO0FBQUEsTUFSQSxTQVFBLFFBUk4sSUFRTTtBQUFBLE1BUEMsVUFPRCxRQVBOLEtBT007QUFBQSw2QkFOTixVQU1NO0FBQUEsTUFOTixVQU1NLG1DQU5PLGlCQUFFLElBTVQ7QUFBQSw2QkFMTixVQUtNO0FBQUEsTUFMTixVQUtNLG1DQUxPLGlCQUFFLElBS1Q7QUFBQSwrQkFKTixZQUlNO0FBQUEsTUFKTixZQUlNLHFDQUpTLGlCQUFFLElBSVg7QUFBQSw2QkFITixVQUdNO0FBQUEsTUFITSxnQkFHTixtQ0FIeUIsaUJBQUUsSUFHM0I7QUFBQSw0QkFGTixTQUVNO0FBQUEsTUFGSyxlQUVMLGtDQUZ1QixpQkFBRSxRQUV6QjtBQUFBLGlDQUROLGNBQ007QUFBQSxNQURVLG9CQUNWLHVDQURpQyxpQkFBRSxRQUNuQzs7O0FBRU4sTUFBTSxhQUFhLDRCQUFrQixNQUFsQixDQUFuQjs7QUFFQSxTQUFPLGlCQUFTO0FBQ2QsV0FBTyxVQUFDLElBQUQsRUFBVTtBQUNmLGFBQU8sVUFBQyxNQUFELEVBQVk7QUFDakIsWUFBSSxPQUFPLElBQVAsS0FBZ0IsV0FBaEIsSUFBK0IsT0FBTyxPQUExQyxFQUFtRDtBQUFBO0FBQUEsd0JBR2tELE9BQU8sSUFBUCxJQUFlLEVBSGpFOztBQUFBLGdCQUduQyxXQUhtQyxTQUcxQyxLQUgwQztBQUFBLG1DQUd0QixJQUhzQjtBQUFBLGdCQUdoQixPQUhnQiw4QkFHTixFQUhNO0FBQUEsc0NBR0YsT0FIRTtBQUFBLGdCQUdPLFVBSFAsaUNBR29CLEVB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O0FBQ0QsT0FsRkQ7QUFtRkQsS0FwRkQ7QUFxRkQsR0F0RkQ7QUF1RkQ7O2tCQUVjLE0iLCJmaWxlIjoiZ3JhcGhxbC1taWRkbGV3YXJlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGdyYXBoRmV0Y2hGYWN0b3J5IGZyb20gJ2dyYXBocWwtZmV0Y2gnO1xuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcblxuZnVuY3Rpb24gY29uZmlnKHtcbiAgc2VydmVyLFxuICBhY3Rpb246IGdyYXBoQWN0aW9uID0gJ0dSQVBIJyxcbiAgcmVhZHk6IGdyYXBoUmVhZHksXG4gIGRvbmU6IGdyYXBoRG9uZSxcbiAgZXJyb3I6IGdyYXBoRXJyb3IsXG4gIGdldEhlYWRlcnMgPSBfLm5vb3AsXG4gIGdldE9wdGlvbnMgPSBfLm5vb3AsXG4gIGdldFZhcmlhYmxlcyA9IF8ubm9vcCxcbiAgb25Db21wbGV0ZTogb25Db21wbGV0ZUNvbmZpZyA9IF8ubm9vcCxcbiAgdHJhbnNmb3JtOiB0cmFuc2Zvcm1Db25maWcgPSBfLmlkZW50aXR5LFxuICBlcnJvclRyYW5zZm9ybTogZXJyb3JUcmFuc2Zvcm1Db25maWcgPSBfLmlkZW50aXR5XG59ID0ge30pIHtcblxuICBjb25zdCBncmFwaEZldGNoID0gZ3JhcGhGZXRjaEZhY3Rvcnkoc2VydmVyKTtcblxuICByZXR1cm4gc3RvcmUgPT4ge1xuICAgIHJldHVybiAobmV4dCkgPT4ge1xuICAgICAgcmV0dXJuIChhY3Rpb24pID0+IHtcbiAgICAgICAgaWYgKGFjdGlvbi50eXBlID09PSBncmFwaEFjdGlvbiB8fCBhY3Rpb24uZ3JhcGhxbCkge1xuXG5cbiAgICAgICAgICBjb25zdCB7cXVlcnk6IHF1ZXJ5QXJnUmF3LCB2YXJzOiB2YXJzQXJnID0ge30sIG9wdGlvbnM6IG9wdGlvbnNBcmcgPSB7fSwgaGVhZGVycyA9IHt9LCAuLi5yZXN0fSA9IChhY3Rpb24uZGF0YSB8fCB7fSk7XG4gICAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgc2VydmVyOiBhY3Rpb25TZXJ2ZXIsXG4gICAgICAgICAgICB0cmFuc2Zvcm0gPSB0cmFuc2Zvcm1Db25maWcsXG4gICAgICAgICAgICBlcnJvclRyYW5zZm9ybSA9IGVycm9yVHJhbnNmb3JtQ29uZmlnLFxuICAgICAgICAgICAgb25Db21wbGV0ZSA9IG9uQ29tcGxldGVDb25maWcsXG4gICAgICAgICAgICByZWFkeTogYWN0aW9uUmVhZHkgPSBncmFwaFJlYWR5LFxuICAgICAgICAgICAgZG9uZTogYWN0aW9uRG9uZSA9IGdyYXBoRG9uZSxcbiAgICAgICAgICAgIGVycm9yOiBhY3Rpb25FcnJvciA9IGdyYXBoRXJyb3IsXG4gICAgICAgICAgfSA9IChhY3Rpb24uZ3JhcGhxbCB8fCB7fSk7XG4gICAgICAgICAgY29uc3QgcXVlcnlBcmcgPSByZXN0Lm11dGF0aW9uIHx8IHF1ZXJ5QXJnUmF3O1xuXG4gICAgICAgICAgY29uc3Qgc3RhdGUgPSBzdG9yZS5nZXRTdGF0ZSgpO1xuICAgICAgICAgIGNvbnN0IHF1ZXJ5ID0gXy5pc0Z1bmN0aW9uKHF1ZXJ5QXJnKSA/IHF1ZXJ5QXJnKHN0YXRlKSA6IHF1ZXJ5QXJnO1xuICAgICAgICAgIGNvbnN0IHZhcnMgPSBfLmlzRnVuY3Rpb24odmFyc0FyZykgPyB2YXJzQXJnKHN0YXRlKSA6IHZhcnNBcmc7XG4gICAgICAgICAgY29uc3Qgb3B0aW9ucyA9IF8uaXNGdW5jdGlvbihvcHRpb25zQXJnKSA/IG9wdGlvbnNBcmcoc3RhdGUpIDogb3B0aW9uc0FyZztcblxuICAgICAgICAgIGNvbnN0IHN0YXRlVmFyaWFibGVzID0gZ2V0VmFyaWFibGVzKHN0YXRlKSB8fCB7fTtcbiAgICAgICAgICBjb25zdCBzdGF0ZUhlYWRlcnMgPSBnZXRIZWFkZXJzKHN0YXRlKSB8fCB7fTtcbiAgICAgICAgICBjb25zdCBzdGF0ZU9wdGlvbnMgPSBnZXRPcHRpb25zKHN0YXRlKSB8fCB7fTtcblxuICAgICAgICAgIGxldCBvdXRIZWFkZXJzID0ge1xuICAgICAgICAgICAgLi4uc3RhdGVIZWFkZXJzLFxuICAgICAgICAgICAgaGVhZGVyc1xuICAgICAgICAgIH07XG5cbiAgICAgICAgICBpZiAoIW91dEhlYWRlcnMuZ2V0KSB7XG4gICAgICAgICAgICBvdXRIZWFkZXJzID0gbmV3IEhlYWRlcnMob3V0SGVhZGVycyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3Qgb3V0T3B0aW9ucyA9IHtcbiAgICAgICAgICAgIC4uLnN0YXRlT3B0aW9ucyxcbiAgICAgICAgICAgIC4uLm9wdGlvbnMsXG4gICAgICAgICAgICBoZWFkZXJzOiBvdXRIZWFkZXJzXG4gICAgICAgICAgfTtcblxuICAgICAgICAgIGNvbnN0IG91dFZhcnMgPSB7XG4gICAgICAgICAgICAuLi5zdGF0ZVZhcmlhYmxlcyxcbiAgICAgICAgICAgIC4uLnZhcnNcbiAgICAgICAgICB9O1xuICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKHtcbiAgICAgICAgICAgIHR5cGU6IGFjdGlvblJlYWR5LFxuICAgICAgICAgICAgZGF0YTogZmFsc2VcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGNvbnN0IGZldGNoTWFjaGluZSA9IGFjdGlvblNlcnZlciA9PT0gdW5kZWZpbmVkID8gZ3JhcGhGZXRjaCA6IGdyYXBoRmV0Y2hGYWN0b3J5KGFjdGlvblNlcnZlcik7XG5cbiAgICAgICAgICBmZXRjaE1hY2hpbmUocXVlcnksXG4gICAgICAgICAgICBvdXRWYXJzLFxuICAgICAgICAgICAgb3V0T3B0aW9uc1xuICAgICAgICAgIClcbiAgICAgICAgICAgIC50aGVuKCh7ZGF0YSwgZXJyb3JzfSA9IHt9KSA9PiB7XG4gICAgICAgICAgICAgIGlmIChlcnJvcnMpIHtcbiAgICAgICAgICAgICAgICBzdG9yZS5kaXNwYXRjaCh7XG4gICAgICAgICAgICAgICAgICB0eXBlOiBncmFwaEVycm9yLFxuICAgICAgICAgICAgICAgICAgZXJyb3I6IGVycm9yVHJhbnNmb3JtKGVycm9ycylcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzdG9yZS5kaXNwYXRjaCh7XG4gICAgICAgICAgICAgICAgICB0eXBlOiBhY3Rpb25Eb25lLFxuICAgICAgICAgICAgICAgICAgZGF0YTogdHJhbnNmb3JtKGRhdGEpXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgb25Db21wbGV0ZShudWxsLCB0cmFuc2Zvcm0oZGF0YSkpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goe1xuICAgICAgICAgICAgICAgIHR5cGU6IGFjdGlvbkVycm9yLFxuICAgICAgICAgICAgICAgIGVycm9yOiBlcnJvclRyYW5zZm9ybShlcnJvcilcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIG9uQ29tcGxldGUoZXJyb3JUcmFuc2Zvcm0oZXJyb3IpKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbigoKSA9PiBzdG9yZS5kaXNwYXRjaCh7XG4gICAgICAgICAgICAgIHR5cGU6IGFjdGlvblJlYWR5LFxuICAgICAgICAgICAgICBkYXRhOiB0cnVlXG4gICAgICAgICAgICB9KSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5leHQoYWN0aW9uKTtcbiAgICAgIH1cbiAgICB9O1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBjb25maWc7XG5cblxuIl19