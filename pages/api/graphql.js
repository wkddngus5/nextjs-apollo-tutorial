import { ApolloServer, gql } from 'apollo-server-micro';
import data from './data.json';

const typeDefs = gql`
    type Query {
        users: [User!]!
        user(id:String!): User!
    }
    type User {
        id: String
        name: String
        color: String
    }
`;

const resolvers = {
    Query: {
        users( _parent, _args, _context ) {
            return data.users;
        },
        user( parent, args, context ) {
            return data.users.find( user => user.id === parseInt( args.id ) );
        }
    },
};

const apolloServer = new ApolloServer({ typeDefs, resolvers });

export const config = {
    api: {
        bodyParser: false,
    },
};

export default apolloServer.createHandler({ path: '/api/graphql' });
