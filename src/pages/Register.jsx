import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  UserPlus,
  AlertCircle,
} from "lucide-react";

import AuthLayout from "../components/AuthLayout";
import {
  validateEmail,
  validatePassword,
  getPasswordStrength,
} from "../utils/validators";

const EMPTY_FORM = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [notice, setNotice] = useState("");

  const strength = getPasswordStrength(form.password);

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
      name: form.name.trim()
        ? ""
        : "Full name is required",
      email: validateEmail(form.email),
      password: validatePassword(form.password),
      confirmPassword: !form.confirmPassword
        ? "Please confirm your password"
        : form.confirmPassword !== form.password
          ? "Passwords do not match"
          : "",
      terms: acceptedTerms
        ? ""
        : "Please accept the terms and conditions",
    };

    setErrors(nextErrors);

    return Object.values(nextErrors).every(
      (message) => !message,
    );
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    /* No backend is wired up yet. Replace this with
       your registration API call. */
    navigate("/");
  }

  function handleSocial(provider) {
    setNotice(
      `${provider} sign-up is not connected yet. ` +
        "Use your email address to register for now.",
    );
  }

  return (
    <AuthLayout
      title="Create your account"
      subtitle={
        <>
          Already have an account?{" "}
          <Link to="/login">Login instead</Link>
        </>
      }
      onSocial={handleSocial}
    >

      <form
        className="auth-form"
        onSubmit={handleSubmit}
        noValidate
      >

        {/* ============ FULL NAME ============ */}

        <div className="form-group">

          <label
            className="form-label"
            htmlFor="register-name"
          >
            Full Name
          </label>

          <div className="input-wrapper">

            <User size={18} />

            <input
              id="register-name"
              className={`form-input${
                errors.name ? " has-error" : ""
              }`}
              type="text"
              name="name"
              autoComplete="name"
              placeholder="Your full name"
              value={form.name}
              onChange={handleChange}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={
                errors.name ? "register-name-error" : undefined
              }
            />

          </div>

          {errors.name && (
            <span
              className="field-error"
              id="register-name-error"
            >
              <AlertCircle size={13} />
              {errors.name}
            </span>
          )}

        </div>

        {/* ============ EMAIL ============ */}

        <div className="form-group">

          <label
            className="form-label"
            htmlFor="register-email"
          >
            Email Address
          </label>

          <div className="input-wrapper">

            <Mail size={18} />

            <input
              id="register-email"
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
                errors.email
                  ? "register-email-error"
                  : undefined
              }
            />

          </div>

          {errors.email && (
            <span
              className="field-error"
              id="register-email-error"
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
            htmlFor="register-password"
          >
            Password
          </label>

          <div className="input-wrapper">

            <Lock size={18} />

            <input
              id="register-password"
              className={`form-input has-toggle${
                errors.password ? " has-error" : ""
              }`}
              type={showPassword ? "text" : "password"}
              name="password"
              autoComplete="new-password"
              placeholder="Create a strong password"
              value={form.password}
              onChange={handleChange}
              aria-invalid={Boolean(errors.password)}
              aria-describedby={
                errors.password
                  ? "register-password-error"
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

          {form.password && (
            <div className="strength-meter">

              <div className="strength-bars">
                {[1, 2, 3, 4].map((step) => (
                  <i
                    key={step}
                    className={
                      step <= strength.score
                        ? strength.className
                        : ""
                    }
                  ></i>
                ))}
              </div>

              <span className="strength-text">
                Password strength:{" "}
                <b>{strength.label}</b>
              </span>

            </div>
          )}

          {errors.password && (
            <span
              className="field-error"
              id="register-password-error"
            >
              <AlertCircle size={13} />
              {errors.password}
            </span>
          )}

        </div>

        {/* ============ CONFIRM PASSWORD ============ */}

        <div className="form-group">

          <label
            className="form-label"
            htmlFor="register-confirm"
          >
            Confirm Password
          </label>

          <div className="input-wrapper">

            <Lock size={18} />

            <input
              id="register-confirm"
              className={`form-input has-toggle${
                errors.confirmPassword ? " has-error" : ""
              }`}
              type={showConfirm ? "text" : "password"}
              name="confirmPassword"
              autoComplete="new-password"
              placeholder="Re-enter your password"
              value={form.confirmPassword}
              onChange={handleChange}
              aria-invalid={Boolean(errors.confirmPassword)}
              aria-describedby={
                errors.confirmPassword
                  ? "register-confirm-error"
                  : undefined
              }
            />

            <button
              type="button"
              className="password-toggle"
              onClick={() =>
                setShowConfirm((visible) => !visible)
              }
              aria-label={
                showConfirm
                  ? "Hide password"
                  : "Show password"
              }
            >
              {showConfirm ? (
                <EyeOff size={17} />
              ) : (
                <Eye size={17} />
              )}
            </button>

          </div>

          {errors.confirmPassword && (
            <span
              className="field-error"
              id="register-confirm-error"
            >
              <AlertCircle size={13} />
              {errors.confirmPassword}
            </span>
          )}

        </div>

        {/* ============ TERMS ============ */}

        <div className="form-group">

          <label className="checkbox-label">

            <input
              type="checkbox"
              checked={acceptedTerms}
              onChange={(event) => {
                setAcceptedTerms(event.target.checked);
                setErrors((current) => ({
                  ...current,
                  terms: "",
                }));
              }}
            />

            <span>
              I agree to the{" "}
              <a href="#terms">Terms of Service</a> and{" "}
              <a href="#privacy">Privacy Policy</a>
            </span>

          </label>

          {errors.terms && (
            <span
              className="field-error field-error-inline"
              id="register-terms-error"
            >
              <AlertCircle size={13} />
              {errors.terms}
            </span>
          )}

        </div>

        {/* ============ SUBMIT ============ */}

        <button type="submit" className="auth-submit">
          <UserPlus size={19} />
          Create Account
        </button>

      </form>

      {notice && (
        <div className="auth-alert" role="status">
          <AlertCircle size={16} />
          {notice}
        </div>
      )}

      <p className="auth-switch">
        Already have an account?{" "}
        <Link to="/login">Login instead</Link>
      </p>

    </AuthLayout>
  );
}

export default Register;
