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
    query user( $userId: String! ) {
        user( id: $userId ) {
            id
            name
            color
        }
    }
`;
