import gql from 'graphql-tag';

export const USERS_LIST = gql`
    query users {
        users {
            id
            name
            color
        }
    }
`;

export const USER_DETAIL = gql`
    query user($userId: String!) {
        user(id: $userId) {
            id
            name
            color
        }
    }
`;

export const SIGNIN = gql`
    query signin($email: String!, $password: String!, $name: String!) {
        signin(email: $email, password: $password, name: $name) {
            id
            email
            password
            name
        }
    }
`;

export const SIGNUP = gql`
    mutation signup($email: String!, $password: String!, $name: String!) {
        signup(email: $email, password: $password, name: $name) {
            id
            email
            password
            name
        }
    }
`;
