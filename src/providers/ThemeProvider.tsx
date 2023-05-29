"use client";
import { theme } from "@/styles/mui/theme";
import { ThemeProvider as MUIThemeProvider } from "@mui/material";

export interface ThemeProviderProps {
  children: React.ReactNode;
}

export default function AuthContext({ children }: ThemeProviderProps) {
  return <MUIThemeProvider theme={theme}>{children}</MUIThemeProvider>;
}
