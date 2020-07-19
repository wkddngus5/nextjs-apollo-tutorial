import gql from 'graphql-tag';

export const USER_DETAIL = gql`
    query user( $id: String! ) {
        user( id: $id ) {
            id
            name
            color
        }
    }
`;
