import './App.css'
import AllRoutes from './Components/AllRoutes'
import { setContext } from '@apollo/client/link/context';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import {io} from 'socket.io-client'
//import { Breadcrumbs } from './Components/Breadcrumb';
const httpClient = createHttpLink({uri:'http://localhost:3000/graphql'})
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});
const client = new ApolloClient({
  link: authLink.concat(httpClient),
  cache: new InMemoryCache(),
})
function App() {
  const socket = io.connect("http://localhost:3000");

  socket.on("connect", () => {
    console.log("Connected to the Socket.io server");
  });
  // const breadcrumbs = [
  //   { label: 'Home', link: '/' },
  //   { label: 'StudentLecture', link: '/slecture' },
  //   { label: 'SingleLecture', link: '/slecture/:id' },
  //   { label: 'Product Detail' },
  //   ];
  return (
    <>
    <ApolloProvider client={client}>
    {/* <Breadcrumbs breadcrumbs={breadcrumbs}/> */}
      <AllRoutes/>
      </ApolloProvider>
    </>
  )
}

export default App
