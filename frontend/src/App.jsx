import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LogoLoader from './components/LogoLoader';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import CareersPage from './components/CareersPage';
import AdminPage from './components/AdminPage';
import './App.css';

function App() {
  const [showContent, setShowContent] = useState(false);

  const handleLoaderComplete = () => {
    setShowContent(true);
  };

  return (
    <>
      {!showContent && <LogoLoader onComplete={handleLoaderComplete} />}
      {showContent && (
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </Router>
      )}
    </>
  );
}

export default App;

