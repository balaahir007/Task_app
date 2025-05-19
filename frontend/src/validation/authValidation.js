// authValidation.js

export function validateRegister({ email, password, confirmPassword }) {
  if (!email) throw new Error('Email is required');
  if (!isValidEmail(email)) throw new Error('Invalid email format');

  if (!password) throw new Error('Password is required');
  if (password.length < 6) throw new Error('Password must be at least 6 characters');

  if (!confirmPassword) throw new Error('Confirm password is required');
  if (password !== confirmPassword) throw new Error('Passwords do not match');
}
export function validateLogin({ email, password }) {
  if (!email) throw new Error('Email is required');
  if (!isValidEmail(email)) throw new Error('Invalid email format');

  if (!password) throw new Error('Password is required');
  if (password.length < 6) throw new Error('Password must be at least 6 characters');
}
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}