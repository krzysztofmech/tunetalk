import { generateRandomString } from "@/utils/generateRandomString";
import NextAuth, { CookiesOptions, User } from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import { clientId, redirectUri, scope, clientSecret } from "@/constants/auth";

const state = generateRandomString(16);

const handler = NextAuth({
  providers: [
    SpotifyProvider({
      clientId: clientId!,
      clientSecret: clientSecret!,
      authorization: {
        params: {
          response_type: "code",
          redirect_uri: redirectUri,
          state,
          scope,
        },
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
