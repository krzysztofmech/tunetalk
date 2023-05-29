import AuthContext from "../providers/AuthProvider";
import StyledJsxRegistry from "./registry";
import ThemeProvider from "../providers/ThemeProvider";
import "./global.css";
import ApolloClientProvider from "@/providers/ApolloClientProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthContext>
          <ApolloClientProvider>
            <StyledJsxRegistry>
              <ThemeProvider>{children}</ThemeProvider>
            </StyledJsxRegistry>
          </ApolloClientProvider>
        </AuthContext>
      </body>
    </html>
  );
}
