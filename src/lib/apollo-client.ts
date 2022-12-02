import { ApolloClient, InMemoryCache } from "@apollo/client";

const apolloClient = new ApolloClient({
  uri: "https://us-east-1.cdn.hygraph.com/content/clb5oope005co01tc3zb5eew2/master",
  cache: new InMemoryCache(),
});

export default apolloClient;
