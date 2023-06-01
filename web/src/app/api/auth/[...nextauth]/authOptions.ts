import { clientId, clientSecret, redirectUri, scope } from "@/constants/auth";
import { generateRandomString } from "@/utils/generateRandomString";
import { AuthOptions } from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";

const state = generateRandomString(16);

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
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

  callbacks: {
    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account && account.access_token) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token;
      return session;
    },
  },
};
