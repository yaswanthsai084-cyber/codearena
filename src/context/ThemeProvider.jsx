import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { ThemeContext } from "./ThemeContext";

export const THEME_STORAGE_KEY = "codearena-theme";

/**
 * index.html already stamps data-theme on <html> before the
 * first paint, so read it back from there instead of paying
 * for a render that would only flash the wrong theme.
 */
function getInitialTheme() {
  if (typeof document === "undefined") {
    return "dark";
  }

  const applied = document.documentElement.dataset.theme;

  if (applied === "light" || applied === "dark") {
    return applied;
  }

  return window.matchMedia("(prefers-color-scheme: light)")
    .matches
    ? "light"
    : "dark";
}

/**
 * Drives the dark / light themes declared in index.css and
 * remembers the choice in localStorage.
 */
export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;

    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      /* private mode — the theme just won't persist */
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((current) =>
      current === "dark" ? "light" : "dark",
    );
  }, []);

  const value = useMemo(
    () => ({ theme, setTheme, toggleTheme }),
    [theme, toggleTheme],
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}
