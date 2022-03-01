import { ApolloClient, InMemoryCache } from '@apollo/client'
import { getCookie } from 'cookies-next'

const token = getCookie('currUser');

const client = new ApolloClient({
  uri: 'http://localhost:8080/query',
  cache: new InMemoryCache(),
  headers: token?{
    Authorization: 'Bearer ' + token,
  }: {},
})

export default client