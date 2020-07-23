import { useMemo } from 'react';
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

let apolloClient;

function createApolloClient() {
    return new ApolloClient({
        ssrMode: typeof window === 'undefined',
        link: new HttpLink({
            uri: 'http://localhost:3000/api/graphql', // Server URL (must be absolute)
            credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
        }),
        cache: new InMemoryCache(),
    });
}

export function initializeApollo( initialState = null ) {
    const _apolloClient = apolloClient ?? createApolloClient();

    if ( initialState ) {
        _apolloClient.cache.restore( initialState );
    }
    if ( typeof window === 'undefined' ) {
        return _apolloClient;
    }
    if ( !apolloClient) {
        apolloClient = _apolloClient;
    }
    return _apolloClient;
}

export function useApollo( initialState ) {
    const store = useMemo(() => initializeApollo( initialState ), [ initialState ]);
    return store;
}
