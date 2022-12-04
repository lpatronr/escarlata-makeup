import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from "@apollo/client";
import { env } from "@/env/client.mjs";

const shopifyLink = new HttpLink({
  uri: "/api/gql",
});

const hygraphLink = new HttpLink({
  uri: env.NEXT_PUBLIC_HYGRAPH_GRAPHQL_URL,
});

const apolloClient = new ApolloClient({
  link: ApolloLink.split(
    (operation) => operation.getContext().clientName === "hygraph",
    hygraphLink,
    shopifyLink
  ),
  cache: new InMemoryCache(),
});

export default apolloClient;
