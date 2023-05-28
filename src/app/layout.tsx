"use client";
import { SessionProvider } from "next-auth/react";
import { ApolloProvider } from "@apollo/client";
import { ThemeProvider } from "@mui/material";
import "./global.css";
import StyledJsxRegistry from "./registry";
import { theme } from "@/styles/mui/theme";
import { client } from "@/client";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <ApolloProvider client={client}>
            <StyledJsxRegistry>
              <ThemeProvider theme={theme}>{children}</ThemeProvider>
            </StyledJsxRegistry>
          </ApolloProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
