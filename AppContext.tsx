// src/context/AppContext.tsx
import React, { useState, createContext, useContext, ReactNode } from 'react';

// Define types for clarity (even though we use 'any' in the app data)
interface ContentItem {
  id: number;
  type: 'image' | 'video';
  description: string;
  url: string;
  timestamp: string;
}

interface AppContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuth: boolean) => void;
  activePage: string;
  setActivePage: (page: string) => void;
  generatedContent: ContentItem[];
  setGeneratedContent: React.Dispatch<React.SetStateAction<ContentItem[]>>;
  isGenerating: boolean;
  setIsGenerating: (isGenerating: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
};

const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activePage, setActivePage] = useState('landing');
  const [generatedContent, setGeneratedContent] = useState<ContentItem[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const value: AppContextType = {
    isAuthenticated,
    setIsAuthenticated,
    activePage,
    setActivePage,
    generatedContent,
    setGeneratedContent,
    isGenerating,
    setIsGenerating
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export { useAppContext, AppProvider };
