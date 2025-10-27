// src/pages/SubscriptionPage.tsx
import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import '../AI.css';

const SubscriptionPage: React.FC = () => {
  const { isAuthenticated, setActivePage } = useAppContext();
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  useEffect(() => {
    setActivePage('subscription');
  }, [setActivePage]);

  const handlePaymentChoice = (method: string) => {
    alert(`Payment method selected: ${method}`);
    setShowPaymentModal(false);
  };

  if (!isAuthenticated) return <Navigate to="/login" />;

  return (
    <div className="subscription-page">
      <section className="subscription-hero">
        <h1>
          <span className="bold">Choose Your</span>{' '}
          <span className="highlight-premium">Premium Plan</span>
        </h1>
        <p className="subtitle">Enjoy unlimited features with AI Plus</p>
      </section>

      <div className="subscription-card">
        <div className="badge">⭐ Premium Plan</div>
        <h2 className="plan-title">AI Plus</h2>
        <div className="plan-price">
          $10 <span>/month</span>
        </div>

        <ul className="plan-features">
          {[
            'Unlimited image generation',
            'Create 4K videos',
            'Priority processing',
            'Access to all art styles',
            '24/7 technical support',
            'Download without watermark',
          ].map((f, i) => (
            <li key={i}>
              <span>{f}</span> <span className="check">✓</span>
            </li>
          ))}
        </ul>

        <button className="subscribe-btn" onClick={() => setShowPaymentModal(true)}>
          🚀 Subscribe Now
        </button>
        <p className="cancel-note">You can cancel your subscription at any time</p>
      </div>

      {showPaymentModal && (
        <div className="payment-overlay" onClick={() => setShowPaymentModal(false)}>
          <div className="payment-modal" onClick={(e) => e.stopPropagation()}>
            <h2>Choose Payment Method</h2>
            <p>Please select your preferred payment method</p>
            <div className="payment-options">
              <button className="payment-btn" onClick={() => handlePaymentChoice('Visa / MasterCard')}>
                💳 Visa / MasterCard
              </button>
              <button className="payment-btn" onClick={() => handlePaymentChoice('PayPal')}>
                🟦 PayPal
              </button>
              <button className="payment-cancel" onClick={() => setShowPaymentModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubscriptionPage;
