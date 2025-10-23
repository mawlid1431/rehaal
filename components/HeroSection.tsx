import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { useLanguage } from '../lib/contexts';
import { heroSlides } from '../lib/data';

interface HeroSectionProps {
  onBookJourney: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onBookJourney }) => {
  const { t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 8000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-[8000ms] ease-in-out scale-105"
            style={{
              backgroundImage: `url(${heroSlides[currentSlide].image})`,
            }}
          />
          <div className="absolute inset-0 bg-black/30" />
        </motion.div>
      </AnimatePresence>

      <div className="relative h-full flex items-center justify-center text-center px-4">
        <div className="max-w-6xl">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-12 leading-tight drop-shadow-2xl"
          >
            {t('heroTitle')}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
          >
            <Button
              size="lg"
              className="text-xl px-12 py-8 font-semibold shadow-2xl hover:scale-105 transition-transform"
              style={{ backgroundColor: 'rgb(216, 167, 40)' }}
              onClick={onBookJourney}
            >
              {t('bookJourney')}
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${index === currentSlide
              ? 'bg-[rgb(216,167,40)] w-8'
              : 'bg-white/50 hover:bg-white/75'
              }`}
          />
        ))}
      </div>
    </div>
  );
};
