import AuthContext from "../providers/AuthProvider";
import StyledJsxRegistry from "./registry";
import ThemeProvider from "../providers/ThemeProvider";
import "./global.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthContext>
          <StyledJsxRegistry>
            <ThemeProvider>{children}</ThemeProvider>
          </StyledJsxRegistry>
        </AuthContext>
      </body>
    </html>
  );
}
