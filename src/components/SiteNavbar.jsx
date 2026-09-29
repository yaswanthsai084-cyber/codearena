import React from "react";
import { Link } from "react-router-dom";
import {
  Home as HomeIcon,
  BookOpen,
  Gamepad2,
  Trophy,
  Code2,
} from "lucide-react";

import ThemeToggle from "./ThemeToggle";

/**
 * Sticky header shared by every page of the app. The styles
 * live in index.css (section 4), so this component only owns
 * the markup and which link is marked as current.
 *
 * `active` is one of "home" | "courses" — Home's own
 * placeholder links keep their existing behaviour.
 */
export default function SiteNavbar({ active = "" }) {
  return (
    <header className="navbar">

      <Link to="/" className="brand">

        <div className="brand-logo">
          <Code2 size={44} />
        </div>

        <div>
          <h1>
            Code<span>Arena</span>
          </h1>

          <p>Learn • Practice • Build • Grow</p>
        </div>

      </Link>

      <nav className="nav-links">

        <Link
          to="/"
          className={active === "home" ? "active" : undefined}
        >
          <HomeIcon size={18} />
          Home
        </Link>

        <Link
          to="/courses"
          className={active === "courses" ? "active" : undefined}
        >
          <BookOpen size={18} />
          Courses
        </Link>

        <a href="#games">
          <Gamepad2 size={18} />
          Games
        </a>

        <a href="#leaderboard">
          <Trophy size={18} />
          Leaderboard
        </a>

      </nav>

      <div className="nav-actions">

        <ThemeToggle />

        <Link to="/login" className="login-button">
          Login
        </Link>

        <Link to="/register" className="signup-button">
          Sign Up
        </Link>

      </div>

    </header>
  );
}
