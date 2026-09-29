import { createContext, useContext } from "react";

/**
 * Holds the active theme plus a setter. Kept in its own
 * module so ThemeProvider.jsx only exports components.
 */
export const ThemeContext = createContext(null);

/** Read the theme from anywhere below <ThemeProvider>. */
export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error(
      "useTheme must be used inside a <ThemeProvider>.",
    );
  }

  return context;
}
