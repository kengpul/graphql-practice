import './App.css';
import DisplayData from './DisplayData';
import { ApolloClient, InMemoryCache, ApolloProvider, useQuery } from "@apollo/client"

function App() {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: "http://localhost:4000/graphql"
  })

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <DisplayData />

      </div>
    </ApolloProvider>
  );
}

export default App;
