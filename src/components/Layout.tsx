
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import CookieConsentBanner from './CookieConsentBanner';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow animate-fade-in">
        {children}
      </main>
      <Footer />
      <CookieConsentBanner />
    </div>
  );
};

export default Layout;
