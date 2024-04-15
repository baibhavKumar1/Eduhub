import './App.css'
import AllRoutes from './Components/AllRoutes'
import { setContext } from '@apollo/client/link/context';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { ThemeProvider } from './Components/ThemeProvider';

//import { Breadcrumbs } from './Components/Breadcrumb';
const httpClient = createHttpLink({ uri: `${import.meta.env.VITE_BACKEND_URL}/graphql` })
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

  // const breadcrumbs = [
  //   { label: 'Home', link: '/' },
  //   { label: 'StudentLecture', link: '/slecture' },
  //   { label: 'SingleLecture', link: '/slecture/:id' },
  //   { label: 'Product Detail' },
  //   ];
  return (
    <>
      <ApolloProvider client={client}>
        <ThemeProvider>
          {/* <Breadcrumbs breadcrumbs={breadcrumbs}/> */}
          <AllRoutes />
        </ThemeProvider>
      </ApolloProvider>
    </>
  )
}

export default App
