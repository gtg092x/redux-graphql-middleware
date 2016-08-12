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
                  error: errors
                });
              } else {
                store.dispatch({
                  type: actionDone,
                  data: data
                });
              }
            }).catch(function (err) {
              return store.dispatch({
                type: actionError,
                error: error
              });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9ncmFwaHFsLW1pZGRsZXdhcmUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7OztBQUVBLFNBQVMsTUFBVCxHQVNRO0FBQUEsbUVBQUosRUFBSTs7QUFBQSxNQVJOLE1BUU0sUUFSTixNQVFNO0FBQUEseUJBUE4sTUFPTTtBQUFBLE1BUEUsV0FPRiwrQkFQZ0IsT0FPaEI7QUFBQSxNQU5DLFVBTUQsUUFOTixLQU1NO0FBQUEsTUFMQSxTQUtBLFFBTE4sSUFLTTtBQUFBLE1BSkMsVUFJRCxRQUpOLEtBSU07QUFBQSw2QkFITixVQUdNO0FBQUEsTUFITixVQUdNLG1DQUhPLGlCQUFFLElBR1Q7QUFBQSw2QkFGTixVQUVNO0FBQUEsTUFGTixVQUVNLG1DQUZPLGlCQUFFLElBRVQ7QUFBQSwrQkFETixZQUNNO0FBQUEsTUFETixZQUNNLHFDQURTLGlCQUFFLElBQ1g7OztBQUVOLE1BQU0sYUFBYSw0QkFBa0IsTUFBbEIsQ0FBbkI7O0FBRUEsU0FBTyxpQkFBUztBQUNkLFdBQU8sVUFBQyxJQUFELEVBQVU7QUFDZixhQUFPLFVBQUMsTUFBRCxFQUFZO0FBQ2pCLFlBQUksT0FBTyxJQUFQLEtBQWdCLFdBQWhCLElBQStCLE9BQU8sT0FBMUMsRUFBbUQ7QUFBQTtBQUFBLHdCQUdrRCxPQUFPLElBQVAsSUFBZSxFQUhqRTs7QUFBQSxnQkFHbkMsV0FIbUMsU0FHMUMsS0FIMEM7QUFBQSxtQ0FHdEIsSUFIc0I7QUFBQSxnQkFHaEIsT0FIZ0IsOEJBR04sRUFITTtBQUFBLHNDQUdGLE9BSEU7QUFBQSxnQkFHTyxVQUhQLGlDQUdvQixFQUhwQjtBQUFBLHNDQUd3QixPQUh4QjtBQUFBLGdCQUd3QixPQUh4QixpQ0FHa0MsRUFIbEM7O0FBQUEsZ0JBR3lDLElBSHpDOztBQUFBLHdCQUlpRixPQUFPLE9BQVAsSUFBa0IsRUFKbkc7O0FBQUEsZ0JBSWxDLFlBSmtDLFNBSTFDLE1BSjBDO0FBQUEsb0NBSXBCLEtBSm9CO0FBQUEsZ0JBSWIsV0FKYSwrQkFJQyxVQUpEO0FBQUEsbUNBSWEsSUFKYjtBQUFBLGdCQUltQixVQUpuQiw4QkFJZ0MsU0FKaEM7QUFBQSxvQ0FJMkMsS0FKM0M7QUFBQSxnQkFJa0QsV0FKbEQsK0JBSWdFLFVBSmhFOztBQUtqRCxnQkFBTSxXQUFXLEtBQUssUUFBTCxJQUFpQixXQUFsQzs7QUFFQSxnQkFBTSxRQUFRLE1BQU0sUUFBTixFQUFkO0FBQ0EsZ0JBQU0sUUFBUSxpQkFBRSxVQUFGLENBQWEsUUFBYixJQUF5QixTQUFTLEtBQVQsQ0FBekIsR0FBMkMsUUFBekQ7QUFDQSxnQkFBTSxPQUFPLGlCQUFFLFVBQUYsQ0FBYSxPQUFiLElBQXdCLFFBQVEsS0FBUixDQUF4QixHQUF5QyxPQUF0RDtBQUNBLGdCQUFNLFVBQVUsaUJBQUUsVUFBRixDQUFhLFVBQWIsSUFBMkIsV0FBVyxLQUFYLENBQTNCLEdBQStDLFVBQS9EOztBQUVBLGdCQUFNLGlCQUFpQixhQUFhLEtBQWIsS0FBdUIsRUFBOUM7QUFDQSxnQkFBTSxlQUFlLFdBQVcsS0FBWCxLQUFxQixFQUExQztBQUNBLGdCQUFNLGVBQWUsV0FBVyxLQUFYLEtBQXFCLEVBQTFDOztBQUVBLGdCQUFJLDBCQUNDLFlBREQ7QUFFRjtBQUZFLGNBQUo7O0FBS0EsZ0JBQUksQ0FBQyxXQUFXLEdBQWhCLEVBQXFCO0FBQ25CLDJCQUFhLElBQUksT0FBSixDQUFZLFVBQVosQ0FBYjtBQUNEOztBQUVELGdCQUFNLDBCQUNELFlBREMsRUFFRCxPQUZDO0FBR0osdUJBQVM7QUFITCxjQUFOOztBQU1BLGdCQUFNLHVCQUNELGNBREMsRUFFRCxJQUZDLENBQU47QUFJQSxrQkFBTSxRQUFOLENBQWU7QUFDYixvQkFBTSxXQURPO0FBRWIsb0JBQU07QUFGTyxhQUFmOztBQUtBLGdCQUFNLGVBQWUsaUJBQWlCLFNBQWpCLEdBQTZCLFVBQTdCLEdBQTBDLDRCQUFrQixZQUFsQixDQUEvRDs7QUFFQSx5QkFBYSxLQUFiLEVBQ0UsT0FERixFQUVFLFVBRkYsRUFJRyxJQUpILENBSVEsWUFBeUI7QUFBQSxnRkFBUCxFQUFPOztBQUFBLGtCQUF2QixJQUF1QixTQUF2QixJQUF1QjtBQUFBLGtCQUFqQixNQUFpQixTQUFqQixNQUFpQjs7QUFDN0Isa0JBQUksTUFBSixFQUFZO0FBQ1Ysc0JBQU0sUUFBTixDQUFlO0FBQ2Isd0JBQU0sVUFETztBQUViLHlCQUFPO0FBRk0saUJBQWY7QUFJRCxlQUxELE1BS087QUFDTCxzQkFBTSxRQUFOLENBQWU7QUFDYix3QkFBTSxVQURPO0FBRWI7QUFGYSxpQkFBZjtBQUlEO0FBQ0YsYUFoQkgsRUFpQkcsS0FqQkgsQ0FpQlM7QUFBQSxxQkFBTyxNQUFNLFFBQU4sQ0FBZTtBQUMzQixzQkFBTSxXQURxQjtBQUUzQix1QkFBTztBQUZvQixlQUFmLENBQVA7QUFBQSxhQWpCVCxFQXFCRyxJQXJCSCxDQXFCUTtBQUFBLHFCQUFNLE1BQU0sUUFBTixDQUFlO0FBQ3pCLHNCQUFNLFdBRG1CO0FBRXpCLHNCQUFNO0FBRm1CLGVBQWYsQ0FBTjtBQUFBLGFBckJSO0FBMUNpRDtBQW1FbEQ7QUFDRCxlQUFPLEtBQUssTUFBTCxDQUFQO0FBQ0QsT0F0RUQ7QUF1RUQsS0F4RUQ7QUF5RUQsR0ExRUQ7QUEyRUQ7O2tCQUVjLE0iLCJmaWxlIjoiZ3JhcGhxbC1taWRkbGV3YXJlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGdyYXBoRmV0Y2hGYWN0b3J5IGZyb20gJ2dyYXBocWwtZmV0Y2gnO1xuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcblxuZnVuY3Rpb24gY29uZmlnKHtcbiAgc2VydmVyLFxuICBhY3Rpb246IGdyYXBoQWN0aW9uID0gJ0dSQVBIJyxcbiAgcmVhZHk6IGdyYXBoUmVhZHksXG4gIGRvbmU6IGdyYXBoRG9uZSxcbiAgZXJyb3I6IGdyYXBoRXJyb3IsXG4gIGdldEhlYWRlcnMgPSBfLm5vb3AsXG4gIGdldE9wdGlvbnMgPSBfLm5vb3AsXG4gIGdldFZhcmlhYmxlcyA9IF8ubm9vcFxufSA9IHt9KSB7XG5cbiAgY29uc3QgZ3JhcGhGZXRjaCA9IGdyYXBoRmV0Y2hGYWN0b3J5KHNlcnZlcik7XG5cbiAgcmV0dXJuIHN0b3JlID0+IHtcbiAgICByZXR1cm4gKG5leHQpID0+IHtcbiAgICAgIHJldHVybiAoYWN0aW9uKSA9PiB7XG4gICAgICAgIGlmIChhY3Rpb24udHlwZSA9PT0gZ3JhcGhBY3Rpb24gfHwgYWN0aW9uLmdyYXBocWwpIHtcblxuXG4gICAgICAgICAgY29uc3Qge3F1ZXJ5OiBxdWVyeUFyZ1JhdywgdmFyczogdmFyc0FyZyA9IHt9LCBvcHRpb25zOiBvcHRpb25zQXJnID0ge30sIGhlYWRlcnMgPSB7fSwgLi4ucmVzdH0gPSAoYWN0aW9uLmRhdGEgfHwge30pO1xuICAgICAgICAgIGNvbnN0IHtzZXJ2ZXI6IGFjdGlvblNlcnZlciwgcmVhZHk6IGFjdGlvblJlYWR5ID0gZ3JhcGhSZWFkeSwgZG9uZTogYWN0aW9uRG9uZSA9IGdyYXBoRG9uZSwgZXJyb3I6IGFjdGlvbkVycm9yID0gZ3JhcGhFcnJvciwgfSA9IChhY3Rpb24uZ3JhcGhxbCB8fCB7fSk7XG4gICAgICAgICAgY29uc3QgcXVlcnlBcmcgPSByZXN0Lm11dGF0aW9uIHx8IHF1ZXJ5QXJnUmF3O1xuXG4gICAgICAgICAgY29uc3Qgc3RhdGUgPSBzdG9yZS5nZXRTdGF0ZSgpO1xuICAgICAgICAgIGNvbnN0IHF1ZXJ5ID0gXy5pc0Z1bmN0aW9uKHF1ZXJ5QXJnKSA/IHF1ZXJ5QXJnKHN0YXRlKSA6IHF1ZXJ5QXJnO1xuICAgICAgICAgIGNvbnN0IHZhcnMgPSBfLmlzRnVuY3Rpb24odmFyc0FyZykgPyB2YXJzQXJnKHN0YXRlKSA6IHZhcnNBcmc7XG4gICAgICAgICAgY29uc3Qgb3B0aW9ucyA9IF8uaXNGdW5jdGlvbihvcHRpb25zQXJnKSA/IG9wdGlvbnNBcmcoc3RhdGUpIDogb3B0aW9uc0FyZztcblxuICAgICAgICAgIGNvbnN0IHN0YXRlVmFyaWFibGVzID0gZ2V0VmFyaWFibGVzKHN0YXRlKSB8fCB7fTtcbiAgICAgICAgICBjb25zdCBzdGF0ZUhlYWRlcnMgPSBnZXRIZWFkZXJzKHN0YXRlKSB8fCB7fTtcbiAgICAgICAgICBjb25zdCBzdGF0ZU9wdGlvbnMgPSBnZXRPcHRpb25zKHN0YXRlKSB8fCB7fTtcblxuICAgICAgICAgIGxldCBvdXRIZWFkZXJzID0ge1xuICAgICAgICAgICAgLi4uc3RhdGVIZWFkZXJzLFxuICAgICAgICAgICAgaGVhZGVyc1xuICAgICAgICAgIH07XG5cbiAgICAgICAgICBpZiAoIW91dEhlYWRlcnMuZ2V0KSB7XG4gICAgICAgICAgICBvdXRIZWFkZXJzID0gbmV3IEhlYWRlcnMob3V0SGVhZGVycyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3Qgb3V0T3B0aW9ucyA9IHtcbiAgICAgICAgICAgIC4uLnN0YXRlT3B0aW9ucyxcbiAgICAgICAgICAgIC4uLm9wdGlvbnMsXG4gICAgICAgICAgICBoZWFkZXJzOiBvdXRIZWFkZXJzXG4gICAgICAgICAgfTtcblxuICAgICAgICAgIGNvbnN0IG91dFZhcnMgPSB7XG4gICAgICAgICAgICAuLi5zdGF0ZVZhcmlhYmxlcyxcbiAgICAgICAgICAgIC4uLnZhcnNcbiAgICAgICAgICB9O1xuICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKHtcbiAgICAgICAgICAgIHR5cGU6IGFjdGlvblJlYWR5LFxuICAgICAgICAgICAgZGF0YTogZmFsc2VcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGNvbnN0IGZldGNoTWFjaGluZSA9IGFjdGlvblNlcnZlciA9PT0gdW5kZWZpbmVkID8gZ3JhcGhGZXRjaCA6IGdyYXBoRmV0Y2hGYWN0b3J5KGFjdGlvblNlcnZlcik7XG5cbiAgICAgICAgICBmZXRjaE1hY2hpbmUocXVlcnksXG4gICAgICAgICAgICBvdXRWYXJzLFxuICAgICAgICAgICAgb3V0T3B0aW9uc1xuICAgICAgICAgIClcbiAgICAgICAgICAgIC50aGVuKCh7ZGF0YSwgZXJyb3JzfSA9IHt9KSA9PiB7XG4gICAgICAgICAgICAgIGlmIChlcnJvcnMpIHtcbiAgICAgICAgICAgICAgICBzdG9yZS5kaXNwYXRjaCh7XG4gICAgICAgICAgICAgICAgICB0eXBlOiBncmFwaEVycm9yLFxuICAgICAgICAgICAgICAgICAgZXJyb3I6IGVycm9yc1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHN0b3JlLmRpc3BhdGNoKHtcbiAgICAgICAgICAgICAgICAgIHR5cGU6IGFjdGlvbkRvbmUsXG4gICAgICAgICAgICAgICAgICBkYXRhXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZXJyID0+IHN0b3JlLmRpc3BhdGNoKHtcbiAgICAgICAgICAgICAgdHlwZTogYWN0aW9uRXJyb3IsXG4gICAgICAgICAgICAgIGVycm9yOiBlcnJvclxuICAgICAgICAgICAgfSkpXG4gICAgICAgICAgICAudGhlbigoKSA9PiBzdG9yZS5kaXNwYXRjaCh7XG4gICAgICAgICAgICAgIHR5cGU6IGFjdGlvblJlYWR5LFxuICAgICAgICAgICAgICBkYXRhOiB0cnVlXG4gICAgICAgICAgICB9KSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5leHQoYWN0aW9uKTtcbiAgICAgIH1cbiAgICB9O1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBjb25maWc7XG5cblxuIl19