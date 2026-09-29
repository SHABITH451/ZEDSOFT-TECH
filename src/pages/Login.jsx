import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

function LoginVisual() {
  return (
    <aside className="login-visual" aria-label="Account security illustration">
      <img src="/auth-security.png" alt="A secure lock protecting an account" />
    </aside>
  );
}

function Login() {
  const rememberedEmail = localStorage.getItem('rememberedEmail') || '';
  const [email, setEmail] = useState(rememberedEmail);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(Boolean(rememberedEmail));
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    navigate('/login');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError('');

    const registeredUser = JSON.parse(localStorage.getItem('registeredUser'));
    const normalizedEmail = email.trim().toLowerCase();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!normalizedEmail || !password) {
      setError('Email and password are required.');
      return;
    }

    if (!emailPattern.test(normalizedEmail)) {
      setError('Enter a valid email address.');
      return;
    }

    if (
      !registeredUser ||
      registeredUser.email !== normalizedEmail ||
      registeredUser.password !== password
    ) {
      setError('Incorrect email or password.');
      return;
    }

    if (rememberMe) {
      localStorage.setItem('rememberedEmail', normalizedEmail);
    } else {
      localStorage.removeItem('rememberedEmail');
    }

    localStorage.setItem('loggedInUser', JSON.stringify(registeredUser));
    navigate('/dashboard');
  };

  if (loggedInUser) {
    return (
      <main className="login-page">
        <div className="login-form-side">
          <section className="auth-card center-card" aria-labelledby="logged-in-title">
            <p className="eyebrow">Session active</p>
            <h1 id="logged-in-title">Already Logged In</h1>
            <p className="auth-subtitle">
              You are signed in as <strong>{loggedInUser.fullName || loggedInUser.email}</strong>.
            </p>
            <div className="button-group">
              <button className="primary-button" type="button" onClick={() => navigate('/dashboard')}>
                Go to Dashboard
              </button>
              <button className="secondary-button" type="button" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </section>
        </div>
        <LoginVisual />
      </main>
    );
  }

  return (
    <main className="login-page">
      <div className="login-form-side">
        <section className="auth-card" aria-labelledby="login-title">
          <h1 id="login-title">Welcome Back</h1>
          <p className="auth-subtitle">Sign in to continue to your account.</p>

          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            <label>
              <span>Email Address</span>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="john@example.com"
                autoComplete="email"
              />
            </label>

            <label>
              <span>Password</span>
              <div className="password-field">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword((current) => !current)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                </button>
              </div>
            </label>

            <div className="form-row login-options">
              <label className="remember-control">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(event) => setRememberMe(event.target.checked)}
                />
                <span>Remember Me</span>
              </label>
              <Link to="/forgot-password">Forgot Password?</Link>
            </div>

            {error && <p className="form-error" role="alert">{error}</p>}

            <button className="primary-button" type="submit">Login</button>
          </form>

          <p className="auth-footer">
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </section>
      </div>
      <LoginVisual />
    </main>
  );
}

export default Login;
