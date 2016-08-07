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
        if (action.type === graphAction) {
          var _ref2 = action.data || {};

          var queryArgRaw = _ref2.query;
          var _ref2$vars = _ref2.vars;
          var varsArg = _ref2$vars === undefined ? {} : _ref2$vars;
          var _ref2$options = _ref2.options;
          var optionsArg = _ref2$options === undefined ? {} : _ref2$options;
          var _ref2$headers = _ref2.headers;
          var headers = _ref2$headers === undefined ? {} : _ref2$headers;

          var rest = _objectWithoutProperties(_ref2, ['query', 'vars', 'options', 'headers']);

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
            type: graphReady,
            data: false
          });

          graphFetch(query, outVars, outOptions).then(function () {
            var _ref3 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

            var data = _ref3.data;
            var errors = _ref3.errors;

            if (errors) {
              store.dispatch({
                type: graphError,
                error: errors
              });
            } else {
              store.dispatch({
                type: graphDone,
                data: data
              });
            }
          }).catch(function (err) {
            return store.dispatch({
              type: graphError,
              error: error
            });
          }).then(function () {
            return store.dispatch({
              type: graphReady,
              data: true
            });
          });
        }
        return next(action);
      };
    };
  };
}

exports.default = config;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9ncmFwaHFsLW1pZGRsZXdhcmUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7OztBQUVBLFNBQVMsTUFBVCxHQVNRO0FBQUEsbUVBQUosRUFBSTs7QUFBQSxNQVJOLE1BUU0sUUFSTixNQVFNO0FBQUEseUJBUE4sTUFPTTtBQUFBLE1BUEUsV0FPRiwrQkFQZ0IsT0FPaEI7QUFBQSxNQU5DLFVBTUQsUUFOTixLQU1NO0FBQUEsTUFMQSxTQUtBLFFBTE4sSUFLTTtBQUFBLE1BSkMsVUFJRCxRQUpOLEtBSU07QUFBQSw2QkFITixVQUdNO0FBQUEsTUFITixVQUdNLG1DQUhPLGlCQUFFLElBR1Q7QUFBQSw2QkFGTixVQUVNO0FBQUEsTUFGTixVQUVNLG1DQUZPLGlCQUFFLElBRVQ7QUFBQSwrQkFETixZQUNNO0FBQUEsTUFETixZQUNNLHFDQURTLGlCQUFFLElBQ1g7OztBQUVOLE1BQU0sYUFBYSw0QkFBa0IsTUFBbEIsQ0FBbkI7O0FBRUEsU0FBTyxpQkFBUztBQUNkLFdBQU8sVUFBQyxJQUFELEVBQVU7QUFDZixhQUFPLFVBQUMsTUFBRCxFQUFZO0FBQ2pCLFlBQUksT0FBTyxJQUFQLEtBQWdCLFdBQXBCLEVBQWlDO0FBQUEsc0JBR29FLE9BQU8sSUFBUCxJQUFlLEVBSG5GOztBQUFBLGNBR2pCLFdBSGlCLFNBR3hCLEtBSHdCO0FBQUEsaUNBR0osSUFISTtBQUFBLGNBR0UsT0FIRiw4QkFHWSxFQUhaO0FBQUEsb0NBR2dCLE9BSGhCO0FBQUEsY0FHeUIsVUFIekIsaUNBR3NDLEVBSHRDO0FBQUEsb0NBRzBDLE9BSDFDO0FBQUEsY0FHMEMsT0FIMUMsaUNBR29ELEVBSHBEOztBQUFBLGNBRzJELElBSDNEOztBQUkvQixjQUFNLFdBQVcsS0FBSyxRQUFMLElBQWlCLFdBQWxDOztBQUVBLGNBQU0sUUFBUSxNQUFNLFFBQU4sRUFBZDtBQUNBLGNBQU0sUUFBUSxpQkFBRSxVQUFGLENBQWEsUUFBYixJQUF5QixTQUFTLEtBQVQsQ0FBekIsR0FBMkMsUUFBekQ7QUFDQSxjQUFNLE9BQU8saUJBQUUsVUFBRixDQUFhLE9BQWIsSUFBd0IsUUFBUSxLQUFSLENBQXhCLEdBQXlDLE9BQXREO0FBQ0EsY0FBTSxVQUFVLGlCQUFFLFVBQUYsQ0FBYSxVQUFiLElBQTJCLFdBQVcsS0FBWCxDQUEzQixHQUErQyxVQUEvRDs7QUFFQSxjQUFNLGlCQUFpQixhQUFhLEtBQWIsS0FBdUIsRUFBOUM7QUFDQSxjQUFNLGVBQWUsV0FBVyxLQUFYLEtBQXFCLEVBQTFDO0FBQ0EsY0FBTSxlQUFlLFdBQVcsS0FBWCxLQUFxQixFQUExQzs7QUFFQSxjQUFJLDBCQUNDLFlBREQ7QUFFRjtBQUZFLFlBQUo7O0FBS0EsY0FBSSxDQUFDLFdBQVcsR0FBaEIsRUFBcUI7QUFDbkIseUJBQWEsSUFBSSxPQUFKLENBQVksVUFBWixDQUFiO0FBQ0Q7O0FBRUQsY0FBTSwwQkFDRCxZQURDLEVBRUQsT0FGQztBQUdKLHFCQUFTO0FBSEwsWUFBTjs7QUFNQSxjQUFNLHVCQUNELGNBREMsRUFFRCxJQUZDLENBQU47QUFJQSxnQkFBTSxRQUFOLENBQWU7QUFDYixrQkFBTSxVQURPO0FBRWIsa0JBQU07QUFGTyxXQUFmOztBQUtBLHFCQUFXLEtBQVgsRUFDRSxPQURGLEVBRUUsVUFGRixFQUlHLElBSkgsQ0FJUSxZQUF5QjtBQUFBLDhFQUFQLEVBQU87O0FBQUEsZ0JBQXZCLElBQXVCLFNBQXZCLElBQXVCO0FBQUEsZ0JBQWpCLE1BQWlCLFNBQWpCLE1BQWlCOztBQUM3QixnQkFBSSxNQUFKLEVBQVk7QUFDVixvQkFBTSxRQUFOLENBQWU7QUFDYixzQkFBTSxVQURPO0FBRWIsdUJBQU87QUFGTSxlQUFmO0FBSUQsYUFMRCxNQUtPO0FBQ0wsb0JBQU0sUUFBTixDQUFlO0FBQ2Isc0JBQU0sU0FETztBQUViO0FBRmEsZUFBZjtBQUlEO0FBQ0YsV0FoQkgsRUFpQkcsS0FqQkgsQ0FpQlM7QUFBQSxtQkFBTyxNQUFNLFFBQU4sQ0FBZTtBQUMzQixvQkFBTSxVQURxQjtBQUUzQixxQkFBTztBQUZvQixhQUFmLENBQVA7QUFBQSxXQWpCVCxFQXFCRyxJQXJCSCxDQXFCUTtBQUFBLG1CQUFNLE1BQU0sUUFBTixDQUFlO0FBQ3pCLG9CQUFNLFVBRG1CO0FBRXpCLG9CQUFNO0FBRm1CLGFBQWYsQ0FBTjtBQUFBLFdBckJSO0FBeUJEO0FBQ0QsZUFBTyxLQUFLLE1BQUwsQ0FBUDtBQUNELE9BbkVEO0FBb0VELEtBckVEO0FBc0VELEdBdkVEO0FBd0VEOztrQkFFYyxNIiwiZmlsZSI6ImdyYXBocWwtbWlkZGxld2FyZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBncmFwaEZldGNoRmFjdG9yeSBmcm9tICdncmFwaHFsLWZldGNoJztcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5cbmZ1bmN0aW9uIGNvbmZpZyh7XG4gIHNlcnZlcixcbiAgYWN0aW9uOiBncmFwaEFjdGlvbiA9ICdHUkFQSCcsXG4gIHJlYWR5OiBncmFwaFJlYWR5LFxuICBkb25lOiBncmFwaERvbmUsXG4gIGVycm9yOiBncmFwaEVycm9yLFxuICBnZXRIZWFkZXJzID0gXy5ub29wLFxuICBnZXRPcHRpb25zID0gXy5ub29wLFxuICBnZXRWYXJpYWJsZXMgPSBfLm5vb3Bcbn0gPSB7fSkge1xuXG4gIGNvbnN0IGdyYXBoRmV0Y2ggPSBncmFwaEZldGNoRmFjdG9yeShzZXJ2ZXIpO1xuXG4gIHJldHVybiBzdG9yZSA9PiB7XG4gICAgcmV0dXJuIChuZXh0KSA9PiB7XG4gICAgICByZXR1cm4gKGFjdGlvbikgPT4ge1xuICAgICAgICBpZiAoYWN0aW9uLnR5cGUgPT09IGdyYXBoQWN0aW9uKSB7XG5cblxuICAgICAgICAgIGNvbnN0IHtxdWVyeTogcXVlcnlBcmdSYXcsIHZhcnM6IHZhcnNBcmcgPSB7fSwgb3B0aW9uczogb3B0aW9uc0FyZyA9IHt9LCBoZWFkZXJzID0ge30sIC4uLnJlc3R9ID0gKGFjdGlvbi5kYXRhIHx8IHt9KTtcbiAgICAgICAgICBjb25zdCBxdWVyeUFyZyA9IHJlc3QubXV0YXRpb24gfHwgcXVlcnlBcmdSYXc7XG5cbiAgICAgICAgICBjb25zdCBzdGF0ZSA9IHN0b3JlLmdldFN0YXRlKCk7XG4gICAgICAgICAgY29uc3QgcXVlcnkgPSBfLmlzRnVuY3Rpb24ocXVlcnlBcmcpID8gcXVlcnlBcmcoc3RhdGUpIDogcXVlcnlBcmc7XG4gICAgICAgICAgY29uc3QgdmFycyA9IF8uaXNGdW5jdGlvbih2YXJzQXJnKSA/IHZhcnNBcmcoc3RhdGUpIDogdmFyc0FyZztcbiAgICAgICAgICBjb25zdCBvcHRpb25zID0gXy5pc0Z1bmN0aW9uKG9wdGlvbnNBcmcpID8gb3B0aW9uc0FyZyhzdGF0ZSkgOiBvcHRpb25zQXJnO1xuXG4gICAgICAgICAgY29uc3Qgc3RhdGVWYXJpYWJsZXMgPSBnZXRWYXJpYWJsZXMoc3RhdGUpIHx8IHt9O1xuICAgICAgICAgIGNvbnN0IHN0YXRlSGVhZGVycyA9IGdldEhlYWRlcnMoc3RhdGUpIHx8IHt9O1xuICAgICAgICAgIGNvbnN0IHN0YXRlT3B0aW9ucyA9IGdldE9wdGlvbnMoc3RhdGUpIHx8IHt9O1xuXG4gICAgICAgICAgbGV0IG91dEhlYWRlcnMgPSB7XG4gICAgICAgICAgICAuLi5zdGF0ZUhlYWRlcnMsXG4gICAgICAgICAgICBoZWFkZXJzXG4gICAgICAgICAgfTtcblxuICAgICAgICAgIGlmICghb3V0SGVhZGVycy5nZXQpIHtcbiAgICAgICAgICAgIG91dEhlYWRlcnMgPSBuZXcgSGVhZGVycyhvdXRIZWFkZXJzKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zdCBvdXRPcHRpb25zID0ge1xuICAgICAgICAgICAgLi4uc3RhdGVPcHRpb25zLFxuICAgICAgICAgICAgLi4ub3B0aW9ucyxcbiAgICAgICAgICAgIGhlYWRlcnM6IG91dEhlYWRlcnNcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgY29uc3Qgb3V0VmFycyA9IHtcbiAgICAgICAgICAgIC4uLnN0YXRlVmFyaWFibGVzLFxuICAgICAgICAgICAgLi4udmFyc1xuICAgICAgICAgIH07XG4gICAgICAgICAgc3RvcmUuZGlzcGF0Y2goe1xuICAgICAgICAgICAgdHlwZTogZ3JhcGhSZWFkeSxcbiAgICAgICAgICAgIGRhdGE6IGZhbHNlXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBncmFwaEZldGNoKHF1ZXJ5LFxuICAgICAgICAgICAgb3V0VmFycyxcbiAgICAgICAgICAgIG91dE9wdGlvbnNcbiAgICAgICAgICApXG4gICAgICAgICAgICAudGhlbigoe2RhdGEsIGVycm9yc30gPSB7fSkgPT4ge1xuICAgICAgICAgICAgICBpZiAoZXJyb3JzKSB7XG4gICAgICAgICAgICAgICAgc3RvcmUuZGlzcGF0Y2goe1xuICAgICAgICAgICAgICAgICAgdHlwZTogZ3JhcGhFcnJvcixcbiAgICAgICAgICAgICAgICAgIGVycm9yOiBlcnJvcnNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzdG9yZS5kaXNwYXRjaCh7XG4gICAgICAgICAgICAgICAgICB0eXBlOiBncmFwaERvbmUsXG4gICAgICAgICAgICAgICAgICBkYXRhXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZXJyID0+IHN0b3JlLmRpc3BhdGNoKHtcbiAgICAgICAgICAgICAgdHlwZTogZ3JhcGhFcnJvcixcbiAgICAgICAgICAgICAgZXJyb3I6IGVycm9yXG4gICAgICAgICAgICB9KSlcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHN0b3JlLmRpc3BhdGNoKHtcbiAgICAgICAgICAgICAgdHlwZTogZ3JhcGhSZWFkeSxcbiAgICAgICAgICAgICAgZGF0YTogdHJ1ZVxuICAgICAgICAgICAgfSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXh0KGFjdGlvbik7XG4gICAgICB9XG4gICAgfTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY29uZmlnO1xuXG5cbiJdfQ==