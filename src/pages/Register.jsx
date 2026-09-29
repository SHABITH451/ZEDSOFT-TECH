import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const initialForm = {
  fullName: '',
  email: '',
  password: '',
  confirmPassword: ''
};

function Register() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((currentForm) => ({ ...currentForm, [name]: value }));
  };

  const validateForm = () => {
    const nextErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!form.fullName.trim()) nextErrors.fullName = 'Full name is required.';
    if (!form.email.trim()) {
      nextErrors.email = 'Email is required.';
    } else if (!emailPattern.test(form.email)) {
      nextErrors.email = 'Enter a valid email address.';
    }
    if (!form.password) {
      nextErrors.password = 'Password is required.';
    } else if (form.password.length < 6) {
      nextErrors.password = 'Password must be at least 6 characters.';
    }
    if (!form.confirmPassword) {
      nextErrors.confirmPassword = 'Please confirm your password.';
    } else if (form.password !== form.confirmPassword) {
      nextErrors.confirmPassword = 'Passwords must match.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    const user = {
      fullName: form.fullName.trim(),
      email: form.email.trim().toLowerCase(),
      password: form.password
    };

    localStorage.setItem('registeredUser', JSON.stringify(user));
    navigate('/login');
  };

  return (
    <main className="auth-page">
      <section className="auth-card" aria-labelledby="register-title">
        <p className="eyebrow">Create account</p>
        <h1 id="register-title">Register</h1>
        <p className="auth-subtitle">Enter your details to create your demo account.</p>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <label>
            <span>Full Name</span>
            <input
              name="fullName"
              type="text"
              value={form.fullName}
              onChange={updateField}
              placeholder="John Smith"
            />
            {errors.fullName && <small className="error">{errors.fullName}</small>}
          </label>

          <label>
            <span>Email</span>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={updateField}
              placeholder="john@example.com"
            />
            {errors.email && <small className="error">{errors.email}</small>}
          </label>

          <label>
            <span>Password</span>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={updateField}
              placeholder="Minimum 6 characters"
            />
            {errors.password && <small className="error">{errors.password}</small>}
          </label>

          <label>
            <span>Confirm Password</span>
            <input
              name="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={updateField}
              placeholder="Re-enter password"
            />
            {errors.confirmPassword && <small className="error">{errors.confirmPassword}</small>}
          </label>

          <button className="primary-button" type="submit">Register</button>
        </form>

        <p className="auth-footer">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </section>
    </main>
  );
}

export default Register;
