"use client";

import { ApolloProvider } from "@apollo/client";
import { client } from "@/client";

export interface ApolloClientProviderProps {
  children: React.ReactNode;
}

export default function ApolloClientProvider({
  children,
}: ApolloClientProviderProps) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
