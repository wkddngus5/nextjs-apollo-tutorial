import { ApolloServer, gql } from 'apollo-server-micro';
import data from './data.json';
import excuteQuery from '../../lib/db';

const typeDefs = gql`
    type Query {
        users: [User!]!
        user(id: String!): User!
        signin(email: String!, password: String!, name: String!): User
    }
    type Mudation {
        signin: User
        signup(email: String!, password: String!, name: String!): User
        signout: User
    }
    type User {
        id: String
        email: String
        password: String
        name: String
        color: String
    }
`;

const resolvers = {
    Query: {
        async users(_parent, _args, _context) {
            // return data.users;
            console.log(await excuteQuery('SELECT * FROM users'));
            return await excuteQuery('SELECT * FROM users');
        },
        user(_parent, args, _context) {
            return data.users.find((user) => user.id === parseInt(args.id));
        },
    },
    Mudation: {
        async signup(_parent, args, _context) {
            const {email, password} = args;
            console.log(email, password);
            return await excuteQuery('SELECT * FROM users');
        } 
    }
};

const apolloServer = new ApolloServer({ typeDefs, resolvers });

export const config = {
    api: {
        bodyParser: false,
    },
};

export default apolloServer.createHandler({ path: '/api/graphql' });
