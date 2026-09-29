import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    setError('');

    const registeredUser = JSON.parse(localStorage.getItem('registeredUser'));
    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail || !newPassword || !confirmNewPassword) {
      setError('All fields are required.');
      return;
    }

    if (!registeredUser || registeredUser.email !== normalizedEmail) {
      setError('No registered account found with this email.');
      return;
    }

    if (newPassword.length < 6) {
      setError('New password must be at least 6 characters.');
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setError('New passwords must match.');
      return;
    }

    localStorage.setItem(
      'registeredUser',
      JSON.stringify({ ...registeredUser, password: newPassword })
    );
    localStorage.removeItem('loggedInUser');
    navigate('/login');
  };

  return (
    <main className="auth-page">
      <section className="auth-card" aria-labelledby="forgot-password-title">
        <p className="eyebrow">Password reset</p>
        <h1 id="forgot-password-title">Forgot Password</h1>
        <p className="auth-subtitle">Reset the password for your registered account.</p>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <label>
            <span>Email</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="john@example.com"
            />
          </label>

          <label>
            <span>New Password</span>
            <input
              type="password"
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
              placeholder="Minimum 6 characters"
            />
          </label>

          <label>
            <span>Confirm New Password</span>
            <input
              type="password"
              value={confirmNewPassword}
              onChange={(event) => setConfirmNewPassword(event.target.value)}
              placeholder="Re-enter new password"
            />
          </label>

          {error && <p className="form-error">{error}</p>}

          <button className="primary-button" type="submit">Reset Password</button>
        </form>

        <p className="auth-footer">
          Remembered it? <Link to="/login">Back to Login</Link>
        </p>
      </section>
    </main>
  );
}

export default ForgotPassword;
