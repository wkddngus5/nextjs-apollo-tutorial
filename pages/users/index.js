import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useApollo } from '../../lib/apolloClient';
import { USERS_LIST } from '../../gql/user';

export default function Users() {
    const apolloClient = useApollo();
    const [ users, setUsers ] = useState([]);

    useEffect( () => {
        (
            async () => {
                const { loading, error, data } = await apolloClient.query({ query: USERS_LIST, });

                console.log('loading:', loading);
                console.log('error:', error);
                console.log('data:', data);
                setUsers( data.users );
            }
        )();
    }, []);

    return (
        <div className="users-page">
            <ul>
                {
                    users.map( ( user ) => {
                        const { id, name, color } = user;
                        return (
                            <Link href={ `/users/${ id }` } key={ id }>
                                <li style={ { color } }>
                                    { `${ id }. ${ name }(${ color })` }
                                </li>
                            </Link>
                        )
                    } )
                }
            </ul>
        </div>
    );
}
