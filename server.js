import { ApolloServer, gql } from 'apollo-server-express';
import express from 'express';
const app = express();
const typeDefs = gql(`
    type Query {
        hello: String!
    }
`);
const resolvers = {
    Query: {
        hello: () => 'hello'
    }
};
const server = new ApolloServer({
    typeDefs,
    resolvers
    // typeDefs
});
server.applyMiddleware({ app });
app.listen({ port: 4001 }, () => {
    console.log(`Server ready at http://localhost:4001${server.graphqlPath}`);
});