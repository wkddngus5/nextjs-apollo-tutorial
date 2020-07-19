import { useRouter } from 'next/router';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { useState } from 'react';

const client = new ApolloClient({
    uri: 'http://localhost:3000/api/graphql',
    cache: new InMemoryCache(),
});

function UserDetail() {
    const router = useRouter();
    const [ user, setUser ] = useState();

    ( async function () {
        const { query: { id: userId } } = router;
        if ( !userId ) {
            return;
        }
        const { loading, error, data } = await client.query({
            query: gql`
                query user($userId: String!) {
                    user(id: $userId) {
                        id
                        name
                        color
                    }
                }
            `,
            variables: { userId },
        });
        console.log('loading:', loading);
        console.log('error:', error);
        console.log('data:', data);
        setUser( data.user );
    })();

    return (
        <div className="user-detail-page">
            <h1>User Detail</h1>
            { user ? 
                (
                    <>
                        <h2>{ user.name }</h2>
                        <p>아이디: { user.id }</p>
                        <p>색상: { user.color }</p>
                    </>
                ) : (
                    <div>Loading...</div>
                )
            }
        </div>
    );
}

export default UserDetail;

