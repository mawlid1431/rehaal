import React, { useState, useEffect } from 'react';
import { DarkModeProvider, LanguageProvider } from './lib/contexts';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { HomePage } from './components/pages/HomePage';
import { AboutPage } from './components/pages/AboutPage';
import { TripsPage } from './components/pages/TripsPage';
import { TripDetailPage } from './components/pages/TripDetailPage';
import { GalleryPage } from './components/pages/GalleryPage';
import { TestimonialsPage } from './components/pages/TestimonialsPage';
import { ContactPage } from './components/pages/ContactPage';
import { FAQPage } from './components/pages/FAQPage';
import { TermsPage } from './components/pages/TermsPage';
import { PrivacyPage } from './components/pages/PrivacyPage';
import { ServicesPage } from './components/pages/ServicesPage';
import { BookingPage } from './components/pages/BookingPage';
import { Toaster } from './components/ui/sonner';

type Page = 'home' | 'about' | 'services' | 'trips' | 'trip-detail' | 'booking' | 'gallery' | 'testimonials' | 'contact' | 'faq' | 'terms' | 'privacy';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedTripId, setSelectedTripId] = useState<number | null>(null);

  const handleNavigate = (page: string, id?: number) => {
    setCurrentPage(page as Page);
    if (id) {
      setSelectedTripId(id);
    }
    // Scroll to top on navigation
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      case 'about':
        return <AboutPage />;
      case 'services':
        return <ServicesPage onNavigate={handleNavigate} />;
      case 'trips':
        return <TripsPage onNavigate={handleNavigate} />;
      case 'trip-detail':
        return selectedTripId ? (
          <TripDetailPage tripId={selectedTripId} onNavigate={handleNavigate} />
        ) : (
          <TripsPage onNavigate={handleNavigate} />
        );
      case 'booking':
        return selectedTripId ? (
          <BookingPage tripId={selectedTripId} onNavigate={handleNavigate} />
        ) : (
          <TripsPage onNavigate={handleNavigate} />
        );
      case 'gallery':
        return <GalleryPage />;
      case 'testimonials':
        return <TestimonialsPage />;
      case 'contact':
        return <ContactPage />;
      case 'faq':
        return <FAQPage />;
      case 'terms':
        return <TermsPage />;
      case 'privacy':
        return <PrivacyPage />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <DarkModeProvider>
      <LanguageProvider>
        <div className="min-h-screen flex flex-col">
          <Navigation currentPage={currentPage} onNavigate={handleNavigate} />

          <main className="flex-grow">
            {renderPage()}
          </main>

          <Footer onNavigate={handleNavigate} />

          <WhatsAppButton />

          <Toaster position="top-right" richColors />
        </div>
      </LanguageProvider>
    </DarkModeProvider>
  );
}
