import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import '../AI.css';
import { useAppContext } from '../context/AppContext';

const DashboardPage: React.FC = () => {
  const { isAuthenticated, generatedContent, setGeneratedContent, isGenerating, setIsGenerating } = useAppContext();

  const [activeTab, setActiveTab] = useState<'images' | 'videos'>('images');
  const [imageDesc, setImageDesc] = useState('');
  const [videoDesc, setVideoDesc] = useState('');
  const [showResults, setShowResults] = useState(false);

  const handleGenerate = (type: 'image' | 'video') => {
    if (isGenerating) return;
    const desc = (type === 'image' ? imageDesc : videoDesc).trim();
    if (!desc) return;

    setIsGenerating(true);

    // محاكي لنداء الـ AI — بعدين تستبدل بالـ API الحقيقي
    setTimeout(() => {
      const newContent = {
        id: Date.now(),
        type,
        description: desc,
        url: `https://via.placeholder.com/400x300/${type === 'image' ? '667eea' : '764ba2'}/ffffff?text=AI+Generated+${type}`,
        timestamp: new Date().toISOString()
      };
      setGeneratedContent((prev: any[]) => [newContent, ...prev]);
      setShowResults(true);
      setIsGenerating(false);
      if (type === 'image') setImageDesc('');
      else setVideoDesc('');
    }, 1400);
  };

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return (
    <div className="dashboard">
      <section className="hero">
        <h1><span className="bold">Create Stunning</span> <span className="highlight">AI Content</span></h1>
        <p className="subtitle">Transform your ideas into beautiful images and videos using cutting-edge AI technology.</p>
      </section>

      {showResults && generatedContent.length > 0 && (
        <section className="results-section">
          <div className="results-header">
            <h2>Generated Content</h2>
            <button className="close-results-btn" onClick={() => setShowResults(false)}>✕</button>
          </div>
          <div className="results-grid">
            {generatedContent.map((c: any) => (
              <div key={c.id} className="content-item">
                {c.type === 'image' ? (
                  <img src={c.url} alt={c.description} />
                ) : (
                  <video src={c.url} controls />
                )}
                <p>{c.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="tabs-section">
        <div className="tabs">
          <button className={`tab-btn ${activeTab === 'images' ? 'active' : ''}`} onClick={() => setActiveTab('images')}>Generate Images</button>
          <button className={`tab-btn ${activeTab === 'videos' ? 'active' : ''}`} onClick={() => setActiveTab('videos')}>Generate Videos</button>
        </div>

        <div className="tab-content">
          {activeTab === 'images' ? (
            <div className="generate-container">
              <div className="generate-form">
                <label htmlFor="image-desc" className="form-label">Describe the image you want to create...</label>
                <textarea
                  id="image-desc"
                  className="input-area"
                  value={imageDesc}
                  onChange={(e) => setImageDesc(e.target.value)}
                  placeholder="e.g., 'A serene mountain landscape at sunset with purple clouds'"
                />

                <div className="dropdown-row">
                  <select id="img-dim">
                    <option>Square (1024x1024)</option>
                    <option>Portrait (1024x1536)</option>
                    <option>Landscape (1536x1024)</option>
                  </select>
                  <select id="img-quality">
                    <option>Standard</option>
                    <option>High</option>
                    <option>Ultra</option>
                  </select>
                </div>

                <button className="generate-btn" onClick={() => handleGenerate('image')} disabled={isGenerating || !imageDesc.trim()}>
                  {isGenerating ? 'Generating…' : 'Generate Image'}
                </button>
              </div>

              <div className="tips-box">
                <h3>💡 Image Generation Tips</h3>
                <ul>
                  <li>Be specific about colors, lighting, and composition</li>
                  <li>Include art style preferences</li>
                  <li>Mention camera angles or perspectives</li>
                  <li>Add mood or atmosphere descriptions</li>
                  <li>Try different style presets for unique looks</li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="generate-container">
              <div className="generate-form">
                <label htmlFor="video-desc" className="form-label">Describe the video scene...</label>
                <textarea
                  id="video-desc"
                  className="input-area"
                  value={videoDesc}
                  onChange={(e) => setVideoDesc(e.target.value)}
                  placeholder="e.g., 'A time-lapse of city lights at night with moving traffic'"
                />

                <div className="dropdown-row">
                  <select id="vid-duration">
                    <option>5 seconds</option>
                    <option>10 seconds</option>
                    <option>20 seconds</option>
                  </select>
                  <select id="vid-res">
                    <option>720p</option>
                    <option>1080p</option>
                    <option>4K</option>
                  </select>
                </div>

                <button className="generate-btn video" onClick={() => handleGenerate('video')} disabled={isGenerating || !videoDesc.trim()}>
                  {isGenerating ? 'Generating…' : 'Generate Video'}
                </button>
              </div>

              <div className="tips-box">
                <h3>🎬 Video Generation Tips</h3>
                <ul>
                  <li>Describe motion and movement clearly</li>
                  <li>Specify camera movements</li>
                  <li>Include timing references</li>
                  <li>Mention lighting changes or effects</li>
                  <li>Keep scenes simple for better results</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default DashboardPage;
