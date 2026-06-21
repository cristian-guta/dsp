
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import DeferredAIChatWidget from './DeferredAIChatWidget';
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
      <DeferredAIChatWidget />
      <CookieConsentBanner />
    </div>
  );
};

export default Layout;
