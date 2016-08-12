# Redux GraphQL Middleware [![Build Status](https://travis-ci.org/gtg092x/redux-graphql-middleware.svg?branch=master)](https://travis-ci.org/gtg092x/redux-graphql-middleware)

Generate GraphQL queries with [Redux][] middleware .

[![NPM](https://nodei.co/npm/redux-graphql-middleware.png?downloads=true&stars=true)](https://nodei.co/npm/redux-graphql-middleware/)


## Installation

    % npm install redux-graphql-middleware

## Usage

```js
import { createStore } from 'redux';
import reducify from 'reducify';


const store = createStore(
  reducify({
    "GRAPH": (state = 0, action) => action.data
  }),
  {},
  applyMiddleware(graphqlMiddleware({
    server: 'http://localhost:3000/graphql',
    action: 'GRAPH',
    ready: 'GRAPH_READY',
    done: 'GRAPH_DONE',
    error: 'GRAPH_ERROR'
  }))
);

store.dispatch({
    type: 'GRAPH',
    data: {
        query: `query { hello, hi }`
    }
});

```

## Without Config

You can also pass this information via actions using the `graphql` key.

This is the same as above:

```js
import { createStore } from 'redux';
import reducify from 'reducify';


const store = createStore(
  reducify({
    "GRAPH": (state = 0, action) => action.data
  }),
  {},
  applyMiddleware(graphqlMiddleware())
);

store.dispatch({
    type: 'GRAPH',
    graphql: {
      server: 'http://localhost:3000/graphql',
      action: 'GRAPH',
      ready: 'GRAPH_READY',
      done: 'GRAPH_DONE',
      error: 'GRAPH_ERROR'
    },
    data: {
        query: `query { hello, hi }`
    }
});

```

If a key isn't passed to `graphql`, it will default to the config you pass with `graphqlMiddleware`.

Also the same as above:

```js
import { createStore } from 'redux';
import reducify from 'reducify';


const store = createStore(
  reducify({
    "GRAPH": (state = 0, action) => action.data
  }),
  {},
  applyMiddleware(graphqlMiddleware({
    server: 'http://localhost:3000/graphql'
  }))
);

store.dispatch({
    type: 'GRAPH',
    graphql: {      
      action: 'GRAPH',
      ready: 'GRAPH_READY',
      done: 'GRAPH_DONE',
      error: 'GRAPH_ERROR'
    },
    data: {
        query: `query { hello, hi }`
    }
});

```

## WIP

This is a work in progress. I want to integrate `redux-batch-actions` going forward.

## Credits

Redux Batch Middleware is free software under the MIT license. It was created in sunny Santa Monica by [Matthew Drake][].

[Redux]: https://github.com/reactjs/redux
[Matthew Drake]: http://www.mediadrake.com
