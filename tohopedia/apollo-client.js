import { ApolloClient, InMemoryCache, HttpLink, from } from '@apollo/client'
import { getCookie } from 'cookies-next'
import { onError } from '@apollo/client/link/error'

const token = getCookie('currUser');

// const client = new ApolloClient({
//   uri: 'http://localhost:8080/query',
//   // cache: new InMemoryCache(),
//   headers: token?{
//     Authorization: 'Bearer ' + token,
//   }: {},
// })

// export default client

const httpLink = new HttpLink({
  uri: 'http://localhost:8080/query',
  headers: token
    ? {
        Authorization: 'bearer ' + token,
      }
    : {},
})

const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
  if (networkError) {
    if (networkError.name == 'TypeError') {
       alert('Backend is down\n' + 'Network Error: ' + networkError.message)
       Router.reload()
    }
  }
})

const client = new ApolloClient({
  link: from([errorLink, httpLink]),
  cache: new InMemoryCache(),
})

export default client