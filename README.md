# Redux GraphQL Middleware [![Build Status](https://travis-ci.org/gtg092x/redux-graphql.svg?branch=master)](https://travis-ci.org/gtg092x/redux-graphql)

Generate GraphQL queries with [Redux][] middleware .

[![NPM](https://nodei.co/npm/redux-graphql.png?downloads=true&stars=true)](https://nodei.co/npm/redux-graphql/)


## Installation

    % npm install redux-graphql

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

## WIP

This is a work in progress. I want to integrate `redux-batch-actions` going forward.

## Credits

Redux Batch Middleware is free software under the MIT license. It was created in sunny Santa Monica by [Matthew Drake][].

[Redux]: https://github.com/reactjs/redux
[Matthew Drake]: http://www.mediadrake.com
