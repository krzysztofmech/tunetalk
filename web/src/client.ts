import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";
import { setContext } from "@apollo/client/link/context";
import crossFetch from "cross-fetch";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./app/api/auth/[...nextauth]/route";

const authLink = setContext(async (req, context) => {
  const session = await getServerSession(authOptions);
  const accessToken = session?.accessToken.accessToken;

  return {
    headers: {
      ...context.headers,
      authorization: accessToken ? "Bearer " + accessToken : "",
    },
  };
});
export const { getClient } = registerApolloClient(() => {
  const link = new HttpLink({
    uri: "http://localhost:4000/graphql",
    fetch: crossFetch,
  });
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(link),
  });
});
