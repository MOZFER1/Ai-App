// src/pages/GalleryPage.tsx
import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import '../AI.css';

interface ContentItem {
  id: number;
  type: 'image' | 'video';
  description: string;
  url: string;
  timestamp: string;
}

const GalleryPage: React.FC = () => {
  const { isAuthenticated, setActivePage, generatedContent } = useAppContext();
  const [galleryTab, setGalleryTab] = useState<'my-content' | 'community'>('my-content');
  const [layout, setLayout] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [initialContent] = useState<ContentItem[]>([
    {
      id: 1,
      type: 'image',
      url: 'https://via.placeholder.com/400x300/667eea/ffffff?text=AI+Generated+Image',
      description: 'A serene mountain landscape',
      timestamp: '2024-03-20T10:00:00Z'
    },
    {
      id: 2,
      type: 'video',
      url: 'https://via.placeholder.com/400x300/764ba2/ffffff?text=AI+Generated+Video',
      description: 'City lights time-lapse',
      timestamp: '2024-03-19T15:30:00Z'
    }
  ]);

  // Combine context content with initial dummy content and sort by timestamp
  const allContent: ContentItem[] = [...generatedContent, ...initialContent].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  
  const myContent = allContent.filter(item => 
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    setActivePage('gallery');
  }, [setActivePage]);

  if (!isAuthenticated) return <Navigate to="/login" />;

  return (
    <div className="gallery">
      <section className="gallery-header">
        <h1>Content Gallery</h1>
        <p>Explore and manage your AI-generated content</p>
      </section>

      <section className="gallery-controls">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search your content..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="gallery-actions">
          <button className="filter-btn">📅 Newest First ▾</button>
          <button 
            className={`layout-btn ${layout === 'grid' ? 'active' : ''}`}
            onClick={() => setLayout('grid')}
          >
            ▦
          </button>
          <button 
            className={`layout-btn ${layout === 'list' ? 'active' : ''}`}
            onClick={() => setLayout('list')}
          >
            ☰
          </button>
        </div>
      </section>

      <section className="gallery-tabs">
        <button 
          className={`tab ${galleryTab === 'my-content' ? 'active' : ''}`}
          onClick={() => setGalleryTab('my-content')}
        >
          My Content ({myContent.length})
        </button>
        <button 
          className={`tab ${galleryTab === 'community' ? 'active' : ''}`}
          onClick={() => setGalleryTab('community')}
        >
          Community (WIP)
        </button>
      </section>

      <section className={`gallery-content ${layout}`}>
        {galleryTab === 'my-content' && myContent.length > 0 ? (
          myContent.map(item => (
            <div key={item.id} className="content-item">
              {item.type === 'image' ? (
                <img src={item.url} alt={item.description} />
              ) : (
                <video src={item.url} controls />
              )}
              <div className="content-info">
                <p>{item.description}</p>
                <span className="timestamp">
                  {new Date(item.timestamp).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="gallery-empty">
            <h2>Your Creations ({myContent.length})</h2>
            <div className="empty-content">
              <div style={{ fontSize: '4rem', margin: '2rem 0' }}>📷</div>
              <p>Start creating your first AI-generated content!</p>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default GalleryPage;
