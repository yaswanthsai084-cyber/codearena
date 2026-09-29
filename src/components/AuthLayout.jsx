import React from "react";
import { Link } from "react-router-dom";
import {
  Code2,
  Sparkles,
  CheckCircle2,
  ArrowLeft,
} from "lucide-react";

import ThemeToggle from "./ThemeToggle";

import "../pages/Auth.css";

/* Brand marks are inlined because lucide-react v1
   no longer ships third-party brand icons. */

function GoogleIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        fill="#4285F4"
        d="M23.5 12.3c0-.9-.1-1.5-.2-2.2H12v4.1h6.5c-.1 1.1-.8 2.7-2.3 3.7l3.5 2.8c2.1-1.9 3.3-4.7 3.3-8z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.2 0 5.9-1 7.8-2.9l-3.7-2.9c-1 .7-2.3 1.2-4.1 1.2-3.1 0-5.7-2-6.6-4.8l-3.8 3C3.4 21.4 7.4 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.4 14.6c-.2-.7-.4-1.4-.4-2.2s.1-1.5.4-2.2l-3.8-3C.6 8.8 0 10.8 0 12.4s.6 3.6 1.6 5.2l3.8-3z"
      />
      <path
        fill="#EA4335"
        d="M12 4.8c2.3 0 3.8 1 4.7 1.8l3.3-3.2C17.9 1.2 15.2 0 12 0 7.4 0 3.4 2.6 1.6 6.2l3.8 3c.9-2.8 3.5-4.4 6.6-4.4z"
      />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 .5C5.6.5.5 5.6.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.2.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.1.1 1.7 1.2 1.7 1.2 1 1.7 2.6 1.2 3.2.9.1-.7.4-1.2.7-1.5-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a11 11 0 0 1 5.8 0c2.2-1.5 3.2-1.2 3.2-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .4.2.7.8.6a11.5 11.5 0 0 0 7.9-10.9C23.5 5.6 18.4.5 12 .5z" />
    </svg>
  );
}

export { GoogleIcon, GitHubIcon };

const highlights = [
  "Structured courses for every language",
  "Coding games and real-time challenges",
  "Track progress and climb the leaderboard",
];

/**
 * Shared two column shell used by the Login and
 * Register pages. Handles branding, the marketing
 * panel, the social sign-in row and the form card.
 */
function AuthLayout({
  title,
  subtitle,
  onSocial,
  children,
}) {
  return (
    <div className="codearena">

      <div className="auth-page">

        {/* ============ LEFT PANEL ============ */}

        <aside className="auth-visual">

          <div className="auth-glow auth-glow-one"></div>
          <div className="auth-glow auth-glow-two"></div>

          <Link to="/" className="auth-brand">

            <div className="auth-brand-logo">
              <Code2 size={40} />
            </div>

            <div>
              <h1>
                Code<span>Arena</span>
              </h1>

              <p>Learn • Practice • Build • Grow</p>
            </div>

          </Link>

          <div className="auth-visual-body">

            <div className="auth-visual-badge">
              <Sparkles size={14} />
              {title === "Create your account" 
                ? "Free forever for students"
                : "Welcome back, coder"}
            </div>

            <h2 className="auth-visual-title">
              Turn curiosity
              <br />
              <span>into real skills.</span>
            </h2>

            <p className="auth-visual-text">
              Join thousands of computer students learning
              to code the practical way — with structured
              courses, hands-on challenges and a leaderboard
              that keeps you going.
            </p>

            <ul className="auth-highlights">

              {highlights.map((item) => (
                <li key={item}>
                  <CheckCircle2 size={18} />
                  {item}
                </li>
              ))}

            </ul>

          </div>

          <div className="auth-visual-footer">
            <span></span>
            SKILLS TODAY • OPPORTUNITIES TOMORROW
          </div>

        </aside>

        {/* ============ RIGHT PANEL ============ */}

        <main className="auth-form-panel">

          <div className="auth-panel-bar">

            <Link to="/" className="auth-back-link">
              <ArrowLeft size={16} />
              Back to Home
            </Link>

            <ThemeToggle />

          </div>

          <div className="auth-card">

            <div className="auth-card-header">
              <h2>{title}</h2>
              <p>{subtitle}</p>
            </div>

            <div className="auth-socials">

              <button
                type="button"
                className="auth-social"
                onClick={() => onSocial("Google")}
              >
                <GoogleIcon />
                Google
              </button>

              <button
                type="button"
                className="auth-social"
                onClick={() => onSocial("GitHub")}
              >
                <GitHubIcon />
                GitHub
              </button>

            </div>

            <div className="auth-divider">
              or continue with email
            </div>

            {children}

          </div>

        </main>

      </div>

    </div>
  );
}

export default AuthLayout;
