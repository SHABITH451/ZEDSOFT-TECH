import React from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    navigate('/login');
  };

  return (
    <main className="dashboard-page">
      <section className="dashboard-panel" aria-labelledby="dashboard-title">
        <div>
          <p className="eyebrow">Dashboard</p>
          <h1 id="dashboard-title">Welcome, {loggedInUser.fullName}</h1>
          <p className="auth-subtitle">You are successfully logged in.</p>
        </div>
        <button className="secondary-button" type="button" onClick={handleLogout}>
          Logout
        </button>
      </section>
    </main>
  );
}

export default Dashboard;
