import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  LogIn,
  AlertCircle,
} from "lucide-react";

import AuthLayout from "../components/AuthLayout";
import {
  validateEmail,
  validatePassword,
} from "../utils/validators";

const EMPTY_FORM = {
  email: "",
  password: "",
};

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [notice, setNotice] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));

    setErrors((current) => ({
      ...current,
      [name]: "",
    }));
  }

  function validate() {
    const nextErrors = {
      email: validateEmail(form.email),
      password: validatePassword(form.password),
    };

    setErrors(nextErrors);

    return !nextErrors.email && !nextErrors.password;
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    /* No backend is wired up yet. Replace this with
       your authentication API call. */
    navigate("/");
  }

  function handleSocial(provider) {
    setNotice(
      `${provider} sign-in is not connected yet. ` +
        "Use your email and password for now.",
    );
  }

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle={
        <>
          New to CodeArena?{" "}
          <Link to="/register">Create an account</Link>
        </>
      }
      onSocial={handleSocial}
    >

      <form
        className="auth-form"
        onSubmit={handleSubmit}
        noValidate
      >

        {/* ============ EMAIL ============ */}

        <div className="form-group">

          <label
            className="form-label"
            htmlFor="login-email"
          >
            Email Address
          </label>

          <div className="input-wrapper">

            <Mail size={18} />

            <input
              id="login-email"
              className={`form-input${
                errors.email ? " has-error" : ""
              }`}
              type="email"
              name="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={
                errors.email ? "login-email-error" : undefined
              }
            />

          </div>

          {errors.email && (
            <span
              className="field-error"
              id="login-email-error"
            >
              <AlertCircle size={13} />
              {errors.email}
            </span>
          )}

        </div>

        {/* ============ PASSWORD ============ */}

        <div className="form-group">

          <label
            className="form-label"
            htmlFor="login-password"
          >
            Password
            <a href="#forgot-password">
              Forgot password?
            </a>
          </label>

          <div className="input-wrapper">

            <Lock size={18} />

            <input
              id="login-password"
              className={`form-input has-toggle${
                errors.password ? " has-error" : ""
              }`}
              type={showPassword ? "text" : "password"}
              name="password"
              autoComplete="current-password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              aria-invalid={Boolean(errors.password)}
              aria-describedby={
                errors.password
                  ? "login-password-error"
                  : undefined
              }
            />

            <button
              type="button"
              className="password-toggle"
              onClick={() =>
                setShowPassword((visible) => !visible)
              }
              aria-label={
                showPassword
                  ? "Hide password"
                  : "Show password"
              }
            >
              {showPassword ? (
                <EyeOff size={17} />
              ) : (
                <Eye size={17} />
              )}
            </button>

          </div>

          {errors.password && (
            <span
              className="field-error"
              id="login-password-error"
            >
              <AlertCircle size={13} />
              {errors.password}
            </span>
          )}

        </div>

        {/* ============ OPTIONS ============ */}

        <div className="form-options">

          <label className="checkbox-label">

            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(event) =>
                setRememberMe(event.target.checked)
              }
            />

            Keep me signed in

          </label>

        </div>

        {/* ============ SUBMIT ============ */}

        <button type="submit" className="auth-submit">
          <LogIn size={19} />
          Login to CodeArena
        </button>

      </form>

      {notice && (
        <div className="auth-alert" role="status">
          <AlertCircle size={16} />
          {notice}
        </div>
      )}

      <p className="auth-switch">
        Don&apos;t have an account?{" "}
        <Link to="/register">Sign up free</Link>
      </p>

    </AuthLayout>
  );
}

export default Login;
