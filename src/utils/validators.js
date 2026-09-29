/* =====================================================
   SHARED VALIDATORS FOR LOGIN / REGISTER FORMS
   ===================================================== */

export const EMAIL_PATTERN =
  /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const MIN_PASSWORD_LENGTH = 8;

/**
 * Returns an error message for the given email,
 * or an empty string when the email is valid.
 */
export function validateEmail(email) {
  if (!email.trim()) {
    return "Email is required";
  }

  if (!EMAIL_PATTERN.test(email.trim())) {
    return "Enter a valid email address";
  }

  return "";
}

/**
 * Returns an error message for the given password,
 * or an empty string when the password is valid.
 */
export function validatePassword(password) {
  if (!password) {
    return "Password is required";
  }

  if (password.length < MIN_PASSWORD_LENGTH) {
    return `Password must be at least ${MIN_PASSWORD_LENGTH} characters`;
  }

  if (!/[A-Za-z]/.test(password) || !/\d/.test(password)) {
    return "Include at least one letter and one number";
  }

  return "";
}

const STRENGTH_LABELS = {
  1: "Weak",
  2: "Fair",
  3: "Good",
  4: "Strong",
};

const STRENGTH_CLASSES = {
  1: "on-weak",
  2: "on-medium",
  3: "on-medium",
  4: "on-strong",
};

/**
 * Scores a password from 1 to 4 and returns the label
 * plus the CSS modifier used by the strength meter.
 */
export function getPasswordStrength(password) {
  if (!password) {
    return { score: 0, label: "", className: "" };
  }

  let score = 0;

  if (password.length >= MIN_PASSWORD_LENGTH) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password))
    score++;
  if (/\d/.test(password) && /[^\w\s]/.test(password))
    score++;

  return {
    score,
    label: STRENGTH_LABELS[score] ?? "Weak",
    className: STRENGTH_CLASSES[score] ?? "on-weak",
  };
}
