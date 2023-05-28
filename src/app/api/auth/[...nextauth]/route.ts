import { generateRandomString } from "@/utils/generateRandomString";
import NextAuth from "next-auth";
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
      token: {
        url: "https://accounts.spotify.com/api/token",
      },
    }),
  ],
});

export { handler as GET, handler as POST };
