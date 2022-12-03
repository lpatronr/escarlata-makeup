import { ApolloClient, InMemoryCache } from "@apollo/client";
import { env } from "@/env/client.mjs";

const apolloClient = new ApolloClient({
  uri: env.NEXT_PUBLIC_GRAPHQL_URL,
  cache: new InMemoryCache(),
});

export default apolloClient;
