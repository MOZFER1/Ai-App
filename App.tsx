// src/App.tsx
import React, { ReactNode } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider, useAppContext } from './context/AppContext';

// Components
import Header from './components/Header';
import Footer from './components/Footer'; 
import LoadingOverlay from './components/LoadingOverlay';

// Pages
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import GalleryPage from './pages/GalleryPage';
import SubscriptionPage from './pages/SubscriptionPage';
import FeedbackPage from './pages/FeedbackPage';
import ProfilePage from './ProfilePage';
import AuthenticationPage from './pages/AuthenticationPage'; 
import './AI.css';

// ============= LAYOUT WRAPPER =============
const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const location = useLocation();
  const hideHeaderFooter = location.pathname === '/login' || location.pathname === '/register';

  return (
    <>
      {!hideHeaderFooter && <Header />}
      <main className="main-content">{children}</main>
      {!hideHeaderFooter && <Footer />} 
    </>
  );
};

// Component to handle the loading state from context
const AppLoadingOverlay: React.FC = () => {
  const { isGenerating } = useAppContext();
  return isGenerating ? <LoadingOverlay /> : null;
};

// ============= MAIN APP =============
function App() {
  return (
    <Router>
      <AppProvider>
        <div className="app">
          <Routes>
            {/* Pages wrapped with Layout for Header/Footer */}
            <Route path="/" element={<Layout><LandingPage /></Layout>} />
            <Route path="/dashboard" element={<Layout><DashboardPage /></Layout>} />
            <Route path="/gallery" element={<Layout><GalleryPage /></Layout>} />
            <Route path="/subscription" element={<Layout><SubscriptionPage /></Layout>} />
            <Route path="/feedback" element={<Layout><FeedbackPage /></Layout>} />
            <Route path="/profile" element={<Layout><ProfilePage /></Layout>} />
            
            {/* Auth pages المدمجة: الآن تشترك في نفس المكون */}
            <Route path="/login" element={<><AuthenticationPage /><Footer /></>} />
            <Route path="/register" element={<><AuthenticationPage /><Footer /></>} />
          </Routes>
          <AppLoadingOverlay />
        </div>
      </AppProvider>
    </Router>
  );
}

export default App;
