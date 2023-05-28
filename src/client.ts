import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { getSession } from "next-auth/react";
const link = createHttpLink({
  uri: "http://localhost:4000/graphql",
});

const authLink = setContext(async (_, { headers }) => {
  const token = await getSession();

  return {
    headers: {
      ...headers,
      authorization: token?.accessToken ? `Bearer ${token?.accessToken}` : "",
    },
  };
});
export const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
  link: authLink.concat(link),
});
