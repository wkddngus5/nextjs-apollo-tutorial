import { useRouter } from 'next/router';
import { useState } from 'react';
import { useApollo } from '../../lib/apolloClient';
import { USER_DETAIL } from '../../gql/user';

function UserDetail() {
    const apolloClient = useApollo();

    const router = useRouter();
    const [ user, setUser ] = useState();

    ( async function () {
        const { query: { id: userId } } = router;
        if ( !userId ) {
            return;
        }
        const { loading, error, data } = await apolloClient.query({
            query: USER_DETAIL,
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

