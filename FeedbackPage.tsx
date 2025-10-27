// src/pages/FeedbackPage.tsx
import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import '../AI.css';

interface FeedbackItem {
  id: number;
  type: 'suggestion' | 'complaint' | 'bug';
  name: string;
  email: string;
  title: string;
  description: string;
  category: string;
  rating: number;
  timestamp: string;
}

const FeedbackPage: React.FC = () => {
  const { isAuthenticated, setActivePage } = useAppContext();
  const [feedbackType, setFeedbackType] = useState<'suggestion' | 'complaint' | 'bug'>('suggestion');
  const [feedbackData, setFeedbackData] = useState({
    name: '',
    email: '',
    title: '',
    description: '',
    category: 'general',
    rating: 0
  });
  const [feedbackList, setFeedbackList] = useState<FeedbackItem[]>([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setActivePage('feedback');
  }, [setActivePage]);

  const handleFeedbackChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFeedbackData(prev => ({ ...prev, [name]: value }));
    setErrorMessage('');
  };

  const handleRating = (rating: number) => {
    setFeedbackData(prev => ({ ...prev, rating: rating === prev.rating ? 0 : rating }));
  };

  const handleSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackData.name || !feedbackData.email || !feedbackData.title || !feedbackData.description) {
      setErrorMessage('Please fill in all required fields');
      return;
    }

    const newFeedback: FeedbackItem = {
      id: Date.now(),
      type: feedbackType,
      ...feedbackData,
      timestamp: new Date().toLocaleString()
    };

    setFeedbackList(prev => [newFeedback, ...prev]);
    setSuccessMessage(`Your ${feedbackType} has been submitted successfully! Thank you for your feedback.`);
    setFeedbackData({ name: '', email: '', title: '', description: '', category: 'general', rating: 0 });
    setTimeout(() => setSuccessMessage(''), 5000);
    setErrorMessage('');
  };

  if (!isAuthenticated) return <Navigate to="/login" />;

  return (
    <div className="feedback-page">
      <div className="feedback-header">
        <h1>Feedback & Suggestions</h1>
        <p>Your opinion matters! Help us improve our service</p>
      </div>

      <div className="feedback-tabs">
        <button className={`feedback-tab-btn ${feedbackType === 'suggestion' ? 'active' : ''}`} onClick={() => setFeedbackType('suggestion')}>
          💡 Suggestion
        </button>
        <button className={`feedback-tab-btn ${feedbackType === 'complaint' ? 'active' : ''}`} onClick={() => setFeedbackType('complaint')}>
          ⚠️ Complaint
        </button>
        <button className={`feedback-tab-btn ${feedbackType === 'bug' ? 'active' : ''}`} onClick={() => setFeedbackType('bug')}>
          🐛 Bug Report
        </button>
      </div>

      {successMessage && <div className="success-message">{successMessage}</div>}
      {errorMessage && <div className="error-message">{errorMessage}</div>}

      <div className="feedback-form-container">
        <form className="feedback-form" onSubmit={handleSubmitFeedback}>
          <div className="form-row">
            <div className="form-group">
              <label>Name *</label>
              <input type="text" name="name" value={feedbackData.name} onChange={handleFeedbackChange} placeholder="Enter your full name" />
            </div>
            <div className="form-group">
              <label>Email *</label>
              <input type="email" name="email" value={feedbackData.email} onChange={handleFeedbackChange} placeholder="example@email.com" />
            </div>
          </div>

          <div className="form-group">
            <label>Title *</label>
            <input type="text" name="title" value={feedbackData.title} onChange={handleFeedbackChange} placeholder="Brief subject" maxLength={100} />
            <div className="char-count">{feedbackData.title.length}/100</div>
          </div>

          <div className="form-group">
            <label>Category</label>
            <select name="category" value={feedbackData.category} onChange={handleFeedbackChange}>
              <option value="general">General</option>
              <option value="features">Features & Capabilities</option>
              <option value="performance">Performance & Speed</option>
              <option value="ui">Design & Interface</option>
              <option value="customer-service">Customer Service</option>
              <option value="pricing">Pricing</option>
            </select>
          </div>

          <div className="form-group">
            <label>Details *</label>
            <textarea name="description" value={feedbackData.description} onChange={handleFeedbackChange} placeholder="Explain your idea or issue in detail..." maxLength={1000} />
            <div className="char-count">{feedbackData.description.length}/1000</div>
          </div>

          {feedbackType === 'suggestion' && (
            <div className="form-group">
              <label>How would you rate this suggestion?</label>
              <div className="rating-group">
                {[1, 2, 3, 4, 5].map(star => (
                  <button key={star} type="button" onClick={() => handleRating(star)} className="star-btn" style={{ opacity: feedbackData.rating >= star ? 1 : 0.3 }}>
                    ⭐
                  </button>
                ))}
              </div>
            </div>
          )}

          <button type="submit" className="submit-btn">
            Submit {feedbackType === 'suggestion' ? 'Suggestion' : feedbackType === 'complaint' ? 'Complaint' : 'Report'}
          </button>
        </form>
      </div>

      {feedbackList.length > 0 && (
        <div className="feedback-list-section">
          <h2>Recent Submissions</h2>
          {feedbackList.map(feedback => (
            <div key={feedback.id} className="feedback-item">
              <div className="feedback-item-header">
                <h3>{feedback.title}</h3>
                <span className="feedback-item-time">{feedback.timestamp}</span>
              </div>
              <p className="feedback-item-meta"><strong>From:</strong> {feedback.name} ({feedback.email})</p>
              <p className="feedback-item-meta"><strong>Type:</strong> {feedback.type === 'suggestion' ? 'Suggestion' : feedback.type === 'complaint' ? 'Complaint' : 'Bug Report'}</p>
              <p className="feedback-item-desc">{feedback.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FeedbackPage;
