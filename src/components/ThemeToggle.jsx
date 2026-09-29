import React from "react";
import { Moon, Sun } from "lucide-react";

import { useTheme } from "../context/ThemeContext";

/**
 * Navbar switch between the dark and light themes.
 * Takes an optional extra class name so it can be
 * repositioned by a page that needs it elsewhere.
 */
export default function ThemeToggle({ className = "" }) {
  const { theme, toggleTheme } = useTheme();

  const isDark = theme === "dark";
  const action = isDark
    ? "Switch to light theme"
    : "Switch to dark theme";

  return (
    <button
      type="button"
      className={`theme-button${
        className ? ` ${className}` : ""
      }`}
      onClick={toggleTheme}
      aria-label={action}
      title={action}
    >
      {isDark ? (
        <Sun size={21} />
      ) : (
        <Moon size={21} />
      )}
    </button>
  );
}
