import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull
} from 'graphql';

import _ from 'lodash';

const SandwichType = new GraphQLObjectType({
  name: 'SandwhichQueryType',
  fields: {
    bread: {
      type: GraphQLString,
      resolve({bread}) {
        return bread || 'white';
      }
    },
    meat: {
      type: GraphQLString,
      resolve({meat}) {
        return meat || 'turkey';
      }
    }
  }
});

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      hello: {
        type: GraphQLString,
        resolve() {
          return 'world';
        }
      },
      hi: {
        type: GraphQLString,
        resolve() {
          return 'wld';
        }
      },
      sandwich: {
        type: SandwichType,
        resolve() {
          return { meat: 'ham' };
        }
      },
      increment: {
        type: GraphQLInt,
        args: {
          count: { type: new GraphQLNonNull(GraphQLInt) }
        },
        resolve(root, {count: arg}) {
          return arg + 1;
        }
      },
      incrementHard: {
        type: GraphQLInt,
        args: {
          count: { type: new GraphQLNonNull(GraphQLInt) }
        },
        resolve(root, {count: arg}) {
          return new Promise(resolve => setTimeout(() => resolve(arg + 1), 10), _.noop);
        }
      }
    }
  })
});

import graphqlHTTP from 'express-graphql';
import express from 'express';

const app = express();

app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true
}));


let server;

function run() {
  server = app.listen(3000);
}

function stop() {
  server.close();
}

export {run , stop};
