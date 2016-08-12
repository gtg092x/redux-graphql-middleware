import chai from 'chai';
import _ from 'lodash';
import graphqlMiddleware from '../src';
import reducify from 'reducify';
const {assert} = chai;
import { createStore, applyMiddleware } from 'redux';

import {run as runServer, stop as stopServer} from './sample-server';

export default function () {

  before(function() {
    runServer();
  });

  after(function() {
    stopServer();
  });

  describe('should integreate with graphql', function () {
    it('should have a working test server', function() {
      assert.isOk(true);
    });

    it('should support graph ql commands', function(done) {

      function testReducer(state, action) {
        if (action.type === 'GRAPH_DONE') {
          assert.deepEqual({hello: 'world', hi: 'wld'}, action.data);
          done();
        }
        return state;
      };

      const store = createStore(reducify(
        {
          "GRAPH": (state, action) => action,
          reducer: testReducer
        }
        ), {},
        applyMiddleware(graphqlMiddleware({
          server: 'http://localhost:3000/graphql',
          action: 'GRAPH',
          ready: 'GRAPH_READY',
          done: 'GRAPH_DONE',
          error: 'GRAPH_ERROR'
        }))
      );


      store.subscribe(() => {
        const state = store.getState();
        assert.isOk(true);
      });

      store.dispatch({
        type: 'GRAPH',
        data: {
          query: `query { hello, hi }`
        }
      });
    });

    it('should support action graph ql commands', function(done) {

      function testReducer(state, action) {
        if (action.type === 'GRAPH_DONE_CUSTOM') {
          assert.deepEqual({hello: 'world', hi: 'wld'}, action.data);
          done();
        }
        return state;
      };

      const store = createStore(reducify(
        {
          "GRAPH": (state, action) => action,
          reducer: testReducer
        }
        ), {},
        applyMiddleware(graphqlMiddleware())
      );


      store.subscribe(() => {
        const state = store.getState();
        assert.isOk(true);
      });

      store.dispatch({
        type: 'GRAPH',
        graphql: {
          ready: 'GRAPH_READY_CUSTOM',
          done: 'GRAPH_DONE_CUSTOM',
          error: 'GRAPH_ERROR_CUSTOM',
          server: 'http://localhost:3000/graphql'
        },
        data: {
          query: `query { hello, hi }`
        }
      });
    });

  });
}
