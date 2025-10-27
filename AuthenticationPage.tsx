// src/pages/AuthenticationPage.tsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import '../AI.css';

const AuthenticationPage: React.FC = () => {
  const { setIsAuthenticated, setActivePage } = useAppContext();
  const navigate = useNavigate();
  // تحديد الوضع الافتراضي بناءً على المسار الحالي
  const initialMode = window.location.pathname === '/register' ? 'register' : 'login';
  const [authMode, setAuthMode] = useState<'login' | 'register'>(initialMode);
  const [error, setError] = useState('');

  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  useEffect(() => {
    setActivePage(authMode);
    // تحديث المسار في المتصفح عند التبديل بين التبويبات
    navigate(`/${authMode}`, { replace: true });
  }, [authMode, setActivePage, navigate]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!loginData.email || !loginData.password) {
      setError('Please fill in all fields.');
      return;
    }
    // Mock authentication logic
    setIsAuthenticated(true);
    navigate('/dashboard');
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (registerData.password !== registerData.confirmPassword) {
      setError('Passwords do not match!');
      return;
    }
    if (!registerData.username || !registerData.email || !registerData.password) {
      setError('Please fill in all required fields.');
      return;
    }
    // Mock registration logic
    setIsAuthenticated(true);
    navigate('/dashboard');
  };

  const isLoginMode = authMode === 'login';

  return (
    <div className="auth-container">
      <div className="auth-tabs">
        <button
          className={`auth-tab-btn ${isLoginMode ? 'active' : ''}`}
          onClick={() => setAuthMode('login')}
        >
          Sign In
        </button>
        <button
          className={`auth-tab-btn ${!isLoginMode ? 'active' : ''}`}
          onClick={() => setAuthMode('register')}
        >
          Sign Up
        </button>
      </div>

      <form className="auth-card" onSubmit={isLoginMode ? handleLogin : handleRegister}>
        <div className="auth-header">
          <h1>{isLoginMode ? 'Welcome Back' : 'Create Account'}</h1>
          <p>{isLoginMode ? 'Sign in to your account' : 'Join us to start your journey!'}</p>
        </div>

        {error && <div className="error-message" style={{marginBottom: '1rem'}}>{error}</div>}

        {!isLoginMode && (
          <div className="input-group">
            <input
              type="text"
              placeholder="Username"
              value={registerData.username}
              onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}
              required
            />
          </div>
        )}

        <div className="input-group">
          <input
            type="email"
            placeholder="Email address"
            value={isLoginMode ? loginData.email : registerData.email}
            onChange={(e) => isLoginMode ? setLoginData({ ...loginData, email: e.target.value }) : setRegisterData({ ...registerData, email: e.target.value })}
            required
          />
        </div>

        <div className="input-group">
          <input
            type="password"
            placeholder="Password"
            value={isLoginMode ? loginData.password : registerData.password}
            onChange={(e) => isLoginMode ? setLoginData({ ...loginData, password: e.target.value }) : setRegisterData({ ...registerData, password: e.target.value })}
            required
          />
        </div>

        {!isLoginMode && (
          <div className="input-group">
            <input
              type="password"
              placeholder="Confirm Password"
              value={registerData.confirmPassword}
              onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
              required
            />
          </div>
        )}

        <button type="submit" className="auth-btn">
          {isLoginMode ? 'Sign In' : 'Create Account'}
        </button>

        <p className="switch-link">
          {isLoginMode ? (
            <>
              Don't have an account?{' '}
              <span style={{cursor: 'pointer', color: 'var(--primary-color)'}} onClick={() => setAuthMode('register')}>
                Sign up
              </span>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <span style={{cursor: 'pointer', color: 'var(--primary-color)'}} onClick={() => setAuthMode('login')}>
                Sign in
              </span>
            </>
          )}
        </p>
      </form>
    </div>
  );
};

export default AuthenticationPage;
