import './App.css'
import Data from './displayData'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery
} from '@apollo/client'

function App () {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: 'http://localhost:3000/graphql'
  })
  return (
    <ApolloProvider client={client}>
      <div className='App'>
        <h1>List of Users</h1>
        <Data />
      </div>
    </ApolloProvider>
  )
}

export default App
